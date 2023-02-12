import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonMenuButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonText, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import AuthContext from "../my-context";
import { Route, useHistory } from 'react-router';

import './Home.css';
import { carOutline, bagHandleOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const { authValues, getUserData, queryObjectCollection, queryObjectAllVehicles } = React.useContext(AuthContext);
    const [showLoading, setShowLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (showLoading) {
        (async () => {
            console.log('aquii');
            let user = await getUserData();
            setShowLoading(false);
        })();

    }

}, [getUserData, showLoading]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle></IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard routerLink={"/orders"} >
          <IonCardHeader>
            <IonCardTitle className='ion-text-center'><IonIcon icon={bagHandleOutline}></IonIcon></IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText color="primary">
              <h2 className='ion-text-center'>Mis Solicitudes</h2>
            </IonText >
          </IonCardContent>
        </IonCard>
        <IonCard routerLink={"/winchas"} >
          <IonCardHeader>
            <IonCardTitle className='ion-text-center'><IonIcon icon={carOutline}></IonIcon></IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText color="primary">
              <h2 className='ion-text-center'>Lista de winchas</h2>
            </IonText >
          </IonCardContent>
        </IonCard>
      </IonContent>

    </IonPage>

  );
};

export default Home;
