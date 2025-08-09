import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useInputTag() {

    //Variables
    const [tag, setTag] = useState("");
    const navigate = useNavigate();
    

    //SECCIÓN FORMULARIO INPUT TAG

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            //Texto <label>
            //sin contenido

            //Input para ingresar el tag del jugador
            const cleanedTag = tag.replace("#", "").toUpperCase();

            //Botón buscar jugador
            try {
                const res = await fetch(`http://localhost:5000/players/${cleanedTag}`);
                if (!res.ok) {
                    alert("Jugador no encontrado");
                    return;
                }

                const data = await res.json();
                alert(`Jugador ${data.name} encontrado con éxito!`);
                localStorage.setItem("playerTag", cleanedTag); 
                navigate("/");
                window.location.reload();
                
            } catch (error) {
                console.error(error);
                alert("Error al conectar con el servidor");
            }
        };

    //Retorno de variables
    return {
        tag,
        setTag,
        handleSubmit
    }
}