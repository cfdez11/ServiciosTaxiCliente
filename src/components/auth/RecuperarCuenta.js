import React, { useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const RecuperarCuenta = (props) => {

    const [email, setEmail] = useState('');

    //extraer valores del alerta context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado } = authContext;

    //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado 
    useEffect(()=>{
        if(autenticado){
            props.history.push('/servicios');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        //eslint-disable-next-line
    },[mensaje, autenticado, props.history]);

    //Cuando el usuario quiere recuperar la contraseña
    const handleSubmit = e => {
        e.preventDefault();

        //Validar
        if(email.trim() ==='' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
       
        //pasarlo al action
        
    }
    return ( 
        <div className="form-usuario">
        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
        <div className="contenedor-form sombra-dark">
            <h1>Recuperar cuenta</h1>
            <form
                onSubmit={handleSubmit}
            >
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Tu Email"
                        value= {email}
                        onChange={() => setEmail(this.target.value)}
                    />
                </div>
                <div className="campo-form">
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-block" 
                        value="Recuperar"
                    />

                </div>
            </form>

            <Link to={'/'} className="enlace-cuenta">
                Iniciar Sesión
            </Link>
        </div>
    </div>
    );
}
 
export default RecuperarCuenta;