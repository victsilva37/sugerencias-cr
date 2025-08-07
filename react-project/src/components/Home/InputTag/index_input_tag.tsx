// index_input_tag.tsx

import "./styles_input_tag.css";
import useInputTag from "./func_input_tag";


export default function InputTag() {
    const { tag, setTag, handleSubmit } = useInputTag();

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

            </form>
        </div>
    );
}
