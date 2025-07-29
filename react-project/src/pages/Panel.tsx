import { useState } from "react";
import Batallas from "../components/Panel/Batallas/index_batallas";
import Control from "../components/Panel/Control/index_control";
// import Menu from "../layouts/Menu/index_menu";

export default function Panel() {

    const [seleccionados, setSeleccionados] = useState<string[]>([]);
    const [cantidad, setCantidad] = useState<string>('5');
    return (
        <div style={{display: 'flex'}}>
            {/* <Menu/> */}

            <Batallas
                modosSeleccionados={seleccionados}
                cantidad={cantidad}
            />

            <Control
                seleccionados={seleccionados}
                setSeleccionados={setSeleccionados}
                cantidad={cantidad}
                setCantidad={setCantidad}         
            />


        </div>
        
    );
}