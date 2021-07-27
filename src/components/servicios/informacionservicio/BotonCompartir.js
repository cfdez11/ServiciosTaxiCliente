import React, { useState, useContext } from 'react';

import { Delete } from '@material-ui/icons';

import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { createTheme } from '@material-ui/core';


import { PDFDownloadLink } from '@react-pdf/renderer';
import ServicioContext from '../../../context/servicio/servicioContext';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import styled from '@emotion/styled';


const Label = styled.label`
  font-family: 'Raleway', sans-serif ;
  font-weight: 900;
  color: #2f3848;
`;

const Input = styled.input`
    margin-top: 1rem;
    margin-bottom:0;
    padding: 1.5rem;
    border: none;
    border-radius: .5rem;
    flex: 1;
    width: 100%;
    background-color: #edf2f6;
    text-align: center;
    font-size: 1.5rem;
    background-color: #edf2f6;
    color: #2f3848;

    &::placeholder{
        color: #2f3848;
    }
`;


/**https://github.com/diegomura/react-pdf/issues/975 */
/**el ultimo ejemplo de popper no nos daba error de ref */
const styles = StyleSheet.create({
  page: { margin: 30 },
  section: { color: 'white', textAlign: 'center', margin: 30 }
});


const BotonCompartir = () => {

    const [ email, setEmail ] = useState('');

    const [ error, setError ] = useState(false);

    //Obtener el state del formulario a partir de servicioContext
    const servicioContext = useContext(ServicioContext);
    const { servicioactivo, compartirServicio, eliminaUsuarioCompartido } = servicioContext;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email.trim() === ''){
          setError(true);
          return;
        }

        compartirServicio(servicioactivo._id,email);
        
      setTimeout(()=> {
        setError(false);
      }, 12000);
    }

    const Mydoc = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View >
            <Text>N.Servicio: {servicioactivo.idservicio}</Text>
            <Text>Tipo: {servicioactivo.tipo}</Text>
            <Text>Salida: {servicioactivo.salida}</Text>
            <Text>Llegada: {servicioactivo.llegada}</Text>
            <Text>Zona: {servicioactivo.zona}</Text>
            <Text>Hora: {servicioactivo.hora}</Text>
            <Text>Fecha: {servicioactivo.fecha}</Text>
            <Text>Ref. Vuelo: {servicioactivo.refvuelo}</Text>
            <Text>Adultos: {servicioactivo.adultos}</Text>
            <Text>Niños: {servicioactivo.ninos}</Text>
            <Text>TTOO: {servicioactivo.ttoo}</Text>
            <Text>Observaciones: {servicioactivo.observaciones}</Text>
            
          </View>
        </Page>
      </Document>
    );

    return (

      <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button  variant="contained" color="primary" {...bindTrigger(popupState)}>
            Open Popover
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            className="t-none"   
          >
              <Paper >
              {servicioactivo 
                ? 
                  <div className="p-2">
                      <form 
                        onSubmit={handleSubmit}
                      >
                          
                              <div className="text-center font-size-15 ">
                                  <Label htmlFor="email">Email del usuario</Label>
                              </div>
                              
                              <Input
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Tu Email"
                                  value= {email}
                                  onChange={(e)=> setEmail(e.target.value)}
                              />
                          
                        
                              <input 
                                  type="submit" 
                                  className="btn btn-primario btn-block" 
                                  value="Compartir"
                              />

            
                      </form>
                      {/* <DocumentoPDF servicio={servicio}/> */}
                      <PDFDownloadLink document={<Mydoc />} fileName='hola' crossorigin> 

                        { ({ blob, url, loading, error }) => (loading ? 'Loading document...' : 
                        <button
                          type="button"
                          className="    w-100 bg-gris btn btn-block btn-primario"
                          
                        >Descargar</button> )}
                        
                
            

                      </PDFDownloadLink> 
                      {error ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}

                        <p className="titulo-fuente text-center mt-3 mb-1">Compartidos </p>
                        <ul className="lista-usuarios p-1 text-center">
                        

                        {servicioactivo.compartido.map(usuario=>{
                          return <li className="usuario-compartido" key={usuario.id}>
                                      {usuario.nombre}
                                      <button
                                        className="btn btn-primario mt-0 p-05 eliminar-zona"
                                        type="button"
                                        onClick={() => eliminaUsuarioCompartido(servicioactivo._id, usuario.id)}
                                      ><Delete/></button></li>
                        })}
                      </ul>
                  </div>
                  
                :  null
              }
              </Paper>
          </Popover>
        </div>
      )}
    </PopupState>

      //   <PopupState  variant="popper" popupId="demo-popup-popper">
      //   {(popupState) => (
      //     <div>

      //       <Button transition="none" variant="contained" color="primary" className="boton-compartir mr-03" {...bindToggle(popupState)}>
      //         <Share/>
      //       </Button>
    
      //       <Popper  className="min-width-300" {...bindPopper(popupState)}>
      //         <Paper>

      //         {servicioactivo 
      //           ? 
      //             <div className="p-2">
      //                 <form 
      //                   onSubmit={handleSubmit}
      //                 >
                          
      //                         <div className="text-center font-size-15 ">
      //                             <Label htmlFor="email">Email del usuario</Label>
      //                         </div>
                              
      //                         <Input
      //                             type="email"
      //                             id="email"
      //                             name="email"
      //                             placeholder="Tu Email"
      //                             value= {email}
      //                             onChange={(e)=> setEmail(e.target.value)}
      //                         />
                          
                        
      //                         <input 
      //                             type="submit" 
      //                             className="btn btn-primario btn-block" 
      //                             value="Compartir"
      //                         />

            
      //                 </form>
      //                 {/* <DocumentoPDF servicio={servicio}/> */}
      //                 <PDFDownloadLink document={<Mydoc />} fileName='hola' crossorigin> 

      //                   { ({ blob, url, loading, error }) => (loading ? 'Loading document...' : 
      //                   <button
      //                     type="button"
      //                     className="    w-100 bg-gris btn btn-block btn-primario"
                          
      //                   >Descargar</button> )}
                        
                
            

      //                 </PDFDownloadLink> 
      //                 {error ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}

      //                   <p className="titulo-fuente text-center mt-3 mb-1">Compartidos </p>
      //                   <ul className="lista-usuarios p-1 text-center">
                        

      //                   {servicioactivo.compartido.map(usuario=>{
      //                     return <li className="usuario-compartido" key={usuario.id}>
      //                                 {usuario.nombre}
      //                                 <button
      //                                   className="btn btn-primario mt-0 p-05 eliminar-zona"
      //                                   type="button"
      //                                   onClick={() => eliminaUsuarioCompartido(servicioactivo._id, usuario.id)}
      //                                 ><Delete/></button></li>
      //                   })}
      //                 </ul>
      //             </div>
                  
      //           :  null
      //         }
      //         </Paper>
   
      //        </Popper>
      //     </div>
      //   )}
      // </PopupState>
      );
}
 
 

export default BotonCompartir ;