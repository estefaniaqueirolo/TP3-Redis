import React from 'react'
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import AgregarGrupo from './pages/AgregarGrupo';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/agregargrupo' element={<AgregarGrupo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
