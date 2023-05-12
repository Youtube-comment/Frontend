import logo from './logo.svg';
import './App.css';
import {Route,Routes, Link} from "react-router-dom";
import Menu from './tool/menu/menu';
import Video from './tool/video/video';
import Main from './tool/main/main';
import Videos from './tool/videos/videos';
import Navbar from './tool/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='App_menu'>
        <Menu/>
      </div>

      <div className='App_content'>
        <Routes>
          <Route path='video' element={<Video/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path='/videos' element={<Videos/>} />
        </Routes> 
      </div>
    </div>
    
  );
}

export default App;
