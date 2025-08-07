import { useState } from "react";
import Control from "./Control/index_control";
import RegBatallas from "./RegBatallas/index_batallas";

export default function Panel(){

    const [seleccionados, setSeleccionados] = useState<string[]>([]);
    
    return(

        <div>
            {/* SECCIÓN PANEL */}

                <div id="panel-content">
                    <button
                        type="button"
                        id='btn-configuraciones'
                        className="btn btn-primary"
                        onClick={() => {
                            const dialog = document.getElementById('dialog-configuraciones') as HTMLDialogElement | null;
                            if (dialog && !dialog.open) dialog.showModal();
                        }}
                        >
                            Panel de análisis
                    </button>

                    <dialog id="dialog-configuraciones">
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

                        <Control
                            seleccionados={seleccionados}
                            setSeleccionados={setSeleccionados}
                        />
                        
                    </dialog>
                
                </div>


            {/* SECCIÓN REGISTRO DE BATALLAS */}

                <div id="batallas-main-container">
                    <RegBatallas
                        modosSeleccionados={seleccionados}
                    />
                </div>
            
        </div>

        
      
    )
}