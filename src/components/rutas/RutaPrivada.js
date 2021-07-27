import React,{ useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

//La siguiente linea definimos un componnete que va a contener otro componente dentro, el que le pasamos por parametro,
//es el mecanismo que usamos para redireccionar al usuario cuando no este autenticado y no tengamos en el state el usuario,
//es decir si le ha dado a cerrar sesion
const RutaPrivada = ({ component: Component, ...props}) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando ,  usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        //si no esta autenticado lo redireccionamos a la pagina principal (iniciar sesion)
        //si esta autenticado nos vamos al componente que esta llamando a este componente, es decir quien llama al componente RutaPrivada
        //hemos puesto la condicion cargando para evitar que cuando recarguemos proyectos (es decir nos redireccionemos de proyectos a proyectos)
        //no nos salga 1 segundo el formulario de iniciar sesion. Unicamente redirecciona a iniciar sesion en caso que el usuario no
        //este autenticado y en cargando sea false (mirar en authReducer donde lo ponemos a false- en todos los casos)
        <Route {...props } render = { props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) }

        />
     );
}
 
export default RutaPrivada;