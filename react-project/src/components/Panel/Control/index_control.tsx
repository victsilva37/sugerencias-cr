//Importación de CSS
import './styles_control.css';
import useControl from './func_control';
import { ControlProps } from '../../../interfaces/ControlProps';

export default function Control({ seleccionados, setSeleccionados, cantidad, setCantidad }: ControlProps) {

    const { batallas } = useControl();
    // Extrae tipos únicos
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
                    <legend><strong>Modos de juego a analizar:</strong></legend>
                    {tiposDeJuego.map(tipo => (
                        <label key={tipo}>
                        <input
                            type="checkbox"
                            checked={seleccionados.includes(tipo)}
                            onChange={() => handleCheck(tipo)}
                        />
                        {tipo}
                        </label>
                    ))}

                    <div>
                        <label>
                        Cantidad de partidas a analizar:
                        <select value={cantidad} onChange={(e) => setCantidad(e.target.value)}>
                            <option value="5">Últimas 5 partidas</option>
                            <option value="10">Últimas 10 partidas</option>
                            <option value="20">Últimas 20 partidas</option>
                            <option value="7d">Últimos 7 días</option>
                            <option value="14d">Últimos 14 días</option>
                        </select>
                        </label>
                    </div>
                    </fieldset>
                </form>
            
        </div>
    );
}