import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
const Header = styled.header`
    display: flex;
    justify-content: space-between;
    background-color: var(--gris2);
    padding: 4rem;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;

    & > button {
        color: var(--blanco);
        text-decoration: none;
        margin-left: 2rem;
    }

    & > button:first-of-type{
        margin-left: 0;
    }
`;

const NombreUsuario = styled.p`
    color: var(--blanco);
    font-size: 2.2rem;
    margin: 0;

    & > span {
        font-weight: 900;
        margin-left: 1rem;
    }
`;
const Barra = () => {
  
    //Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;


    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);

    // const ajustes = () => {
    //     props.props.history.push('/ajustes');
    // }
    
    return(
        <Header>
            {usuario ? <NombreUsuario className="nombre-usuario">Hola<span>{usuario.nombre}</span></NombreUsuario> : null}
            <Nav>
                {/* <button 
                    className="btn btn-blank"
                    onClick={() => ajustes()}
                >Ajustes</button> */}
                <Link className="btn btn-blank mr-2" to={'/servicios'} >
                    Inicio
                </Link>
                <Link className="btn btn-blank mr-2" to={'/ajustes'} >
                    Ajustes
                </Link>
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Cerrar Sesión</button>
            </Nav>
        </Header>
    )
}

export default Barra;