import React, { useContext, useEffect } from 'react';
import Barra from '../layout/Barra';
import Perfil from './Perfil';
import AuthContext from '../../context/autenticacion/authContext';

const Servicios = () => {

    //Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);
    
    return ( 
        <div className="contenedor-app">
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <Perfil/>
                </main>
            </div>
        </div>
     );
}
 
export default Servicios;