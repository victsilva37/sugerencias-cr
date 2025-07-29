import { useEffect, useState } from "react";
import { Batalla } from "../../../interfaces/Batalla";

export default function useControl() {
    const [batallas, setBatallas] = useState<Batalla[]>([]);

    useEffect(() => {
        const tag = localStorage.getItem("playerTag");
        if (!tag) return;
    
        fetch(`http://localhost:5000/players/${tag}/battlelog`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
            setBatallas(data);
            } else {
            console.warn("Respuesta inesperada del backend:", data);
            }
        })
        .catch(error => {
            console.error("Error al obtener batallas:", error);
        });
    }, []);
    
    return { batallas };
}