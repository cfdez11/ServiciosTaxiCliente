import React, { useReducer } from 'react';
import servicioContext from './servicioContext';
import servicioReducer from './servicioReducer';
import {
    FORMULARIO_SERVICIO,
    OCULTAR_FORMULARIO,
    ERROR_FORMULARIO,
    SERVICIOS_MES,
    SERVICIOS_DIA,
    SERVICIOS_SEMANA,
    SERVICIOS_ID,
    SERVICIOS_ANO,
    AGREGAR_SERVICIO,
    ELIMINAR_SERVICIO,
    MODIFICA_SERVICIO,
    SERVICIO_ACTUAL,
    MAS_INFO
} from '../../types';

import clienteAxios from '../../config/axios';

const ServicioState = props => {

    const initialState = {
        formulario: false,
        errorformulario: false,
        serviciosgrupo: [],
        servicioactivo: null,
        masinfo: false,
        zonas: []
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(servicioReducer, initialState);

    //Funciones para el CRUID

    //Muestra el formulario de ingreso de servicio
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_SERVICIO
        });
    }

    //Oculta el formulario de ingreso de servicio
    const ocultarFormulario = () => {
        dispatch({
            type: OCULTAR_FORMULARIO
        });
    }

    //Mostrar error en formulario por errores
    const mostrarError = () => {
        dispatch({
            type: ERROR_FORMULARIO
        })
    }


    //Muestra servicios del dia/Semana/Mes seleccionado
    const obtenerServicios = async (opcion, date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        switch(opcion){
            case 'Dia':
            //DECODIFICAR EN UTF-8
                try {
                    const resultado = await clienteAxios.get('/api/servicios/dia',{ params: { ano: year, mes: month, dia: day}});
                    // console.log(resultado.data.servicios);
                    dispatch({
                        type: SERVICIOS_DIA,
                        payload: resultado.data.servicios
                    });
                } catch (error) {
                    console.log(error);
                }

                break;
            case 'Semana':
                // const week = extraerSemana(date);
                try {
                    const resultado = await clienteAxios.get('/api/servicios/semana',{ params: { ano: year, mes: month, dia: day}});
                    //  console.log(resultado.data.servicios)
                    dispatch({
                        type: SERVICIOS_SEMANA,
                        payload: resultado.data.servicios
                    });
                } catch (error) {
                    console.log(error);
                }

                break
            case 'Mes':
                try {
                    const resultado = await clienteAxios.get('/api/servicios/mes',{ params: { ano: year, mes: month}});
                     
                    // console.log(resultado.data.servicios);
                    dispatch({
                        type: SERVICIOS_MES,
                        payload: resultado.data.servicios
                    });
                } catch (error) {
                    console.log(error);
                }

                break;
            case 'Año':
                try {
                    const resultado = await clienteAxios.get('/api/servicios/ano',{ params: { ano: year }});
                    //  console.log(resultado.data.servicios);
                    dispatch({
                        type: SERVICIOS_ANO,
                        payload: resultado.data.servicios
                    });
                } catch (error) {
                    console.log(error);
                }

                break;
            default:
                return null;

        }
    }

    //Obtiene el servicio con la misma id
    const obtenerServiciosID = async (servicioid) => {
        try{
            const resultado = await clienteAxios.get('/api/servicios/id',{ params: { id: servicioid }});
            // console.log(resultado.data.servicios);
            dispatch({
                type: SERVICIOS_ID,
                payload: resultado.data.servicio
            })
        }catch(error){

        }

    }

    //Agregar un nuevo servicio
    const agregarServicio = async (servicio) => {
        console.log(servicio);
        try {
            await clienteAxios.post('api/servicios', servicio);
            // console.log(resultado);

            dispatch({
                type: AGREGAR_SERVICIO
                //payload: resultado.data
            });

        } catch (error) {
            console.log(error);
        }

    }

    //Eliminar un nuevo servicio
    const eliminarServicio = async (servicioid) => {
        try{
            await clienteAxios.delete(`/api/servicios/${servicioid}`);
            dispatch({
                type: ELIMINAR_SERVICIO,
                payload: servicioid
            });
        }catch(error){
            console.log(error);
        }

    }

    //Modifica el estado del servicio
    const modificaServicio = async (servicio) => {
        try{
            await clienteAxios.put(`/api/servicios/${servicio._id}`, servicio);
            // console.log(resultado);
            dispatch({
                type: MODIFICA_SERVICIO,
                payload: servicio
            });
        }catch(error){
            console.log(error);
        }

    }

    //Establece el servicio seleccionada para editar
    const seleccionarServicioActivo = (servicio) => {
        dispatch({
            type: SERVICIO_ACTUAL,
            payload: servicio
        });
    }

    //Muestra el modal de mas info de servicio
    const modificarMasInfo = () => {
        dispatch({
            type: MAS_INFO
        });
    }

    //Comparte el servicio a otro usuario de la app
    const compartirServicio = async (servicioid, correo) => {
        // console.log(correo);
        // console.log(servicioid);
        try{
            await clienteAxios.put('/api/servicios/comparte',{ params: { id: servicioid, email: correo}});
            // console.log(resultado);
        }catch(error){
            console.log(error);
        }
    }

    //Elimina a un usuario de compartir un servicio
    const eliminaUsuarioCompartido = async (servicioid, usuarioid) => {
        try{
            await clienteAxios.delete(`/api/servicios/comparte/${servicioid}&${usuarioid}`);
        }catch(error){
            console.log(error)
        }
    }

    return(
        <servicioContext.Provider
            value={{
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                servicios: state.servicios,
                serviciosgrupo: state.serviciosgrupo,
                servicioactivo: state.servicioactivo,
                masinfo: state.masinfo,
                mostrarFormulario,
                ocultarFormulario,
                mostrarError,
                obtenerServicios,
                obtenerServiciosID,
                agregarServicio,
                eliminarServicio,
                modificaServicio,
                seleccionarServicioActivo,
                modificarMasInfo,
                compartirServicio,
                eliminaUsuarioCompartido

            }}
        >
            {props.children}
        </servicioContext.Provider>
    )
}

export default ServicioState;