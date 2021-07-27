import React, { useContext, useState, Fragment } from 'react';
import { PlaylistAddCheck ,People, Room, Euro, AccountBalance } from '@material-ui/icons';
import { destinoMasSolicitado, numeroServicios, pasagerosMedio, mayorIngreso, ingresoMedio, ingresoTotal } from '../../../helpers';
import ServicioContext from '../../../context/servicio/servicioContext';
import GrupoContext from '../../../context/grupo/grupoContext';
import Grafico from './Grafico';
import { extraeDatosGrafico } from '../../../helpers';

import styled from '@emotion/styled';

const ContenedorSwitch = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const Switch = styled.label`
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
    width: 53px;
    height: 28px;

    & > input {
        display:none;
    }
`;

const Slider = styled.div`
    font-family: 'Font Awesome 5 Free';
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:#2f3848;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 28px;

    &:before{
        position: absolute;
        content: '';
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    &:after{
        content: '';
        color: white;
        display: block;
        position: absolute;
        transform: translate(-50%,-50%);
        font-size: 1.4rem;
        top: 50%;
        left: 69%;
    }
`;

const Input = styled.input`
    &:checked + div {
        background-color: #2f3848;
    }

    &:focus + div {
        box-shadow: 0 0 1px #2196F3;
    }

    &:checked + div:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(25px);
    }
    &:checked + div:after {
        font-family: "Lucida Console", "Courier New", monospace;;
        content: 'i' ;
        position: absolute;
        top: 50%;
        right: -58%;
    }
`;

const ResumenGrupoServicios = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color:var(--blanco);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    flex-direction: row;
    color: black;
    margin-bottom: 2rem;
    border-radius: .5rem;
`;

const CampoInformacion = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;

    & > .icono {
        font-size: 2rem;
    }

    & > p{
        display: inline-block;
        font-size: 2rem;
        margin:0 1rem;
        border-radius: 0.5rem;
    }

    & > p > span {
        font-size: 1.5rem;
    }
`;

const DescripcionCampoInformacion = styled.p`
    margin:1rem 0 0 0;
    text-align: center;
    color: #4f545e;
`;

const ResumenGrupo = () => {

    //Obtener el state del formulario a partir de servicioContext
    const servicioContext = useContext(ServicioContext);
    const { serviciosgrupo } = servicioContext;

    //Obtener el state del formulario a partir de grupoContext
    const grupoContext = useContext(GrupoContext);
    const { agrupadospor } = grupoContext;

    //State para Buscador mes
    const [graficos, setGraficos] = useState(false);

    return ( 
        <Fragment>
            <ContenedorSwitch>
                <Switch>
                <Input 
                    type="checkbox" 
                    id="togBtn" 
                    name="opcionmes" 
                    checked={graficos}
                    onChange={()=>setGraficos(!graficos)}/>
                <Slider></Slider>
                </Switch>
            </ContenedorSwitch>
            

            
            {graficos 
                ? (
                    <ResumenGrupoServicios className="sombra ">
                        <h2>Gráfico Ingresos-Servicios</h2>
                        <Grafico data={extraeDatosGrafico(agrupadospor.opcion, serviciosgrupo)}/> 
                    </ResumenGrupoServicios>
                    
                )
                :(
                    <ResumenGrupoServicios className="sombra ">
                        <div className="w-30">
                            <CampoInformacion>
                                <p>{numeroServicios(serviciosgrupo)}</p>
                                <PlaylistAddCheck className="icono"/>
                            </CampoInformacion>
                            <DescripcionCampoInformacion>Número servicios</DescripcionCampoInformacion>
                        </div>

                        <div className="linea-vertical"></div>

                        <div className="w-30">
                            <CampoInformacion>
                                <p>{pasagerosMedio(serviciosgrupo)}</p>
                                <People className="icono"/>
                            </CampoInformacion>
                            <DescripcionCampoInformacion>Pasageros medio</DescripcionCampoInformacion>
                        </div>

                        <div className="linea-vertical"></div>

                        <div className="w-30">
                            <CampoInformacion>
                                <p>{destinoMasSolicitado(serviciosgrupo)}</p>
                                <Room className="icono"/>
                            </CampoInformacion>
                            <DescripcionCampoInformacion>Destino más solicitado</DescripcionCampoInformacion>
                        </div>

                        <div className="linea-horizontal-2"></div>

                        <div className="w-30">
                            <CampoInformacion>
                                <p>{mayorIngreso(serviciosgrupo)}</p>
                                <Euro className="icono"/>    
                            </CampoInformacion>
                            <DescripcionCampoInformacion>Mayor ingreso</DescripcionCampoInformacion>
                        </div>

                        <div className="linea-vertical"></div>

                        <div className="w-30">
                            <CampoInformacion>
                                <p>{ingresoMedio(serviciosgrupo)}</p>
                                <Euro className="icono"/>
                            </CampoInformacion>
                            <DescripcionCampoInformacion>Ingreso medio</DescripcionCampoInformacion>
                        </div>

                        <div className="linea-vertical"></div>

                        <div className="w-30">
                            <CampoInformacion>
                                <p>{ingresoTotal(serviciosgrupo)}</p>
                                <AccountBalance className="icono"/>
                            </CampoInformacion>
                            <DescripcionCampoInformacion>Ingreso acumulado</DescripcionCampoInformacion>
                    </div>
                </ResumenGrupoServicios>
                )
            }
            
        </Fragment>
        
     );
}
 
export default ResumenGrupo;