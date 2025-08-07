import { useEffect, useState } from "react";
import { Batalla } from "../../../../interfaces/Batalla";

// Función auxiliar para obtener tipos únicos de juego desde las batallas
export function obtenerTiposDeJuego(batallas: Batalla[]): string[] {
    return [...new Set(batallas.map(b => b.type))];
}

export default function useControl() {
    const [batallas, setBatallas] = useState<Batalla[]>([]);
    const [seleccionados, setSeleccionados] = useState<string[]>([]); // Estados de modos seleccionados
    const [objetivo, setObjetivo] = useState<string>("mejorar-ataque");
    const [tipoSugerencia, setTipoSugerencia] = useState<string>("tactica");
    const [analisisMazo, setAnalisisMazo] = useState<string>("el-mas-usado");
    const [nivelAnalisis, setNivelAnalisis] = useState<string>("lenguaje-simple");
    const [sugerencia, setSugerencia] = useState<string | null>(null);

    // Carga batallas desde backend
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

    // Establece modos seleccionados por defecto cuando cambian las batallas
    useEffect(() => {
        if (batallas.length > 0 && seleccionados.length === 0) {
            const modos = obtenerTiposDeJuego(batallas);
            setSeleccionados(modos);
        }
    }, [batallas, seleccionados.length]);

    // Función que analiza batallas según filtros y actualiza sugerencia
    const analizarBatallas = async () => {
        if (batallas.length === 0) {
            setSugerencia("⚠️ No hay batallas para analizar.");
            return;
        }

        if (seleccionados.length === 0) {
            setSugerencia("⚠️ Debes seleccionar al menos un modo de juego.");
            return;
        }

        const partidasFiltradas = batallas.filter(b => seleccionados.includes(b.type));

        if (partidasFiltradas.length === 0) {
            setSugerencia("⚠️ No hay batallas que coincidan con los modos seleccionados.");
            return;
        }

        const data = {
            batallas: partidasFiltradas,
            modos_juego: seleccionados,
            objetivo,
            tipoSugerencia,
            analisisMazo,
            nivelAnalisis
        };

        try {
            const response = await fetch("http://localhost:5000/analizar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.error) {
                setSugerencia(`🧠 Error: ${result.error}`);
            } else {
                setSugerencia(result.sugerencia);
                console.log("Sugerencia recibida:", result.sugerencia);
            }
        } catch (err) {
            setSugerencia("🧠 Error: No se pudo conectar con el servidor.");
        }
    };

    return {
        batallas,
        sugerencia,
        analizarBatallas,
        seleccionados,
        setSeleccionados,
        objetivo,
        setObjetivo,
        tipoSugerencia,
        setTipoSugerencia,
        analisisMazo,
        setAnalisisMazo,
        nivelAnalisis,
        setNivelAnalisis
    };
}
