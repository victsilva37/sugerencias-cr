//Importar el CSS
import './styles_banner.css'

//Importa imágenes y otros recursos necesarios
import img1_info from '../../../assets/Banner/img1_info.png';
import img2_info from '../../../assets/Banner/img2_info.png';

export default function Banner() {
    return (
        <div id="banner-container">
    

            
            {/* SECCIÓN INFORMACIÓN */}

                <div id="info-container">

                    <div className="card">
                        <img src={img1_info} alt="" />
                        <div className="card-body">
                            <p className='card-text'>Analiza tus partidas y mejora el rendimiento de tus partidas de Clash Royale</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={img2_info} alt="" />
                        <div className="card-body">
                            <p className='card-text'>Recibe sugerencias inteligentes basadas en tu estilo de juego y resultado recientes</p>
                        </div>
                    </div>

                </div>

           
        </div>
    );
}