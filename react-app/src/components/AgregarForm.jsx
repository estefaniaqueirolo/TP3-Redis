import React, { useState} from 'react';
import './styles/AgregarForm.css'

const AgregarForm = () => {

    const [formInput, setFormInput] = useState({
        'grupoInteres': '',
        'latitud': '',
        'longitud': '',
        'lugar': ''
    });

    const handleInputChange = (event) => {
        setFormInput({
            ...formInput,
            [event.target.name] : event.target.value
        })
    }

    console.log(formInput)

    const peticionAgregar = async(e) =>{
        e.preventDefault();
        const res = await fetch('http://localhost:4040/cargar',{
            method: 'POST',
            body: JSON.stringify(formInput),
            headers: {"Content-Type": "application/json"}
        });
        const data = await res.json();
      }

    return (
        <div className='container-agregarGrupo'>
            <div className="item-grupo">
                <h2>Agregar nuevo grupo de interes</h2>
            </div>

            <div className="item-grupo">
                <input type="text" 
                    name="grupoInteres"
                    placeholder="Nombre del grupo de interes"
                    onChange={handleInputChange}/>
            </div>

            <div className="item-grupo">
                <input type="text" 
                    name="lugar"
                    placeholder="Nombre del lugar" 
                    onChange={handleInputChange}/>
            </div>

            <div className="item-grupo">
                <input type="text" 
                    name="latitud"
                    placeholder="Latitud" 
                    onChange={handleInputChange}/>
            </div>

            <div className="item-grupo">
                <input type="text" 
                    name="longitud"
                    placeholder="Longitud" 
                    onChange={handleInputChange}/>
            </div>

            <div className="item-grupo">
                <button
                    type='submit'
                    onClick={peticionAgregar}>Agregar</button>
            </div>
        </div>
    )
}

export default AgregarForm