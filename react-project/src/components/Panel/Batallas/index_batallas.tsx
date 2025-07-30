//Importar el CSS
import './styles_batallas.css'

//Importar función personalizada para obtener batallas
import useBatallas from './func_batallas';
import { BatallasProps } from '../../../interfaces/BatallasProps';

export default function Batallas({ modosSeleccionados}: BatallasProps) {

  // Usar el hook personalizado para obtener batallas y estado de carga
  const {batallas, loading} = useBatallas();

  const batallasFiltradas = batallas
    .filter(b => modosSeleccionados.length === 0 || modosSeleccionados.includes(b.type))


  // Si aún se están cargando las batallas, mostrar un mensaje de carga
  if (loading) return <p>Cargando batallas...</p>;

  //Visualizar las batallas obtenidas
  return (
    <div>
      <h1>Batallas</h1>
      {batallasFiltradas.length > 0 ? (
        <ul id='batallas-container'>
          {batallasFiltradas.map((b, i) => (
            <div key={i}>
              <div className="info-batalla">
                {/*TIPO DE BATALLA*/}
                <p className='p-tipo-batalla'>{b.type}</p>

                {/*RESULTADO*/}

                    <p className={
                      // Determinar el color de acuerdo al resultado de la batalla basado en las coronas
                      typeof b.team?.[0]?.crowns === 'number' && typeof b.opponent?.[0]?.crowns === 'number'
                        ? b.team[0].crowns > b.opponent[0].crowns
                          ? 'win-batalla'
                          : 'lose-batalla'
                        : 'unknown-result'
                    }>
                      {/*Mostrar el resultado de la batalla*/}
                      {typeof b.team?.[0]?.crowns === 'number' && typeof b.opponent?.[0]?.crowns === 'number'
                      ? b.team[0].crowns > b.opponent[0].crowns
                          ? 'VICTORIA'
                          : 'DERROTA'
                        : 'unknown-result'}
                    </p>

                {/*NOMBRE DEL JUGADOR (YO) - OPONENTE*/}

                  <p className='p-jugadores'>{b.team?.[0]?.name || 'Desconocido'} {b.team?.[0]?.crowns}- 
                      {b.opponent?.[0]?.crowns} {b.opponent?.[0]?.name || 'Desconocido'}</p>


                {/*CARTAS DE LA PARTIDA*/}

                  <div id='cards-container'>

                    {/* Mis cartas */}
                    <div className="cartas-blue-batalla">
                      {b.team?.[0]?.cards?.map((card, j) => (
                        <div key={j} className="carta">
                          <img
                            src={
                              card.evolutionLevel === 1
                                ? card.iconUrls.evolutionMedium
                                : card.iconUrls.medium
                            }
                            alt={card.name}
                            width={50}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Cartas del oponente */}
                    <div className="cartas-red-batalla">
                      {b.opponent?.[0]?.cards?.map((card, j) => (
                        <div key={j} className="carta">
                          <img
                            src={
                              card.evolutionLevel === 1
                                ? card.iconUrls.evolutionMedium
                                : card.iconUrls.medium
                            }
                            alt={card.name}
                            width={50}
                          />
                        </div>
                      ))}
                    </div>

                  </div>


              </div>
              
            </div>
          ))}
        </ul>
      ) : (
        <p>No hay batallas disponibles.</p>
      )}
    </div>
  );
}
