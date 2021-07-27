import { 
    MOSTRAR_ZONAS,
    OCULTAR_ZONAS,
    AGREGAR_ZONA,
    ELIMINAR_ZONA,
    OBTENER_ZONAS
} from '../../types'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch(action.type){
        case MOSTRAR_ZONAS:
            return {
                ...state,
                mostrarzonas: true
            }
        case OCULTAR_ZONAS:
            return {
                ...state,
                mostrarzonas: false
            }
        case AGREGAR_ZONA:
            return{
                ...state
            }
        case OBTENER_ZONAS:
            return{
                 ...state,
                 zonas: action.payload
            }
        case ELIMINAR_ZONA:
            return{
                ...state,
                zonas: state.zonas.filter(zona => zona._id !== action.payload)
            }
        default:
            return state;
           
    }
}
