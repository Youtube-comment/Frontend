import logo from './logo.svg';
import './App.css';
import Menu from './tool/menu/menu';

function App() {
  return (
    <div className="App">
        <Menu></Menu>
        
        <Routes>
          <Route path="/" element={<div>main</div>}/>
        </Routes> 
    </div>
  );
}

export default App;
