import {    REGISTRO_CORRECTO, 
    REGISTRO_ERROR, 
    LOGIN_CORRECTO, 
    LOGIN_ERROR, 
    OBTENER_USUARIO, 
    CERRAR_SESION,
    MODIFICAR_USUARIO
 } 
from '../../types/index';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
switch(action.type){
case REGISTRO_CORRECTO:
case LOGIN_CORRECTO:
    localStorage.setItem('token', action.payload.token);
    return{
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false
    }
case CERRAR_SESION:
case REGISTRO_ERROR:
case LOGIN_ERROR: 
    localStorage.removeItem('token');
    return{
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        mensaje: action.payload,
        cargando: false
    }
case OBTENER_USUARIO:
case MODIFICAR_USUARIO:
    return{
        ...state,
        autenticado: true,
        usuario: action.payload.usuario,
        cargando: false
    }
default:
    return state;
}
}