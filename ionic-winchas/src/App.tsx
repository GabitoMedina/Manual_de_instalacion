import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonLoading, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact, useIonViewDidEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import AuthContext from "./my-context";
import { Example } from './components/Menu';
import CreateWincha from './pages/CreateWincha';
import DetalleWincha from './pages/DetalleWincha';
import EditWincha from './pages/EditWincha';
import EditUser from './pages/EditUser';
import Orders from './pages/ListOrders';
import Winchas from './pages/ListWinchas';
import DetailOrder from './pages/DetalleOrder';
import RecoverPassword from './pages/ForgotPassword';

setupIonicReact();

const App: React.FC = () => {
  const { authValues, initialize } = React.useContext(AuthContext);
  const [showLoading, setShowLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (showLoading) {
      (async () => {
        await initialize();
        setShowLoading(false);
      })();
    }
  }, [initialize, showLoading, setShowLoading]);

  console.log('authenticated', authValues.authenticated );

  if (showLoading) {
    // setShowLoading(false);
    return (
      <IonApp>
        <IonLoading message="Cargando" isOpen={showLoading} />
      </IonApp>
    );
  }

  return (
    <IonApp>
      {!authValues.authenticated ? (
        <IonReactRouter>

          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/password">
              <RecoverPassword />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <Example />
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/wincha">
              <CreateWincha />
            </Route>
            <Route exact path="/editWincha/:id">
              <EditWincha />
            </Route>
            <Route exact path="/detalleWincha/:id">
              <DetalleWincha />
            </Route>
            <Route exact path="/editUser">
              <EditUser />
            </Route>
            <Route exact path="/winchas">
              <Winchas />
            </Route>
            <Route exact path="/orders">
              <Orders />
            </Route>
            <Route exact path="/detalleOrden/:id">
              <DetailOrder />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      )}

    </IonApp>
  );
};

export default App;
