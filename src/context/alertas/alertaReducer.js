import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types/index';
/**https://github.com/benmosher/eslint-plugin-import/blob/v2.22.1/docs/rules/no-anonymous-default-export.md */
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch(action.type){
        case MOSTRAR_ALERTA:
            return {
                //no hace falta copiar el state, como haciamos con las tareas o proyectos porque en este solo tenemos un valor que es la alerta
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                alerta: null
            }
        default:
            return state;
    }
}

