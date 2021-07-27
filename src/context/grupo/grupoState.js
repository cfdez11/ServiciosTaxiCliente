import React, { useReducer } from 'react';
import grupoContext from './grupoContext';
import grupoReducer from './grupoReducer';
import { 
    AGRUPADO_POR,
    ERROR_FORMULARIOGRUPO
 } from '../../types';

const GrupoState = props => {

    const initialState = {
        errorformulario: false,
        agrupadospor: {opcion: 'Dia', agrupado: 'Hoy', fecha: null},
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(grupoReducer, initialState);

    //Funciones para el CRUID

    //Establece la opcion, la fecha y el nombre la agrupacion
    const setAgrupadospor = (opcion, agrupado, fecha) => {
        dispatch({
            type: AGRUPADO_POR,
            payload: {opcion, agrupado, fecha}
        });
    }

    //Mostrar error en formulario por errores
    const mostrarError = () => {
        dispatch({
            type: ERROR_FORMULARIOGRUPO
        })
    }
    
    return(
        <grupoContext.Provider
            value={{
                errorformulario: state.errorformulario,
                agrupadospor: state.agrupadospor,
                setAgrupadospor,
                mostrarError
            }}
        >
            {props.children}
        </grupoContext.Provider>
    )
}

export default GrupoState;