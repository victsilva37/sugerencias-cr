import { useEffect, useState } from "react";
import { Batalla } from "../../../../interfaces/Batalla";

// Función auxiliar para obtener tipos únicos de juego desde las batallas
export function obtenerTiposDeJuego(batallas: Batalla[]): string[] {
    return [...new Set(batallas.map(b => b.type))];
}

export default function useControl() {
    const [batallas, setBatallas] = useState<Batalla[]>([]);

    /* SECCIÓN DE MODOS DE JUEGO */

        const [seleccionados, setSeleccionados] = useState<string[]>([]);


    /*SECCIÓN DE OBJETIVO DEL ANÁLISIS*/
    
        const [objetivo, setObjetivo] = useState<string>("mejorar-ataque");


    /*SECCIÓN DE TIPO DE SUGERENCIA*/
    
        const [tipoSugerencia, setTipoSugerencia] = useState<string>("tactica");


    /*SECCIÓN ANÁLISIS DEL MAZO ACTUAL*/

        const [analisisMazo, setAnalisisMazo] = useState<string>("el-mas-usado");


    /*SECCIÓN NIVEL DE ANÁLISIS*/

        const [nivelAnalisis, setNivelAnalisis] = useState<string>("lenguaje-simple");
    
    
    /*SUGERENCIA (VARIABLE)*/

        const [sugerencia, setSugerencia] = useState<string | null>(null);


    /*BOTÓN ANALIZAR*/

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

            const partidasFiltradas = batallas.filter(b => 
                seleccionados.some(sel => sel.toLowerCase() === b.type.toLowerCase())
            );


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

    //Retorno de variables importantes
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
