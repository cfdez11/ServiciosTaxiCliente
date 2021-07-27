import React, { Fragment, useState, useContext } from 'react';
import ServicioContext from '../../../context/servicio/servicioContext';
import GrupoContext from '../../../context/grupo/grupoContext';
import { exportServicios } from '../../../helpers';

import styled from '@emotion/styled';


const InputFile = styled.input`

    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    
`;

const Label = styled.label`
    width: 100%;
    padding: 1.2rem;
    border: none;
    border-radius: .5rem;
    flex: 1;
    width: 100%;
    background-color: #edf2f6;
    text-align: center;
    color: #2f3848;
   
    cursor: pointer;
    display: inline-block;
    overflow: hidden;


    &:hover{
        background-color: #2f3848;
        color: #ffffff;
        font-weight: 400;
    }
`;

const ImportarDocumento = () => {


    const [ formulario, setFormulario ] = useState(false);

    const [ documento, setDocumento ] = useState('');

    const [ errorformulario, setErrorFormulario ] = useState(false);

    const [ cargado, setCargado ] = useState(false);
    
    //Obtener el state del formulario a partir de servicioContext
    const servicioContext = useContext(ServicioContext);
    const { obtenerServicios, agregarServicio } = servicioContext;

    //Obtener el state del formulario a partir de servicioContext
    const grupoContext = useContext(GrupoContext);
    const { agrupadospor} = grupoContext;

    const handleFileInput = async (e) => {
        
        const file = e.target.files[0];
        
        let text = await file.text();
        setDocumento(text);
        
    }

    const handleSubmit = async e => {
      e.preventDefault();

        if (documento.trim() === "") {
            setErrorFormulario(true);
            return;
       }
        //consulta
        // console.log(documento)
        
        const servicios = await exportServicios(documento);

        //  console.log(servicios);

        servicios.forEach(servicio => {
            // console.log(servicio);
            agregarServicio(servicio);
        });

        
        

      setDocumento("");
      setFormulario(false);
      setCargado(true);
      setTimeout(()=> {
        setCargado(false);
        //no es necesario si en el reducer añadimos los nuevos servicios
        obtenerServicios(agrupadospor.opcion, agrupadospor.fecha);
    }, 2000);

        
    }
    return ( 

        <Fragment>
            
            {
                formulario 
                ? (
                    <Fragment>
                        {/* <button
                            type="button"
                            className="btn btn-block btn-primario" 
                            onClick={ () => setFormulario(false) }
                        >Ocultar Formulario</button> */}
                        <h2 className="mt-3 mb-1">Importar documento</h2>
                        <form className="mt-6"
                            onSubmit={handleSubmit}
                        >
                            <Label htmlFor="fileUpload">{ documento === '' ? 'Subir Archivo': 'Documento cargado'}</Label>
                            <InputFile
                                className="d-none"
                                type= "file"    
                                id="fileUpload"
                                accept=".xml" 
                                onChange={handleFileInput}

                            />
                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Cargar Servicios"
                            />
                        </form>
                    </Fragment>
                    
                ) : (
                        <button
                            type="button"
                            className="btn btn-block btn-primario" 
                            onClick={ () => setFormulario(true) }
                        >Importar Documento</button>
                )
            }

            {errorformulario ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}
            {cargado ? <p className="mensaje correcto">Documento cargado, revise los servicios</p> : null}
        </Fragment> 
        
     );
}
 
export default ImportarDocumento;