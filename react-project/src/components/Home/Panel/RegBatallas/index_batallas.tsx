//Importar el CSS
import './styles_batallas.css'

//Importar imágenes de tipos de batallas
import trofeo_img from '../../../../assets/img/Batallas/trofeo.webp';
import path_img from '../../../../assets/img/Batallas/path_legends.webp';
//Importar función personalizada para obtener batallas
import useBatallas from './func_batallas';
import { BatallasProps } from '../../../../interfaces/BatallasProps';


export default function RegBatallas({ modosSeleccionados}: BatallasProps) {


  // Usar el hook personalizado para obtener batallas y estado de carga
  const {batallas} = useBatallas();

  const batallasFiltradas = batallas
    .filter(b => modosSeleccionados.length === 0 || modosSeleccionados.includes(b.type))



  //Visualizar las batallas obtenidas
  return (
    <div>

        {batallasFiltradas.length > 0 ? (
          
          <ul id='batallas-container'>
          
            {batallasFiltradas.map((b, i) => (
              <div key={i}>
                
                <div className="info-batalla">

      
                  {/*RESULTADO DE LA BATALLA*/}

                    <div id='resultado-content'>

                      {/* Mostrar el tipo de batalla con su respectiva imagen */}
                      <img id='img-tipo-batalla' src={b.type === 'pathOfLegend' ? path_img : trofeo_img} alt="" />

                      {/* Mostrar la cantidad de coronas de cada jugador */}
                      <p className='p-jugadores'>{b.team?.[0]?.name || 'Desconocido'} {b.team?.[0]?.crowns}-  
                        {b.opponent?.[0]?.crowns} {b.opponent?.[0]?.name || 'Desconocido'}</p>

                      {/* Determinar el color de acuerdo al resultado de la batalla basado en las coronas */}
                      <p className={
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
                      
                    </div>
                    
                    
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
                            />
                            <br />
                            <small>Nivel {card.level}</small>
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
                            <br />
                            <small>Nivel {card.level}</small>
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
