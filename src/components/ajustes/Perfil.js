import React,{ useState, useEffect, useContext, Fragment } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import AlertaContext from '../../context/alertas/alertaContext';
import styled from '@emotion/styled';

const ContenedorPerfil = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;
const Perfil = () => {

    //Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, iniciarSesion, modificarUsuario } = authContext;

    //extraer valores del alerta context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const [ perfil, setPerfil ] = useState({
        id: '',
        nombre: '',
        email: '',
        password: '',
        newpassword: '',
        confirmpassword: ''
    });

    const { nombre, email, password, newpassword, confirmpassword} = perfil;

    const [ contrasena, setContrasena ] = useState(false);

    useEffect(() => {

        if(usuario){
            setPerfil({
                ...perfil,
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            });
        }
        // eslint-disable-next-line
    },[usuario]);
    //Lee los contenidos de los input
    const handleChange = e => {        
        
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        }); 
    }

    const handleSubmit = async e => {
        e.preventDefault();

        //campos requeridos
        if(nombre.trim() === '' || email.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        } 

        
        //si quiere cambiar la contraseña
        if(password !== ''){
            //Password minimo 6 caracteres
            if(password.length < 6 || newpassword.length < 6) {
                mostrarAlerta('La contraseña debe ser de al menos de 6 caracteres', 'alerta-error');
                return;
            }
            //Los dos password sean iguales
            if(newpassword !== confirmpassword){
                mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');
                return;
            }
        }

        await modificarUsuario(perfil);

        if(password !== ''){
            await iniciarSesion({email: email, password: newpassword});
        }

        setPerfil({
            id: '',
            nombre: '',
            email: '',
            password: '',
            newpassword: '',
            confirmpassword: ''
        });
        
    }

    return ( 
        <ContenedorPerfil>
            
            <div className="contenedor-form sombra-dark">
                <h1>Perfil</h1>
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value= {nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value= {email}
                            onChange={handleChange}
                        />
                    </div>
                    {contrasena 
                        ? 
                        <Fragment>
                            <div className="campo-form">
                                <label htmlFor="password">Contraseña anterior</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Tu Contraseña"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="newpassword">Contraseña nueva</label>
                                <input
                                    type="password"
                                    id="newpassword"
                                    name="newpassword"
                                    placeholder="Tu Contraseña"
                                    value={newpassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="confirmpassword">Confirmar contraseña</label>
                                <input
                                    type="password"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    placeholder="Tu Contraseña"
                                    value={confirmpassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </Fragment>
                        : null}

                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block mb-0" 
                            value="Modificar"
                        />
                    </div>
                    <div className="campo-form">
                        <button
                            className="btn btn-primario btn-block mt-0"
                            onClick={()=>setContrasena(!contrasena)}
                        >{contrasena ? 'Ocultar contraseña' : 'Modificar contraseña'}</button>
                    </div>
                </form>

               
            </div>
        </ContenedorPerfil>
     );
}
 
export default Perfil;