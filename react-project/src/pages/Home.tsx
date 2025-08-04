import { useState } from "react";
import Banner from "../components/Home/Banner/index_banner";
import Batallas from "../components/Home/Batallas/index_batallas";
import InputTag from "../components/Home/InputTag/index_input_tag";
import Menu from "../layouts/Menu/index_menu";

export default function Home() {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  return (
    <div>

        {/* Layout: Menu */}
        <Menu/>

        {/* Component: Banner */}
        <Banner/>

        {/* Component: InputTag */}
        <InputTag/>

        <Batallas
                modosSeleccionados={seleccionados}
          />


    </div>
    
  );
}