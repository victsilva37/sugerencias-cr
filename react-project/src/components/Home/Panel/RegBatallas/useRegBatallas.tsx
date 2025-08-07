import { useEffect, useState } from "react";
import { Batalla } from "../../../../interfaces/Batalla";

export default function useRegBatallas() {
    const [batallas, setBatallas] = useState<Batalla[]>([]);
    const [loading, setLoading] = useState(true);
    
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
            setLoading(false);
        })
        .catch(error => {
            console.error("Error al obtener batallas:", error);
            setLoading(false);
        });
    }, []);
    
    return { batallas, loading };
}