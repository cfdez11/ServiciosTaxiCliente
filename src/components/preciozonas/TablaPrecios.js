import React, { useState, useEffect, useContext, createRef } from 'react';
import ZonaContext from '../../context/zona/zonaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Delete, Euro, Room } from '@material-ui/icons';
import styled from '@emotion/styled';

const ContenedorZonas = styled.div`
    max-width: 600px;
    margin: 0 auto;
    align-items: center;
`;
const ContendorFormulario = styled.div`
    background-color: var(--gris3);
    padding: 4rem;

    form {
        max-width: 600px;
        margin: 0 auto;
    }
`;
const ContenedorInput = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const InputZona = styled.input`
    padding: 1rem;
    border: none;
    border-radius: .5rem;
    flex: 2;
    background-color: var(--gris1);
    color: var(--gris2);
`;

const InputPrecio = styled.input`
    padding: 1rem;
    border: none;
    border-radius: .5rem;
    flex: 2;
    background-color: var(--gris1);
    color: var(--gris2);
`;
const ContenedorZonaPrecio = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
`;
const EliminarZona = styled.button`
    font-weight: 900;
    font-family: var(--textFont);
    font-size: 1rem!important;
    padding: 1rem!important;
    border-radius: .5rem!important;
    cursor: pointer;
    border: none;
`;

const TablaPrecios = () => {

    //Obtener el state del formulario a partir de servicioContext
    const zonaContext = useContext(ZonaContext);
    const { zonas, agregarZona, obtenerZonas, eliminarZona } = zonaContext;
    
    //state para los inputs
    const [ zonanueva, setZonaNueva ] = useState({
        zona: '',
        precio: 0
    });

    const {zona, precio} = zonanueva;

    const [ error, setError ] = useState(false);

    const [ formulario, setFormulario ] = useState(false);

    useEffect(() => {
        obtenerZonas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = e => {
        setZonaNueva({
            ...zonanueva,
            [e.target.name]: e.target.value
        });

    }
    
    const handleSubmit = async e => {
        e.preventDefault();

        if(zona.trim()==='' || precio === 0){
            setError(true);
            return;
        }

        await agregarZona(zona,precio);

        obtenerZonas();

        setZonaNueva({
            zona: '',
            precio: 0
        });

        setFormulario(false);

    }

   
    return ( 
        <ContenedorZonas className="pl-1 pr-1">
                {formulario 
                    ?   
                    <ContendorFormulario className="mb-5">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <h2 className="c-white">Crear nueva zona</h2>

                            <ContenedorInput>
                                <div className="w-40 mr-1 ml-1 mb-2">
                                    <label className=" c-white w-100 " htmlFor="zona">Zona</label>
                                    
                                    <InputZona
                                        type="text"
                                        placeholder="ZONA"
                                        className="input-zona w-100"
                                        name="zona"
                                        value={zona}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-40 mr-1 mb-2">
                                    <label className="c-white w-100" htmlFor="precio">Precio</label>
                                    <InputPrecio
                                        type="number"
                                        placeholder="PRECIO"
                                        className="input-precio w-100"
                                        name="precio"
                                        value={precio}
                                        onChange={handleChange}
                                    />
                                </div>
                                    <input 
                                        type="submit"
                                        className = "btn btn-primario btn-block"
                                        value= "Crear Zona"
                                    />
                            </ContenedorInput>
                            <button
                                className = "btn btn-primario btn-block"
                                onClick={() => setFormulario(false)}
                            >Cerrar Formulario</button>
                        </form>

                        {error ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}
                    </ContendorFormulario>
                    :
                       null 
                
                }
                
            <h2 className="mt-5">Precios por zonas</h2>
            {!formulario 
                ? 
                <button
                    className = "btn btn-primario btn-block mw-300  centrar mb-2"
                    onClick={() => setFormulario(true)}
                >Crear Zona</button>
                : null 
            }
            
            {zonas.length === 0 
                ?   (<li className="tarjeta sombra p-4 justify-content-center"><p>No hay servicios programados</p></li>)
                :
                    <div className="mb-5">           
                                         
                                <TransitionGroup
                                    className="mw-300 centrar"
                                >
                                    {zonas.map(zona => {
                                        const itemRef = createRef(null);

                                        return(
                                            <CSSTransition
                                    
                                                key={zona._id}
                                                timeout={300}
                                                classNames="item w-100"
                                                nodeRef={itemRef}
                                            >   

                                                <ContenedorZonaPrecio className="tarjeta sombra mb-1 ">
                                                    <p className="mt-0 mb-0 align-items"><Room/> {zona.nombre}</p>
                                                    <p className="mt-0 mb-0 "><Euro/> {zona.precio}</p>
                                                    <EliminarZona
                                                        className="btn btn-primario mt-0 p-05 eliminar-zona"
                                                        type="button"
                                                        onClick={() => eliminarZona(zona._id)}
                                                            ><Delete/></EliminarZona>
                                                </ContenedorZonaPrecio>
                                                
                                               
                                            </CSSTransition>   
                                        );
                                                        
                                    })}
                                </TransitionGroup>                  
                    </div>
            }
        </ContenedorZonas>
        
    );
}
 
export default TablaPrecios;