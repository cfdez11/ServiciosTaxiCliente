import React, { useContext } from 'react';
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import ServicioContext from '../../context/servicio/servicioContext';

const styles = StyleSheet.create({
  page: { backgroundColor: 'tomato' },
  section: { color: 'white', textAlign: 'center', margin: 30 }
});

const DocumentoPDF = () => {

  //Obtener el state del formulario a partir de servicioContext
  const servicioContext = useContext(ServicioContext);
  const { servicioactivo } = servicioContext;

  // console.log(servicioactivo);

  return (

    <Document>
    <Page size="A4" style={styles.page}>
      <View >
        {/* <Text>{`N.Servicio: ${servicioactivo.idservicio}`}</Text> */}
        {/* <Text>Tipo: {servicio.tipo}</Text>
        <Text>Salida: {servicio.salida}</Text>
        <Text>Llegada: {servicio.llegada}</Text>
        <Text>Zona: {servicio.zona}</Text>
        <Text>Hora: {servicio.hora}</Text>
        <Text>Fecha: {servicio.fecha}</Text>
        <Text>Ref. Vuelo: {servicio.refvuelo}</Text>
        <Text>Adultos: {servicio.adultos}</Text>
        <Text>Niños: {servicio.ninos}</Text>
        <Text>TTOO: {servicio.ttoo}</Text>
        <Text>Observaciones: {servicio.observaciones}</Text>
         */}
        
      </View>
    </Page>
  </Document>
     
 
    
  );
}
export default DocumentoPDF;