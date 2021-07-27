import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {    REGISTRO_CORRECTO, 
            REGISTRO_ERROR, 
            LOGIN_CORRECTO, 
            LOGIN_ERROR, 
            OBTENER_USUARIO, 
            CERRAR_SESION,
            MODIFICAR_USUARIO
         } 
        from '../../types/index';

const AuthState = props => {

    const initialState ={ 
        token: localStorage.getItem('token'), //es el JWT guardado en local storage
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true //atributo del state para evitar que se vea un segundo el formulario de iniciar sesion cuando refrescamos la pagina de proyectos
    }

    const [ state, dispatch ] = useReducer(authReducer, initialState)

    //Las funciones

    //Registrar usuario
    const registrarUsuario = async datos => {
        try {
            //tenemos que enviar una peticion post a la direccion base +  api/usuarios ya que en el servidor para crear un 
            //usuario debemos realizar un post y se realiza en esa direccion
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            //  console.log(respuesta.data);
            
            dispatch({
                type: REGISTRO_CORRECTO,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }

    //Modifica usuario
    const modificarUsuario = async datos => {
        // console.log(datos);
        try{
            const respuesta = await clienteAxios.put('/api/usuarios',datos);
            dispatch({
                type: MODIFICAR_USUARIO,
                payload: respuesta.data
            });
        }catch(error){
            console.log(error);
        }
    }

    //Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if(token){
            //TODO: Funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta.data);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })

        } catch (error) {
            console.log(error.response);

            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            // console.log(respuesta);

            dispatch({
                type: LOGIN_CORRECTO,
                payload: respuesta.data 
            });

            //Obtener usuario
            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
               msg: error.response.data.msg,
               categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    //Ceierra la sesion del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }
    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion,
                modificarUsuario
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}



export default AuthState;