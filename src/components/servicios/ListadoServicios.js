import React, { Fragment, useContext, useEffect, createRef } from 'react';
import Servicio from './Servicio';
import GrupoContext from '../../context/grupo/grupoContext';
import ServicioContext from '../../context/servicio/servicioContext';
import ResumenGrupo from './informacionservicio/ResumenGrupo';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ExportadorExcel from './ExportadorExcel';

import styled from "@emotion/styled";

const ListaServicios = styled.ul`
    max-width: 600px;
    margin: 0 auto;

    @media(max-width: 768px){
        width: 100%;
    }
`;

const ListadoServicios = () => {

    //Obtener el state del formulario a partir de grupoContext
    const grupoContext = useContext(GrupoContext);
    const { agrupadospor,setAgrupadospor } = grupoContext;

    //Obtener el state del formulario a partir de servicioContext
    const servicioContext = useContext(ServicioContext);
    const { serviciosgrupo, obtenerServicios } = servicioContext;

    //Cuando carga la pagina muestra los servicios del dia de hoy
    useEffect(() => {
        if(agrupadospor.opcion === '' || agrupadospor.agrupado === '' || agrupadospor.fecha === null){
            const hoy = new Date(Date.now());
            setAgrupadospor('Dia','Hoy', hoy);
            obtenerServicios('Dia', hoy);
        }
                
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //creamos una referencia de nodo para evitar el deprecated de finddom a causa de las transiciones
    //hay que crearlo antes del primer return
    
    return ( 
        <Fragment>
            <h2>Servicios de {agrupadospor.agrupado}</h2>
            {(agrupadospor.opcion === 'Dia' || agrupadospor.opcion === 'ID')  ? null : <ResumenGrupo/>  }
            
            <ListaServicios>
            <ExportadorExcel/>
                {serviciosgrupo.length === 0 
                    ? (<li className="tarjeta sombra"><p className="text-center w-100">No hay servicios programados</p></li>)

                    :  
                        <TransitionGroup>
                            {serviciosgrupo.map(servicio => {
    
                                //creamos una referencia de nodo para evitar el deprecated de finddom a 
                                //causa de las transiciones. Esta referencia la tiene que tener el componente csstransition
                                //en el atributo 'nodeRef' y el elemento que vamos a darle la transicion en el atributo 'ref'
                                const itemRef = createRef(null);
                                
                                return(
                                    <CSSTransition
                                    
                                        key={servicio._id}
                                        timeout={300}
                                        classNames="item"
                                        nodeRef={itemRef}
                                    >
                                        
                                        <Servicio
                                            // key={servicio.id} el key ya lo posee el padre por lo que no hace falta ya que este 
                                            //componentes no tiene hermanos
                                            servicio={servicio}
                                            itemref={itemRef}//le pasamos la referencia para añadirsela a la <li>
                                        />
                                    </CSSTransition>
                                );
                            })}

                        </TransitionGroup>       
                }
            </ListaServicios>
            
        </Fragment>
        
     );
}
 
export default ListadoServicios;