import logo from './logo.svg';
import './App.css';
import Menu from './tool/menu/menu';
import Main from './tool/main/main';
import Videos from './tool/videos/videos';
import Help from './tool/help/help'
import Navbar from './tool/Navbar/Navbar';
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Menu></Menu>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path='/videos' element={<Videos/>} />
          <Route path='/help' element={<Help/>} />
        </Routes> 
    </div>
  );
}

export default App;
