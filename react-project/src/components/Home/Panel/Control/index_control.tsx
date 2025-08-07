import './styles_control.css';
import useControl from './func_control';
import { ControlProps } from '../../../../interfaces/ControlProps';
import { useEffect } from 'react';

export default function Control({ seleccionados, setSeleccionados }: ControlProps) {
    const {batallas, analizarBatallas,  sugerencia,  objetivo, setObjetivo, tipoSugerencia, setTipoSugerencia, analisisMazo,
        setAnalisisMazo, nivelAnalisis,
        setNivelAnalisis } = useControl();

     // Obtener tipos únicos de modos de juego para los checkboxes
    const tiposDeJuego = [...new Set(batallas.map(b => b.type))];

    // Marcar todos los checkboxes por defecto cuando se cargan los tipos y no hay seleccionados aún
    useEffect(() => {
        if (tiposDeJuego.length > 0 && seleccionados.length === 0) {
            setSeleccionados(tiposDeJuego);
        }
    }, [tiposDeJuego, seleccionados.length, setSeleccionados]);

    // Manejo del cambio en los checkboxes
    const handleCheckboxChange = (tipo: string) => {
        if (seleccionados.includes(tipo)) {
            setSeleccionados(seleccionados.filter(m => m !== tipo));
        } else {
            setSeleccionados([...seleccionados, tipo]);
        }
    };

    return (
        <div>
            
            <form id='form-control'>
        
                {/* SECCIÓN DE MODOS DE JUEGO */}

                    <div id='modos-content'>
                        <h6>Modos de juego</h6>
                        <br />
                        {tiposDeJuego.map((tipo) => (
                            <div key={tipo}>
                                <div id='modos-checkbox'>
                                    <label>{tipo}</label>
                                    <input
                                        value={tipo}
                                        type="checkbox"
                                        checked={seleccionados.includes(tipo)}
                                        onChange={() => handleCheckboxChange(tipo)}
                                    />
                                </div>
                            </div>
                        ))}
      
                    </div>



                {/*SECCIÓN DE OBJETIVO DEL ANÁLISIS*/}

                    <div id='objetivo-content'>

                        <h6>Objetivo del análisis</h6>


                        <select value={objetivo} onChange={e => setObjetivo(e.target.value)}>
                            <option value="mejorar-ataque">Mejorar ataque</option>
                            <option value="mejorar-defensa">Mejorar defensa</option>
                            <option value="optimizar-rotación">Optimizar rotación</option>
                            <option value="balancear-mazo">Balancear el mazo</option>
                            <option value="tomar-decisiones">Toma de decisiones</option>
                        </select>
                    
                    </div>


                {/*SECCIÓN DE TIPO DE SUGERENCIA*/}

                    <div id="tacticas-content">

                        <h6>Tipo de sugerencia</h6>

                        {/* Personalizar sugerencias */}
                        <select value={tipoSugerencia} name="" id="" onChange={e => setTipoSugerencia(e.target.value)}>
                            <option value="tactica">Táctica</option>
                            <option value="estadística">Estadística</option>
                        </select>
                        
                    </div>

                
                {/*SECCIÓN ANÁLISIS DEL MAZO ACTUAL*/}

                    <div id="mazo-content">

                        <h6>Análisis de mazos</h6>

                        <select value={analisisMazo} name="" id="" onChange={e => setAnalisisMazo(e.target.value)}>
                            <option value="el-mas-usado">Sólo el más usado</option>
                            <option value="todos">Todos los mazos</option>
                        </select>

                    </div>


                {/*SECCIÓN NIVEL DE ANÁLISIS*/}

                    <div id="nvl-analisis-content">

                        <h6>Nivel de análisis</h6>

                        <select value={nivelAnalisis} name="" id="" onChange={e => setNivelAnalisis(e.target.value)}>
                            <option value="lenguaje-simple">Normal</option>
                            <option value="lenguaje-técnico">Técnico</option>
                        </select>
                    </div>
                        
                    
                {/* SECCIÓN BOTÓN ANALIZAR */}

                    <button type="button" onClick={analizarBatallas}>
                        Analizar
                    </button>

               

            </form>

            {sugerencia && (
                <div className="sugerencia">
                    <p><strong>Sugerencia:</strong> {sugerencia}</p>
                </div>
            )}
        </div>
    );
}
