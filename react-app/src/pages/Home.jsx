import React, { useState } from 'react';
import Header from '../components/Header';
import './styles/Home.css';

const Home = () => {

    const [mostrarInfo, setMostrarInfo] = useState(false);

    const [latitud, setLatitud] = useState()

    const [longitud, setLongitud] = useState()

    const [grupoInteres, setGrupoInteres] = useState()

    const [lugares, setLugares] = useState()


    const peticionBuscar = async () =>{
        const result = await fetch(`http://localhost:4040/distancia/${grupoInteres}/${latitud}/${longitud}`);
        const data = await result.json();
        setLugares(data);
        setMostrarInfo(!mostrarInfo);
    }

    console.log(latitud)
    console.log(longitud)
    console.log(grupoInteres)

    console.log(mostrarInfo)
    console.log(lugares)
    
  return (
    <>
        <Header/>  
        <div className="container-home">
            <div className="container-coordenadas">
                <div className="item-coordenadas">
                    <h1>API GEO: Turismo</h1>
                </div>
                <div className="item-coordenadas">
                    <div className="container-formulario">
                        <h3>Complete éstos campos:</h3>
                    </div>
                    <div className="container-formulario">
                        <input 
                            type="text"
                            placeholder="Grupo de interés"
                            name="grupoInteres"
                            onChange={(e)=> setGrupoInteres(e.target.value)}/>
                    </div>
                    <div className="container-formulario">
                        <input 
                            type="text"
                            placeholder="Ingrese su latitud"
                            name="latitud"
                            onChange={(e)=> setLatitud(e.target.value)}/>
                    </div>
                    <div className="container-formulario">
                        <input 
                            type="text" 
                            name="longitud"
                            placeholder="Ingrese su longitud"
                            onChange={(e)=> setLongitud(e.target.value)}/>
                    </div>
                    <div className="container-formulario">
                        <button
                            type="submit"
                            onClick={peticionBuscar}
                        >Ver lugares</button>
                    </div>
                </div>
            </div>
            {
            
            mostrarInfo &&
            <div className="container-informacion">
                {
                lugares.map((lugar)=>{
                    return(
                        <div className="informacion-item">
                            <h4>{lugar[0]}</h4>
                            <h4>se encuentra a {(lugar[1]*100).toFixed(2)} metros</h4>
                        </div>
                    )
                })
                }
            </div>
            }
      </div>
    </>
  )
}

export default Home