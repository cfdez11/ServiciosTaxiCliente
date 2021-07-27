import React, { Fragment, useContext } from 'react';
import ServicioContext from '../../context/servicio/servicioContext';
import GrupoContext from '../../context/grupo/grupoContext';

import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportadorExcel = () => {

    //Obtener el state del formulario a partir de servicioContext
    const servicioContext = useContext(ServicioContext);
    const { serviciosgrupo } = servicioContext;

    //Obtener el state del formulario a partir de servicioContext
    const grupoContext = useContext(GrupoContext);
    const { agrupadospor} = grupoContext;
  

    //Devuelve un arreglo con los atributos que tiene un servicio
    const columnasExcel = () => {
        if(serviciosgrupo.length === 0) return [];
        let columnas = Object.getOwnPropertyNames(serviciosgrupo[0]);
        const excluidos = ["compartido", "_id", "creador", "__v"];
        columnas = columnas.filter(columna => !excluidos.includes(columna));
        return columnas;  
    }

    const camelCase = (str) =>  {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    };


    return (
        <Fragment>
            {serviciosgrupo.length !== 0
                ? 
                    <ExcelFile element={    <button
                                                className="bg-gris btn btn-block btn-primario mb-2 w-100"
                                                type="button"
                                            >Exportar Excel</button>
                                        } filename= {`${agrupadospor.opcion}_${agrupadospor.fecha}`} >


                        <ExcelSheet data={serviciosgrupo} name="Servicios">

                            {
                                columnasExcel().map(atributo => {
                                return <ExcelColumn  key= {atributo} label={camelCase(atributo)} value={atributo}/>
                                })
                            }

                            </ExcelSheet>
                        </ExcelFile>
             :
                null
            }
        </Fragment>
        
            
        
       
        

      );
}
 
export default ExportadorExcel;