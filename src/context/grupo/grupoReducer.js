import { 
    AGRUPADO_POR,
    ERROR_FORMULARIOGRUPO
 } from '../../types'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch(action.type){
        case AGRUPADO_POR:
            return{
                ...state,
                agrupadospor: action.payload
            }
        case ERROR_FORMULARIOGRUPO:
            return{
                ...state,
                errorformulario: true
            }
        default:
            return state;
    }

}
