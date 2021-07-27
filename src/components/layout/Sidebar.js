import React, { useContext } from 'react';
import ImportarDocumento from './sidebaropciones/ImportarDocumento';
import ServicioContext from '../../context/servicio/servicioContext';
import GrupoContext from '../../context/grupo/grupoContext';
import ZonaContext from '../../context/zona/zonaContext';
import BuscadorMes from './sidebaropciones/BuscadorMes';
import BuscadorID from './sidebaropciones/BuscadorID';

import styled from '@emotion/styled';

const Aside = styled.aside`
    padding: 3rem;
    min-width: 30%;

    @media (min-width: 768px) {
        background-color: var(--blanco);
        flex: 0 0 300px;
    }
`;

const BloquesMenu = styled.div`
    margin-top: 6rem;
`;
const Sidebar = () => {
    
    //Obtener el state del formulario a partir de servicioContext
    const servicioContext = useContext(ServicioContext);
    const { obtenerServicios, mostrarFormulario } = servicioContext;

    //Obtener el state del formulario a partir de grupoContext
    const grupoContext = useContext(GrupoContext);
    const { setAgrupadospor } = grupoContext;

    //Obtener el state del formulario a partir de zonaContext
    const zonaContext = useContext(ZonaContext);
    const { mostrarZonas,ocultarZonas } = zonaContext;

    const handleClickNuevoServicio = () => {
        ocultarZonas();
        mostrarFormulario();
    }
    const handleClickTomorrow = () => {
        ocultarZonas();
        const manana = new Date(Date.now());
        manana.setDate(manana.getDate()+1);

        setAgrupadospor('Dia','Mañana',manana);
        obtenerServicios('Dia',manana);
    }
    const handleClickToday = () => {
        ocultarZonas();
        const hoy = new Date(Date.now());

        setAgrupadospor('Dia','Hoy',hoy);
        obtenerServicios('Dia',hoy);
    }
    const handleClickWeek = () => {
        ocultarZonas();
        const hoy = new Date(Date.now());

        setAgrupadospor('Semana','Esta Semana', hoy);
        obtenerServicios('Semana',hoy);
    }
    const handleClickMonth = () => {
        ocultarZonas();
        const hoy = new Date(Date.now());

        setAgrupadospor('Mes','Este Mes', hoy);
        obtenerServicios('Mes',hoy);
    }


    return ( 
        <Aside>
            <h1> SERVICIOS <span>Taxi</span></h1>
            <button
                type="button"
                className="btn btn-block btn-primario" 
                onClick={ ()=>handleClickNuevoServicio() }
            >Nuevo Servicio</button>

            <ImportarDocumento/>
            <BloquesMenu>
                <h2>Tus Servicios</h2>
                <button
                    type="button"
                    className="btn btn-block btn-primario"
                    onClick={()=>{handleClickTomorrow()}}
                >Servicios de mañana</button>
                <button
                    type="button"
                    className="btn btn-block btn-primario"
                    onClick={()=>{handleClickToday()}}
                >Servicios de hoy</button>
                <button
                    type="button"
                    className="btn btn-block btn-primario"
                    onClick={()=>{handleClickWeek()}}
                >Servicios de la semana</button>
                <button
                    type="button"
                    className="btn btn-block btn-primario"
                    onClick={()=>{handleClickMonth()}}
                >Servicios del mes</button>
            </BloquesMenu>
            <BloquesMenu>
                <BuscadorMes/>
            </BloquesMenu>
            <BloquesMenu>
                <h2>Buscar por ID</h2>
                <BuscadorID/>
            </BloquesMenu>
            <BloquesMenu>
                <h2>Zonas</h2>
                <button
                    type="button"
                    className="btn btn-block btn-primario"
                    onClick={()=>mostrarZonas()}
                >Ajustar Zonas</button>
            </BloquesMenu>            
        </Aside>
     );
}
 
export default Sidebar;