//Necesitamos pasar por el header de la peticion del middleware el token por el atributo x-auth-token
import clienteAxios from './axios';

const tokenAuth = token => {
    if(token){ //en caso de que haya un token lo pasamos al header para que el middleware pueda cogerlo y validar la autenticacion (validar el token)
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else{//en caso de que no haya token seguramente sea porque ha cerrado sesion por lo que lo eliminamos del header
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;