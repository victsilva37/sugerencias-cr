import Banner from "../components/Home/Banner/index_banner";
import InputTag from "../components/Home/InputTag/index_input_tag";
import Menu from "../layouts/Menu/index_menu";
import Panel from "../components/Home/Panel/index_panel";


export default function Home() {

  return (
    <div>

        {/* Layout: Menu */}
        <Menu/>

        {/* Component: Banner */}
        <Banner/>

        {/* Component: InputTag */}
        <InputTag />

        {/* Component: Panel*/}
        <Panel/>

  
    </div>
    
  );
}