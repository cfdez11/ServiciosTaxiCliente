import React, { Fragment, useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import ListadoServicios from './ListadoServicios';
import NuevoServicio from '../layout/sidebaropciones/NuevoServicio';
import TablaPrecios from '../preciozonas/TablaPrecios';
import AuthContext from '../../context/autenticacion/authContext';
import ZonaContext from '../../context/zona/zonaContext';

import styled from '@emotion/styled';

const ContenedorApp = styled.div`
    @media (min-width: 768px) {
        display: flex;
        min-height: 100vh;
    }
`;

const SeccionPrincipal = styled.div`
    @media (min-width: 768px) { 
        flex: 1;
    }
`;

const ContenedorServicios = styled.div`
    padding: 4rem;
    position: relative;

    @media(max-width: 768px){
        padding: 1rem;
    }
`;

const Servicios = (props) => {

    //Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;
    	
    //Obtener el state del formulario a partir de zonaContext
    const zonaContext = useContext(ZonaContext);
    const { mostrarzonas, obtenerZonas } = zonaContext;

    useEffect(()=>{
        usuarioAutenticado();
        obtenerZonas();
        
        //eslint-disable-next-line
    },[]);
    
    return ( 
        <ContenedorApp>
            <Sidebar/>
            <SeccionPrincipal>
                <Barra props={props}/>
                <main>
                {mostrarzonas 
                    ? 
                        <TablaPrecios/>

                    :
                        <Fragment>
                            <NuevoServicio/>
                            <ContenedorServicios>
                                <ListadoServicios/>
                            </ContenedorServicios>
                        </Fragment>
                        
                }
                
                </main>
            </SeccionPrincipal>
        </ContenedorApp>
     );
}
 
export default Servicios;