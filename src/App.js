import logo from './logo.svg';
import './App.css';
import {Route,Routes, Link} from "react-router-dom";
import { Router } from 'react-router-dom';

import Menu from './tool/menu/menu';
import Video from './tool/vedio/video';

function App() {
  return (
    <div className="App">
        <Menu></Menu>
        <Routes>
          <Route path="/" element={<div>main</div>}/>
          <Route path='/vedio' element={<Video/>}/>
        </Routes> 
    </div>
  );
}

export default App;
