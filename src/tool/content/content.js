import {Route,Routes, Link} from "react-router-dom";
import Video from './video/video';
import Main from './main/main';
import Videos from './videos/videos';
import Help from './help/help';

function Content(){
    return(
        <div>
            <Routes>
                <Route path='video' element={<Video/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path='/videos' element={<Videos/>} />
                <Route path='/help' element={<Help/>} />
            </Routes> 
        </div>
    );
}

export default Content;