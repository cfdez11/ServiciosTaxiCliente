import React, { useReducer } from 'react';
import zonaContext from '../zona/zonaContext';
import zonaReducer from '../zona/zonaReducer';
import clienteAxios from '../../config/axios';

import { 
    MOSTRAR_ZONAS,
    OCULTAR_ZONAS,
    AGREGAR_ZONA,
    ELIMINAR_ZONA,
    OBTENER_ZONAS
} from '../../types';

const ZonaState = props => {

    const initialState = {
        mostrarzonas: false,
        zonas: []   
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(zonaReducer, initialState);

    //Modifica el estado de mostrarzonas
    const mostrarZonas = () => {
        dispatch({
            type: MOSTRAR_ZONAS
        });
    }
    
    //Modifica el estado de mostrarzonas
    const ocultarZonas = () => {
        dispatch({
            type: OCULTAR_ZONAS
        });
    }

    //Añade una zona nueva
    const agregarZona = async (nombre, precio) => {
        // console.log(nombre);
        // console.log(precio);
        try{
            await clienteAxios.post('/api/zonas',{ params: { nombre: nombre, precio: precio}});
            dispatch({
                type: AGREGAR_ZONA,
            });
        }catch(error){
            console.log(error);
        }
    }

    //Obtiene las zonas creadas
    const obtenerZonas = async () => {
        try{
            const resultado = await clienteAxios.get('/api/zonas');
            dispatch({
                type: OBTENER_ZONAS,
                payload: resultado.data.zonas
            });
        }catch(error){
            console.log(error);
        }
    }
    
    //Elimina la zona seleccionada
    const eliminarZona = async (zonaid) => {
        // console.log(zonaid);
        try{
            await clienteAxios.delete(`/api/zonas/${zonaid}`);
            
            dispatch({
                type: ELIMINAR_ZONA,
                payload: zonaid
            });
        }catch(error){
            console.log(error);
        }
    }

    return (
    <zonaContext.Provider
        value={{
            mostrarzonas: state.mostrarzonas,
            zonas:state.zonas,
            mostrarZonas,
            ocultarZonas,
            agregarZona,
            obtenerZonas,
            eliminarZona
            
        }}
    >
        {props.children}
    </zonaContext.Provider>
    )
}

export default ZonaState;