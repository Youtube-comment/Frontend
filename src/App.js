import logo from './logo.svg';
import './App.css';
import {Route,Routes, Link} from "react-router-dom";
import Menu from './tool/menu/menu';
import Video from './tool/vedio/video';

import Main from './tool/main/main';
import Videos from './tool/videos/videos';
import Help from './tool/help/help'
import Navbar from './tool/Navbar/Navbar';


function App() {
  return (
    <div className="App">
        <Menu></Menu>
          
        <Navbar/>
        <Routes>
          <Route path='video' element={<Video/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path='/videos' element={<Videos/>} />
          <Route path='/help' element={<Help/>} />
        </Routes> 
    </div>
  );
}

export default App;
