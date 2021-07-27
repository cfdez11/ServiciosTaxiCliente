import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //extraer valores del alerta context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

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
    //State para iniciar sesión
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirm: ''
    });

    //Extraer usuario
    const { nombre, email, password, confirm } = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    //Cuando el usuario quiere iniciar sesion
    const handleSubmit = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() ==='' || email.trim() ==='' || password.trim() ==='' || confirm.trim() ===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //Password minimo 6 caracteres
        if(password.length < 6) {
            mostrarAlerta('La contraseña debe ser de al menos de 6 caracteres', 'alerta-error');
            return;
        }
        //Los dos password sean iguales
        if(password !== confirm){
            mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');
            return;
        }
        //pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
         });
    }
    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear una cuenta</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value= {nombre}
                            onChange={handleChange}
                        />
                    </div>
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
                        <label htmlFor="confirm">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Repite tu Contraseña"
                            value={confirm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Registrarme"
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
 
export default NuevaCuenta;