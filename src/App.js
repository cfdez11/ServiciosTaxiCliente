import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import RecuperarCuenta from './components/auth/RecuperarCuenta';
import Servicios from './components/servicios/Servicios';
import Ajustes from './components/ajustes/Ajustes';
import ServicioState from './context/servicio/servicioState';
import GrupoState from './context/grupo/grupoState';
import ZonaState from './context/zona/zonaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

//Revisar si tenemos un token cuando iniciamos la app
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  return (
    <GrupoState>
        <ServicioState>
          <ZonaState>
            <AlertaState>
              <AuthState>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Login} /> 
                    <Route exact path="/nueva-cuenta" component={NuevaCuenta} /> 
                    <Route exact path="/recuperar-cuenta" component={RecuperarCuenta} />
                    <RutaPrivada exact path="/servicios" component={Servicios} /> 
                    <RutaPrivada exact path="/ajustes" component={Ajustes} /> 
                  </Switch>
                </Router>
              </AuthState>
           </AlertaState>
          </ZonaState>
      </ServicioState>
    </GrupoState> 
  );
  
}

export default App;
