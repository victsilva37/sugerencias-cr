import Banner from "../components/Home/Banner/indexBanner";
import InputTag from "../components/Home/InputTag/indexInputTag";
import Menu from "../layouts/Menu/index_menu";
import Panel from "../components/Home/Panel/indexPanel";


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