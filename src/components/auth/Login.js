import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    // extraer valores del context Alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // extraer valores del context Auth
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    //En caso de que el password o usuario no exista
    useEffect(() => {
        if(autenticado){ //si esta autenticado vamos a la pagina de servicios
            props.history.push('/servicios');
        }

        if(mensaje){//si hay mensaje es que hay error
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //State para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    //Extraer usuario
    const { email, password } = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    //Cuando el usuario quiere iniciar sesion
    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error' );
            return;
        }

        //pasarlo al action
        iniciarSesion({ email, password });
    }
    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
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
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Contraseña"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Iniciar Sesión"
                        />

                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener cuenta
                </Link>
                {/* <Link to={'/recuperar-cuenta'} className="enlace-cuenta">
                    Recuperar cuenta
                </Link> */}
            </div>
        </div>
     );
}
 
export default Login;