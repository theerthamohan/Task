// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter,Routes,Route } from "react-router-dom";
import Tasklist from "./pages/Tasklist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import './features/style/style.css'

function App() {
  return (

    <>
    <BrowserRouter basename="/Task">
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/tasklist" element={<Tasklist/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>

    </BrowserRouter>
    {/* <Tasklist/>
    <div>
      This is test
    </div> */}
    </>
  );
}

export default App;
