//Importar el CSS
import './stylesBanner.css'

//Importa imágenes y otros recursos necesarios
// import img1_info from '../../../assets/Banner/img1_info.png';
// import img2_info from '../../../assets/Banner/img2_info.png';
import img1_banner from '../../../assets/img/Banner/img1_banner.png';
import img2_banner from '../../../assets/img/Banner/img2_banner.png';

export default function Banner() {
    return (
    
        <div>
            {/* Contenedor principal */}
            <div id="banner-container" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                
                <div className="carousel-inner">

                    {/* SECCIÓN PÁGINA 1 CARRUSEL */}
                        
                        <div className="carousel-item active">

                            {/*Imagen 1*/}
                            <img src={img1_banner} alt="" className="d-block w-100" />
                            
                            {/*Texto 1*/}
                            <div className="carousel-caption">
                                <h5>Analiza tus partidas y mejora el rendimiento de tus partidas de Clash Royale</h5>
                            </div>

                        </div>


                    {/* SECCIÓN PÁGINA 2 CARRUSEL */}

                        <div className="carousel-item">

                            {/* Imagen 2 */}
                            <img src={img2_banner} className="d-block w-100" alt="..." />
                            
                            {/* Texto 2 */}
                            <div className="carousel-caption">
                                <h5>Recibe sugerencias inteligentes basadas en tu estilo de juego y resultado recientes</h5>
                            </div>

                        </div>

                </div>
 
            </div>
        </div>

    
   
    );
}