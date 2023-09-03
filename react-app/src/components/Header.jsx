import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
  return (
    <div className='container-header'>
        <div className="header-item">
            <Link to="/">
                <button> Inicio </button>
            </Link>
        </div>
        <div className="header-item">
            <Link to="/agregargrupo">
                <button> Agregar grupo de interes </button>
            </Link>
        </div>
    </div>
  )
}

export default Header