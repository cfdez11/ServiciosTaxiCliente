import React, { Fragment, useContext, useState } from "react";
import GrupoContext from "../../../context/grupo/grupoContext";
import ServicioContext from "../../../context/servicio/servicioContext";
import ZonaContext from "../../../context/zona/zonaContext";

import styled from '@emotion/styled';

const Input = styled.input`
    padding: 1.2rem;
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

const BuscadorID = () => {
  //Obtener el state del formulario a partir de servicioContext
  const grupoContext = useContext(GrupoContext);
  const { setAgrupadospor } = grupoContext;

  //Obtener el state del formulario a partir de servicioContext
  const servicioContext = useContext(ServicioContext);
  const { obtenerServiciosID } = servicioContext;

  //Obtener el state del formulario a partir de zonaContext
  const zonaContext = useContext(ZonaContext);
  const { ocultarZonas } = zonaContext;

  //State para Buscador mes
  const [idservicio, setIdservicio] = useState('');

  //State error formulario
  const [errorformulario, setErrorformulario] = useState(false);


  //Lee los contenidos de los input
  const handleChange = (e) => {
    setIdservicio(e.target.value);
  }

  //Cuando el usuario envia un servicio
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar el mes
    if (idservicio.trim() === "") {
        setErrorformulario(true);
       return;
    }
    setErrorformulario(false);
    setAgrupadospor('ID',idservicio,Date.now());
    obtenerServiciosID(idservicio);

    ocultarZonas();
    //Agregar al state.
    //CUANDO INSERTAMOS UNA NUEVA TAREA HAY QUE LLAMAR A LA FUNCION QUE LA AGREGA AL STATE DE
    //SERVICIOS CONTEXT Y TAMBIEN HAY QUE LLAMAR A LAS FUNCIONES QUE ACTUALIZAN LAS AGRUPACIONES DE MES Y AÑO, PARA QUE
    //SI HAN INSERTADO UNA TAREA EN UN NUEVO MES/ANO APAREZCA DICHO MES/ANO EN EL MENU DROPDOWN

    //Reiniciar el form
    setIdservicio(0);
  }

  return (
    <Fragment>
      {
        <form className="mt-6" onSubmit={handleSubmit}>
           
            <Input
              className=""
              type="text"
              name="idservicio"
              placeholder="Nº de servicio"
              value={idservicio}
              onChange={handleChange}
            />
            
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Buscar Servicio"
          />
          
        </form>
      }

      {errorformulario ? (
        <p className="mensaje error">Todos los campos son obligatorios</p>
      ) : null}
    </Fragment>
  );
};

export default BuscadorID;
