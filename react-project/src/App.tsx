
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Panel from './pages/Panel';

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/panel" element={<Panel/>} />
    </Routes>
  )
}

export default App;
