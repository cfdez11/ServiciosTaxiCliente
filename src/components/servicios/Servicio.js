import React, { useContext, useState } from "react";
import ServicioContext from "../../context/servicio/servicioContext";
// import BotonCompartir from "./BotonCompartir";
import { extraerFechaCompleta } from "../../helpers";

//Estilos
import { People, Euro, Edit, Delete, Info, Event } from "@material-ui/icons";
import Table from "react-bootstrap/Table";
import styled from "@emotion/styled";

const CampoInformacion = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 1.5rem;

  & > p {
    margin: 0;
    padding: 0;
  }
  @media (max-width: 768px) {
    font-size: 1rem !important;

    & > p {
      font-size: 1.2rem !important;
    }
  }
`;

const InformacionExtra = styled.div`
  width: 100%;
  margin-top: 1rem;

  p {
    font-size: 1.3rem !important;
  }
`;

const TipoServicio = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 900;
`;

const Button = styled.button`
  font-weight: 900;
  font-family: var(--textFont);
  font-size: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: none;

  & > span {
    display: flex;
    align-items: center;
  }
`;

const ContenedorBotones = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin: 0 !important;
`;

const Servicio = ({ itemref, servicio }) => {
  //Obtener el state del formulario a partir de servicioContext
  const servicioContext = useContext(ServicioContext);
  const {
    mostrarFormulario,
    eliminarServicio,
    modificaServicio,
    seleccionarServicioActivo,
  } = servicioContext;

  //State que controla que se muestre la informacion detallada del servicio
  const [masinformacion, setMasInformacion] = useState(false);

  //State que controla la confirmacion de borrar servicio
  const [confirmado, setConfirmado] = useState(false);

  /*Elimina el servicio. En caso de que no este confirmado se pone confirmado a true para obligar a clicar por segunda 
  vez si el usuario quiere borrarlo. A los 12 segundos se vuelve a desconfirmar*/
  const handleEliminar = (servicioid) => {
    if (confirmado) {
      eliminarServicio(servicioid);
     
    } else {
      setConfirmado(true);
      setTimeout(() => {
        setConfirmado(false);
      }, 12000);
    }

    
  };

  //Modifica el estado de los servicios
  const handleModifica = (servicio) => {
    servicio.estado = !servicio.estado;
    modificaServicio(servicio);
  };

  //Selecciona el servicio como servicio activo y muestra el formulario
  const handleEditar = (servicio) => {
    seleccionarServicioActivo(servicio);
    mostrarFormulario();
  };

  return (
    //añadimos la referencia del csstransition al elemento <li> que es el que queremos darle la transicion. en el atributo ref
    <li ref={itemref} className="tarjeta sombra ">
      <Table striped bordered hover className="tabla-informacion">
        <tbody>
          <tr>
            <td className="w-25">
              <CampoInformacion>
                <p className="mayusculas">{servicio.llegada}</p>
              </CampoInformacion>
            </td>
            <td>
              <CampoInformacion>
                <TipoServicio
                  className={servicio.tipo === 'E' ? "bg-entrada" : "bg-salida"}
                >
                  {servicio.tipo === 'E' ? "Entrada" : "Salida"}
                </TipoServicio>
              </CampoInformacion>
            </td>
            <td>
              <CampoInformacion>
                {extraerFechaCompleta(servicio.fecha)}
                <Event className="ml-05" />
              </CampoInformacion>
            </td>
            <td>
              <CampoInformacion>
                {servicio.precio}
                <Euro className="ml-05" />
              </CampoInformacion>
            </td>
            <td>
              <CampoInformacion>
                {servicio.pasageros}
                <People className="ml-05" />
              </CampoInformacion>
            </td>
            <td>
              <div className="ml-1 mr-1">
                <Button
                  type="button"
                  className={servicio.estado ? "completo" : "incompleto"}
                  onClick={() => handleModifica(servicio)}
                >
                  {servicio.estado ? "Completo" : "Incompleto"}
                </Button>
              </div>
            </td>
            <td>
              <div className="ml-1 mr-1">
                <Button
                  type="button"
                  className="bg-mas-informacion"
                  onClick={() => {
                    setMasInformacion(!masinformacion);
                    seleccionarServicioActivo(servicio);
                  }}
                >
                  <span>
                    Detalles <Info className="ml-05" />
                  </span>
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      {masinformacion ? (
        <InformacionExtra>
          <div className="linea-horizontal-1"></div>
          <Table striped bordered hover className="tabla-informacion">
            <tbody>
              <tr>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Nº Servicio: {servicio.idservicio}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Vuelo: {servicio.refvuelo}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>H. Vuelo: {servicio.horavuelo}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Letreros: {servicio.letreros}</p>
                  </CampoInformacion>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <div className="linea-horizontal-1"></div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Origen: {servicio.salida}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>H. Inicio: {servicio.horainicio}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Conductor: {servicio.conductor}</p>
                  </CampoInformacion>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <div className="linea-horizontal-1"></div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Llegada: {servicio.llegada}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Zona: {servicio.zona}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Vehiculo: {servicio.vehiculo}</p>
                  </CampoInformacion>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <div className="linea-horizontal-1"></div>
                </td>
              </tr>
              <tr>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Agencia: {servicio.ttoo}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Cliente: {servicio.cliente}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Adultos: {servicio.adultos}</p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <CampoInformacion>
                    <p>Niños: {servicio.ninos}</p>
                  </CampoInformacion>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <div className="linea-horizontal-1"></div>
                </td>
              </tr>
              <tr>
                <td className="pt-1 pb-1 pr-1" colSpan="3">
                  <CampoInformacion>
                    <p>
                      Observaciones:{" "}
                      <span className="">{servicio.observaciones}</span>
                    </p>
                  </CampoInformacion>
                </td>
                <td className="pt-1 pb-1">
                  <ContenedorBotones className="ml-1 mr-1">
                    {/* <BotonCompartir servicio={servicio} /> */}
                    <Button
                      type="button"
                      className="bg-gris1 c-white p-05 mr-03"
                      onClick={() => handleEditar(servicio)}
                    >
                      <Edit fontSize="small" />
                    </Button>
                    <Button
                      type="button"
                      className={
                        confirmado
                          ? "c-white bg-red p-05"
                          : "c-white bg-gris p-05"
                      }
                      onClick={() => handleEliminar(servicio._id)}
                    >
                      <Delete fontSize="small" />
                    </Button>
                  </ContenedorBotones>
                </td>
              </tr>
            </tbody>
          </Table>
        </InformacionExtra>
      ) : null}
    </li>
  );
};

export default Servicio;
