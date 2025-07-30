import { useState } from "react";
import Batallas from "../components/Panel/Batallas/index_batallas";
import Control from "../components/Panel/Control/index_control";
// import Menu from "../layouts/Menu/index_menu";

export default function Panel() {

    const [seleccionados, setSeleccionados] = useState<string[]>([]);
    return (
        <div style={{display: 'flex'}}>
            {/* <Menu/> */}

            <Batallas
                modosSeleccionados={seleccionados}
            />

            <Control
                seleccionados={seleccionados}
                setSeleccionados={setSeleccionados}      
            />


        </div>
        
    );
}