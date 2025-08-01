import './styles_control.css';
import useControl from './func_control';
import { ControlProps } from '../../../interfaces/ControlProps';

export default function Control({ seleccionados, setSeleccionados }: ControlProps) {
    const { batallas, analizarBatallas, sugerencia, objetivo, setObjetivo } = useControl();

    // Obtener tipos únicos de modos de juego para los checkboxes
    const tiposDeJuego = [...new Set(batallas.map(b => b.type))];

    const handleCheck = (tipo: string) => {
        if (seleccionados.includes(tipo)) {
            setSeleccionados(seleccionados.filter(t => t !== tipo));
        } else {
            setSeleccionados([...seleccionados, tipo]);
        }
    };

    return (
        <div>
            
            <h1>Control Panel</h1>
            <form>
                <fieldset>

                    {/* SECCIÓN DE MODOS DE JUEGO */}

                        <strong>Modos de juego a analizar:</strong>

                        {tiposDeJuego.map(tipo => (
                            <label id='lbl-modos' key={tipo}>
                                <input
                                    type="checkbox"
                                    checked={seleccionados.includes(tipo)}
                                    onChange={() => handleCheck(tipo)}
                                />
                                {tipo}
                            </label>
                        ))}
                        <br />


                    {/*SECCIÓN DE OBJETIVO DEL ANÁLISIS*/}

                         <div>

                            <label>Objetivo del análisis</label>

                            <select value={objetivo} onChange={e => setObjetivo(e.target.value)}>
                                <option value="mejorar-ataque">Mejorar ataque</option>
                                <option value="mejorar-defensa">Mejorar defensa</option>
                                <option value="optimizar-rotación">Optimizar rotación</option>
                                <option value="balancear-mazo">Balancear el mazo</option>
                                <option value="tomar-decisiones">Toma de decisiones</option>
                            </select>
                            
                        </div>

                </fieldset>

                <button type="button" onClick={analizarBatallas}>
                    Analizar
                </button>
            </form>

            {sugerencia && (
                <div className="sugerencia" style={{ marginTop: "20px" }}>
                    <strong>Sugerencia IA:</strong> {sugerencia}
                </div>
            )}
        </div>
    );
}
