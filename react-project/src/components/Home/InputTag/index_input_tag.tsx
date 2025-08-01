//Importar el CSS
import "./styles_input_tag.css";

//Importar función personalizada para manejar el tag de entrada
import useInputTag from "./func_input_tag";

export default function InputTag() {

    // Usar el hook personalizado para manejar el tag y la lógica de envío
    const { tag, setTag, handleSubmit } = useInputTag();
    
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
                

                <button type="submit" className="btn btn-primary">Avanzar</button>
            </form>
        </div>
    );
}