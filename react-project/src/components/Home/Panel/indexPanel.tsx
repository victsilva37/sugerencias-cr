//Importar CSS
import './stylesPanel.css'

//Importar componentes hijos
import Control from "./Control/indexControl";
import RegBatallas from "./RegBatallas/indexRegBatallas";

//Importar hooks de estados
import { useState } from "react";

export default function Panel(){

    const [seleccionados, setSeleccionados] = useState<string[]>([]);
    
    return(

        <div>
            
           
            {/* SECCIÓN REGISTRO DE BATALLAS */}

                <div id="batallas-main-container">

                    {/* Component: RegBatallas */}
                    <RegBatallas
                        modosSeleccionados={seleccionados}
                    />
                </div>



             {/* SECCIÓN PANEL */}

                <div id="panel-content">

                    {/*Botón panel de análisis*/}
                    <button
                        type="button"
                        id='btn-panel-analisis'
                        className="btn btn-primary"
                        onClick={() => {
                            const dialog = document.getElementById('dialog-configuraciones') as HTMLDialogElement | null;
                            if (dialog && !dialog.open) dialog.showModal();
                        }}
                        >
                            Panel de análisis
                    </button>

                    {/* Modal de análisis */}
                    <dialog id="dialog-configuraciones">

                        {/*Botón cerrar*/}
                        <div id="btn-cerrar">
                            <button
                                type="button"
                                className='btn btn-danger'
                                onClick={() => {
                                    const dialog = document.getElementById('dialog-configuraciones') as HTMLDialogElement | null;
                                    if (dialog?.open) dialog.close();
                                }}
                            >
                                X
                            </button>
                        </div>

                        {/* Component: Control */}
                        <Control
                            seleccionados={seleccionados}
                            setSeleccionados={setSeleccionados}
                        />
                        
                    </dialog>
                
                </div>
            
        </div>

        
      
    )
}