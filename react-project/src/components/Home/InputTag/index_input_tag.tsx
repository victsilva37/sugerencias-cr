import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputTag() {
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Ingresa tu tag de jugador</label>
                <input
                    type="text"
                    placeholder="#ABC123456"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <button type="submit">Avanzar</button>
            </form>
        </div>
    );
}