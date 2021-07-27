import React, { Fragment, useContext, useState } from "react";
import GrupoContext from "../../../context/grupo/grupoContext";
import ServicioContext from "../../../context/servicio/servicioContext";
import ZonaContext from "../../../context/zona/zonaContext";

import styled from '@emotion/styled';

const Input = styled.input`
    padding: 1rem;
    border: none;
    border-radius: .5rem;
    flex: 1;
    width: 100%;
    background-color: #edf2f6;
    text-align: center;
    background-color: #edf2f6;
    color: #2f3848;

    &::placeholder{
        color: #2f3848;
    }

`;

const InputSlider = styled.input`
    &:checked + div {
        background-color: #2f3848;
    }

    &:focus + div {
        box-shadow: 0 0 1px #2196F3;
    }

    &:checked + div:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(37px);
    }
    &:checked + div:after {
        content: 'MES' ;
        position: absolute;
        top: 50%;
        right: -75%;
    }
`;

const Switch = styled.label`
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
    width: 65px;
    height: 28px;

    & > input {
        display:none;
    }
`;

const Slider = styled.div`
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
        content: 'AÑO';
        color: white;
        display: block;
        position: absolute;
        transform: translate(-50%,-50%);
        font-size: 1.4rem;
        top: 50%;
        left: 67%;
    }
`;

const BuscadorMes = () => {
  //Obtener el state del formulario a partir de servicioContext
  const grupoContext = useContext(GrupoContext);
  const { errorformulario, setAgrupadospor, mostrarError } = grupoContext;

  //Obtener el state del formulario a partir de servicioContext
  const servicioContext = useContext(ServicioContext);
  const { obtenerServicios } = servicioContext;

  //Obtener el state del formulario a partir de zonaContext
  const zonaContext = useContext(ZonaContext);
  const { ocultarZonas } = zonaContext;

  //State para Buscador mes
  const [fecha, setFecha] = useState({
    opcionmes: true,
    contenido: ''
  });

  //extraemos atributos del state mes
  const { opcionmes, contenido } = fecha;

  //Lee los contenidos de los input
  const handleChange = (e) => {
    setFecha({
      ...fecha,
      [e.target.name] : e.target.value
      
    });
  }

  //Cuando el usuario envia un servicio
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar el mes
    if (contenido.trim() === "") {
      mostrarError();
      return;
    }
    let opcion='';
    let agrupado='';
    // {opcionmes ? opcion = 'Mes' : opcion='Año'}

    const mesSeleccionado = new Date(contenido);
    // console.log(mesSeleccionado)

    if(opcionmes){
      opcion = 'Mes'
      agrupado = mesSeleccionado.toLocaleString('es-ES', {month: "long"});
      agrupado = agrupado[0].toUpperCase() + agrupado.slice(1);

    }else{
      opcion='Año'
      agrupado = mesSeleccionado.getFullYear();
      // console.log(agrupado)
    }
  
    
    setAgrupadospor(opcion, agrupado, mesSeleccionado );
 
    obtenerServicios(opcion, mesSeleccionado);

    ocultarZonas();
    //Agregar al state.
    //CUANDO INSERTAMOS UNA NUEVA TAREA HAY QUE LLAMAR A LA FUNCION QUE LA AGREGA AL STATE DE
    //SERVICIOS CONTEXT Y TAMBIEN HAY QUE LLAMAR A LAS FUNCIONES QUE ACTUALIZAN LAS AGRUPACIONES DE MES Y AÑO, PARA QUE
    //SI HAN INSERTADO UNA TAREA EN UN NUEVO MES/ANO APAREZCA DICHO MES/ANO EN EL MENU DROPDOWN

    //Reiniciar el form
    setFecha({
      opcionmes: true,
      contenido: ''
    });
  }

  return (
    <Fragment>
      <h2>Filtrar por {opcionmes ? 'Mes' : 'Año'} </h2>
      {
        <form className="mt-6" onSubmit={handleSubmit}>
          {opcionmes 
            ? (
                <Input
                  className="text-center"
                  type="month"
                  name="contenido"
                  value={contenido}
                  onChange={handleChange}
                />
              )
          
          :  (
              <Input
                className="text-center p-12 "
                type="number"
                name="contenido"
                placeholder="Año"
                value={contenido}
                onChange={handleChange}
              />
            )
          }          
          
          
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Buscar Servicio"
          />

          
            <Switch className="mt-1">
              <InputSlider 
                type="checkbox" 
                id="togBtn" 
                name="opcionmes" 
                checked={opcionmes}
                onChange={()=>setFecha({...fecha,  opcionmes : !opcionmes})}/>
              <Slider></Slider>
            </Switch>
          
        </form>
      }

      {errorformulario ? (
        <p className="mensaje error">Todos los campos son obligatorios</p>
      ) : null}
    </Fragment>
  );
};

export default BuscadorMes;
