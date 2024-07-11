import logo from './logo.svg';
import { Container } from 'react-bootstrap'
import Headers from './Components/Headers'
import './App.css';

import { BrowserRouter, Route, Routes } from'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    // <div className="App">
    // //   <header className="App-header">
    // //     <img src={logo} className="App-logo" alt="logo" />
    // //     <p>
    // //       Edit <code>src/App.js</code> and save to reload.
    // //     </p>
    // //     <a
    // //       className="App-link"
    // //       href="https://reactjs.org"
    // //       target="_blank"
    // //       rel="noopener noreferrer"
    // //     >
    // //       Learn React
    // //     </a>
    // //   </header>
    // </div>
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
    
    </>
   
  );
}

export default App;
