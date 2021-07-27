import React, { Fragment, useContext, useState, useEffect } from 'react';
import ServicioContext from '../../../context/servicio/servicioContext';
import GrupoContext from "../../../context/grupo/grupoContext";
import ZonaContext from '../../../context/zona/zonaContext';

import { extraerFechaCompleta } from '../../../helpers';
import styled from '@emotion/styled';

const ContenedorFormulario = styled.div`
    background-color: #1a202d;
    padding: 4rem;

    & > form {
        max-width: 600px;
        margin: 0 auto;
    }
`;

const ContenedorInput = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    label {
        margin-bottom: 1rem;
        color: #ffffff;
    }

`;

const Input = styled.input`
    padding: 1rem;
    border: none;
    border-radius: .5rem;
    flex: 1;
    width: 100%;
`;

const Textarea = styled.textarea`
    padding: 1rem;
    border: none;
    border-radius: .5rem;
    flex: 1;
    width: 100%;
`;

const NuevoServicio = () => {

    //Obtener el state del formulario a partir de servicioContext
    const servicioContext = useContext(ServicioContext);
    const { formulario, errorformulario, servicioactivo, ocultarFormulario, mostrarError, obtenerServicios, agregarServicio, modificaServicio } = servicioContext;

    //Obtener el state del formulario a partir de grupoContext
    const grupoContext = useContext(GrupoContext);
    const { agrupadospor } = grupoContext;

    //Obtener el state del formulario a partir de zonaContext
    const zonaContext = useContext(ZonaContext);
    const { zonas } = zonaContext;

    //State para Servicio
    const [ servicio, setServicio ] = useState({
        idservicio: 0,
        salida: '',
        cliente: '',
        ttoo: '',
        fecha: '',
        horainicio: '',
        letreros: '',
        conductor: '',
        vehiculo: '',
        refvuelo: '',
        horavuelo: '',
        llegada: '',
        zona: '',
        adultos: 0,
        ninos: 0,
        precio: 0,
        observaciones: '',
        tipo: '',
        
    });
    
    //Extrae nombre de proyecto
    const { idservicio, salida, cliente, ttoo, 
            fecha, horainicio, letreros, 
            conductor, vehiculo , refvuelo, horavuelo,
            llegada, zona, adultos,
            ninos, observaciones, tipo,precio } = servicio;

    //Effect que detecta si hay un servicio seleccionado para editar
    useEffect(() => {
        if(servicioactivo !== null){
            
            setServicio({
                idservicio: servicioactivo.idservicio,
                salida: servicioactivo.salida,
                cliente: servicioactivo.cliente ,
                ttoo: servicioactivo.ttoo,
                fecha: extraerFechaCompleta(servicioactivo.fecha),
                horainicio: servicioactivo.horainicio,
                letreros: servicioactivo.letreros,
                conductor: servicioactivo.conductor,
                vehiculo: servicioactivo.vehiculo,
                refvuelo: servicioactivo.refvuelo,
                horavuelo: servicioactivo.horavuelo,
                llegada: servicioactivo.llegada,
                zona: servicioactivo.zona,
                adultos: servicioactivo.adultos,
                ninos: servicioactivo.ninos,
                precio: servicioactivo.precio,
                observaciones: servicioactivo.observaciones,
                tipo: servicioactivo.tipo,
                pasageros: servicioactivo.pasageros
            });
            
        }else{
            setServicio({
                idservicio: 0,
                salida: '',
                cliente: '',
                ttoo: '',
                fecha: '',
                horainicio: '',
                letreros: '',
                conductor: '',
                vehiculo: '',
                refvuelo: '',
                horavuelo: '',
                llegada: '',
                zona: '',
                adultos: 0,
                ninos: 0,
                precio: 0,
                observaciones: '',
                tipo: '',
                pasageros: 0
            });
            
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [servicioactivo]);

    //Lee los contenidos de los input
    const handleChange = e => {        
        if(e.target.name !== 'zona') {
            setServicio({
                ...servicio,
                [e.target.name]: e.target.value
            });

        }else{
            const zonaseleccionada = zonas.filter(zonaelement =>  zonaelement.nombre === e.target.value)[0];
            if(zonaseleccionada){
                setServicio({
                    ...servicio,
                    zona: e.target.value,
                    precio: zonaseleccionada.precio
                });
            }else{
                setServicio({
                    ...servicio,
                    zona: e.target.value,
                    precio: 0
                })
            }
            // console.log(zonaseleccionada);
            
        }
 
    }

    //Cuando el usuario envia un servicio
    const handleSubmit = async e => {
        e.preventDefault()
    

        //Validar el servicio
        if( salida.trim() === '' || fecha.trim() === '' || horainicio.trim() === '' || idservicio === 0 ||
            cliente.trim() === '' || ttoo.trim() === '' || refvuelo.trim() === '' || llegada.trim() === '' || 
            zona.trim() === '' || adultos === 0 || precio === 0 || tipo === ''){
            mostrarError();
            return;
        }

        //Si es edicion se ejecuta un codigo para editar sino para insertar
        if(servicioactivo === null) { //no hay servicio seleccionado por lo que el usuario quiere insertar
            //tarea nueva
            //Agregar al state. 
            // servicio.mindest='RAT';
            servicio.estado = false;
            servicio.fecha = new Date(fecha);
            // console.log(parseInt(servicio.adultos,10) + parseInt(servicio.ninos));
            servicio.pasageros = parseInt(servicio.adultos,10) + parseInt(servicio.ninos);
            
            await agregarServicio(servicio);
        }else{
            //Actualiza el servicio
            
            servicio._id = servicioactivo._id;
            // console.log(servicio);
            // console.log(servicioactivo);
            servicio.fecha = new Date(fecha);

            await modificaServicio(servicio);
        }
        

        //CUANDO INSERTAMOS UNA NUEVA TAREA HAY QUE LLAMAR A LA FUNCION QUE LA AGREGA AL STATE DE 
        //SERVICIOS CONTEXT Y TAMBIEN HAY QUE LLAMAR A LAS FUNCIONES QUE ACTUALIZAN LAS AGRUPACIONES DE MES Y AÑO, PARA QUE
        //SI HAN INSERTADO UNA TAREA EN UN NUEVO MES/ANO APAREZCA DICHO MES/ANO EN EL MENU DROPDOWN

        
        //Reiniciar el form
        setServicio({
            idservicio: 0,
            salida: '',
            cliente: '',
            ttoo: '',
            fecha: '',
            horainicio: '',
            letreros: '',
            conductor: '',
            vehiculo: '',
            refvuelo: '',
            horavuelo: '',
            llegada: '',
            zona: '',
            adultos: 0,
            ninos: 0,
            precio: 0,
            observaciones: '',
            tipo: '',
            pasageros: 0
        });

        obtenerServicios(agrupadospor.opcion,agrupadospor.fecha);
    }


    return ( 
        <Fragment>
            
            {
                formulario 
                ? (
                  
                    <ContenedorFormulario>
                        <h2 className="c-white">Nuevo Servicio</h2> 
                        <form
                        onSubmit={handleSubmit}
                        >
                            <ContenedorInput>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="idservicio">Nº de servicio</label>
                                    <Input
                                        className="mt-1"
                                        type= "number"
                                        placeholder="131061514"
                                        name= "idservicio"
                                        id= "idservicio"
                                        value={idservicio}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="salida">Origen</label>
                                    <Input
                                        type="text"
                                        className="mt-1"
                                        placeholder="Lugar de salida"
                                        name="salida"
                                        id="salida"
                                        value={salida}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="cliente">Cliente</label>
                                    <Input
                                        type="text"
                                        className="mt-1"
                                        placeholder="Transunion"
                                        name="cliente"
                                        id="cliente"
                                        value={cliente}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="ttoo">TTOO</label>
                                    <Input
                                        type="text"
                                        className="mt-1"
                                        placeholder="Soultour"
                                        name="ttoo"
                                        id="ttoo"
                                        value={ttoo}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="fecha">Fecha</label>
                                    <Input
                                        className="mt-1"
                                        type="date"
                                        name="fecha"
                                        id="fecha"
                                        value={fecha}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="horainicio">Hora Inicio</label>
                                    <Input
                                        className="mt-1"
                                        type="time"
                                        name="horainicio"
                                        id="horainicio"
                                        value={horainicio}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="letreros">Letreros</label>
                                    <Input
                                        className="mt-1"
                                        type="text"
                                        name="letreros"
                                        id="letreros"
                                        placeholder="Letreros"
                                        value={letreros}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="conductor">Conductor</label>
                                    <Input
                                        className="mt-1"
                                        type="text"
                                        name="conductor"
                                        id="conductor"
                                        placeholder="Conductor"
                                        value={conductor}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="vehiculo">Vehiculo</label>
                                    <Input
                                        className="mt-1"
                                        type="text"
                                        name="vehiculo"
                                        id="vehiculo"
                                        placeholder="Vehiculo"
                                        value={vehiculo}
                                        onChange={handleChange}

                                    />
                                </div>
                               
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="refvuelo">Ref. Vuelo</label>
                                    <Input
                                        className="mt-1"
                                        type="text"
                                        name="refvuelo"
                                        id="refvuelo"
                                        placeholder="VY3152"
                                        value={refvuelo}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="horavuelo">Hora Vuelo</label>
                                    <Input
                                    className="mt-1"
                                    type="time"
                                    name="horavuelo"
                                    id="horavuelo"
                                    placeholder="Hora Vuelo"
                                    value={horavuelo}
                                    onChange={handleChange}

                                />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="llegada">Destino</label>
                                        <Input
                                        className="mt-1"
                                        type="text"
                                        name="llegada"
                                        id="llegada"
                                        placeholder="Lugar llegada"
                                        value={llegada}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="zona">Zona</label>
                                    <Input
                                        className="mt-1"
                                        type="text"
                                        name="zona"
                                        id="zona"
                                        placeholder="PMI"
                                        value={zona}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="adultos">Adultos</label>
                                    <Input
                                        className="mt-1"
                                        type= "number"
                                        placeholder="Adultos"
                                        name= "adultos"
                                        id= "adultos"
                                        value={adultos}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="ninos">Niños</label>
                                    <Input
                                        className="mt-1"
                                        type= "number"
                                        placeholder="Niños"
                                        name= "ninos"
                                        id= "ninos"
                                        value={ninos}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                
                                
                                <div className="w-40 mr-1 mb-2">
                                    <label className="w-100" htmlFor="precio">Precio</label>
                                    <Input
                                        className="mt-1"
                                        type= "number"
                                        placeholder="Precio"
                                        name= "precio"
                                        id= "precio"
                                        value={precio}
                                        onChange={handleChange}

                                    />
                                </div>
                                
                                <div className="w-100   ml-2 mb-2 ">
                                    <label className="ml-1 mr-1" htmlFor="e">Entrada</label>
                                    <input 
                                        className=""
                                        type="radio"
                                        name="tipo"
                                        value="E"
                                        id="e"
                                        checked={tipo === 'E' ? true : false}
                                        onChange={handleChange}
                                    />
                                    <label className="ml-1 mr-1" htmlFor="s">Salida</label>
                                     <input 
                                        className=""
                                        type="radio"
                                        name="tipo"
                                        value="S"
                                        id="s"
                                        checked={tipo === 'S' ? true : false}
                                        onChange={handleChange}
                                    />
                                
                                </div>
                                
                                <div className="w-100 mt-1">
                                    <label className="w-100" htmlFor="observaciones">Observacions</label>
                                    <Textarea
                                        className="mt-1"
                                        type="text"
                                        name="observaciones"
                                        id="observaciones"
                                        placeholder="Observaciones"
                                        value={observaciones}
                                        onChange={handleChange}

                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-block btn-primario mb-2 "
                                    value={servicioactivo ? "Modificar Servicio" : "Agregar Servicio"}
                                />
                            </ContenedorInput> 
                             

                        </form>

                        <button
                            type="button"
                            className="btn btn-block btn-primario mw-600 mb-2 centrar"
                            onClick={()=>ocultarFormulario()} 
                        >Ocultar Formulario</button>
                        
                        {errorformulario ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}

                    </ContenedorFormulario>
                 
                    
                ) : null
            }

            
        </Fragment> 
        
     );
}
 
export default NuevoServicio;