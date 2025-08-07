// Importar CSS
import "./stylesInputTag.css";

//Importar hook TSX
import useInputTag from "./useInputTag";


export default function InputTag() {

    //Llamar al hook
    const { tag, setTag, handleSubmit } = useInputTag();

    //Vista
    return (

        //Contenedor principal
        <div id="input-tag-container">

            {/*SECCIÓN FORMULARIO INPUT TAG*/}

                <form id="input-tag-form" onSubmit={handleSubmit}>

                    {/*Texto <label>*/}
                    <label>Ingresa el tag de jugador</label>

                    {/*Input para ingresar el tag del jugador*/}
                    <input
                        type="text"
                        placeholder="#ABC123456"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />

                    {/*Botón buscar jugador*/}
                    <button type="submit" className="btn btn-primary">Buscar</button>
                </form>

        </div>
    );
}
