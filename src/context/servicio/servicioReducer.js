import { 
    FORMULARIO_SERVICIO, 
    OCULTAR_FORMULARIO,
    ERROR_FORMULARIO,
    SERVICIOS_ANO,
    SERVICIOS_MES,
    SERVICIOS_SEMANA,
    SERVICIOS_DIA,
    SERVICIOS_ID,
    AGREGAR_SERVICIO,
    ELIMINAR_SERVICIO,
    MODIFICA_SERVICIO,
    SERVICIO_ACTUAL,
    MAS_INFO,
} from '../../types'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default (state, action) => {
    switch(action.type){

        case FORMULARIO_SERVICIO:
            return {
                ...state,
                formulario: true
            }
            
        case OCULTAR_FORMULARIO:
            return {
                ...state,
                formulario: false,
                errorformulario: false

            }
            
        case ERROR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }
           
        case SERVICIOS_ANO:
            return{
                ...state,
                serviciosgrupo : action.payload
                // serviciosgrupo: state.servicios.filter(servicio => (servicio.fecha.getFullYear() === action.payload.year))
            }        
        case SERVICIOS_MES:
            return{
                ...state,
                serviciosgrupo : action.payload
                // serviciosgrupo: state.servicios.filter(servicio => (
                //                                         servicio.fecha.getMonth() === action.payload.month && 
                //                                         servicio.fecha.getFullYear() === action.payload.year))
            }
            
        case SERVICIOS_SEMANA:
            return{
            ...state,
            serviciosgrupo : action.payload
            // serviciosgrupo: state.servicios.filter(servicio => (
            //                                             (extraerSemana(servicio.fecha) === action.payload.week) &&
            //                                             servicio.fecha.getMonth() === action.payload.month && 
            //                                             servicio.fecha.getFullYear() === action.payload.year))
            }
            
        case SERVICIOS_DIA:
            return{
                ...state,
                serviciosgrupo : action.payload
                // serviciosgrupo: state.servicios.filter(servicio => (
                //                                         servicio.fecha.getDate() === action.payload.day &&
                //                                         servicio.fecha.getMonth() === action.payload.month && 
                //                                         servicio.fecha.getFullYear() === action.payload.year))
            }

        case SERVICIOS_ID:
            return{
                ...state,
                // serviciosgrupo: state.servicios.filter(servicio => (servicio.id === action.payload)),
                errorformulario: false,
                serviciosgrupo: action.payload
            }
            
        case AGREGAR_SERVICIO:
            return {
                ...state,
                errorformulario: false,
                servicioactivo: null,
                formulario: false
                // serviciosgrupo: [ ...state.serviciosgrupo, action.payload ]
            }
        case ELIMINAR_SERVICIO:
            return{
                ...state,
                serviciosgrupo: state.serviciosgrupo.filter(servicio => servicio._id !== action.payload)
            }
        case MODIFICA_SERVICIO: 
            return{
                ...state,
                serviciosgrupo: state.serviciosgrupo.map(servicio => servicio._id === action.payload._id ? action.payload : servicio ),
                servicioactivo: null,
                formulario: false,
            }
        case SERVICIO_ACTUAL:
            return{
                ...state,
                servicioactivo: action.payload
            }
        case MAS_INFO:
            return{
                ...state,
                masinfo: !state.masinfo
            }
        default:
            return state;
           
    }
}
