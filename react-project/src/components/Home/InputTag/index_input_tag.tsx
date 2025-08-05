//Importar el CSS
import "./styles_input_tag.css";

//Importar función personalizada para manejar el tag de entrada
import useInputTag from "./func_input_tag";
import Control from "../Control/index_control";
import { useState } from "react";

export default function InputTag() {

    // Usar el hook personalizado para manejar el tag y la lógica de envío
    const { tag, setTag, habilitarBotonConf, handleSubmit } = useInputTag();
    const [seleccionados, setSeleccionados] = useState<string[]>([]);
    
    // Renderizar el formulario de entrada de tag
    return (
        <div id="input-tag-container">
            <form id="input-tag-form" onSubmit={handleSubmit}>

                <label>Ingresa tu tag de jugador</label>
                

                <input
                    type="text"
                    placeholder="#ABC123456"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                

                <button type="submit" className="btn btn-primary">Buscar</button>

       
                    <button
                        type="button"
                        id='btn-configuraciones'
                        className="btn btn-primary"
                        disabled={habilitarBotonConf}
                        onClick={() => {
                            const dialog = document.getElementById('dialog-configuraciones') as HTMLDialogElement | null;
                            if (dialog && !dialog.open) {
                                dialog.showModal();
                            }
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
                                if (dialog && dialog.open) {
                                    dialog.close();
                                }
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
                
            </form>
        </div>
    );
}