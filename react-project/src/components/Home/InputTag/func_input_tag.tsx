import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useInputTag() {
    const [tag, setTag] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cleanedTag = tag.replace("#", "").toUpperCase();

        try {
            const res = await fetch(`http://localhost:5000/players/${cleanedTag}`);
            if (!res.ok) {
                alert("Jugador no encontrado");
                return;
            }

            const data = await res.json();
            alert(`Bienvenido ${data.expLevel}`);
            localStorage.setItem("playerTag", cleanedTag); 
            navigate("/panel");
            
        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor");
        }
    };

    return {
        tag,
        setTag,
        handleSubmit
    }
}