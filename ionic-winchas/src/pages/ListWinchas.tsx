import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonMenuButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonText, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, useIonViewDidEnter } from '@ionic/react';
import AuthContext from "../my-context";
import { Route, useHistory } from 'react-router';

import './Home.css';
import { IonReactRouter } from '@ionic/react-router';
import { apps, arrowBack, flash } from 'ionicons/icons';
import Orders from './ListOrders';

const Winchas: React.FC = () => {
    const { authValues, getUserData, queryObjectCollection, queryObjectAllVehicles } = React.useContext(AuthContext);
    const [showLoading, setShowLoading] = React.useState<boolean>(true);
    const [showBusy, setShowBusy] = React.useState<boolean>(false);
    const history = useHistory();
    const [winchas, setWinchas] = React.useState<any>();
    const [user, setUser] = React.useState<boolean>();

    React.useEffect(() => {
        if (showLoading) {
            (async () => {
                console.log('aquii');
                let user = await getUserData();
                setUser(user);
                setShowLoading(false);
                console.log('aquii', user, showLoading);
            })();

        }

    }, [getUserData, showLoading]);

    useIonViewDidEnter(() => {
        setShowLoading(true);
        setShowBusy(true);
    });



    const getVehiclesByUser = async () => {
        setShowBusy(true);
        let res = await queryObjectCollection({ collection: "vehicles" });

        setWinchas(res);
        console.log("WINCHAS", res);
        setShowBusy(false);
    }


    const getAllVehicles = async () => {
        setShowBusy(true);
        let res = await queryObjectAllVehicles({ collection: "vehicles" });

        setWinchas(res);
        console.log("WINCHAS", res);
        setShowBusy(false);
    }




    if (!showLoading && user) {
        console.log('aquii 22');
        console.log(authValues.userInfo);
        if (authValues.userInfo?.perfil === 'C') {
            console.log("Cliente");
            getAllVehicles();
        } else {
            console.log("Proveedor");
            getVehiclesByUser();
        }

        setUser(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Winchas disponibles</IonTitle>
                    <IonButtons slot="end">
                        {authValues.userInfo?.perfil === 'P' ? (<IonButton routerLink={"/wincha"}>Nuevo</IonButton>) : (<></>)}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonLoading message="Consultando datos" isOpen={showBusy} />
                <IonList>
                    {winchas?.map((doc: any) =>
                        <IonItem className='itemCard' key={doc.id} onClick={() => { history.replace(`/detalleWincha/${doc.id}`); history.go(1) }}>

                            <IonThumbnail slot="start">
                                <IonImg src={doc.content.foto}></IonImg>
                            </IonThumbnail>

                            {doc.price ? (<div>
                                <IonLabel className='itemTitle'>{doc.content.marca} {doc.content.placa}</IonLabel>
                                <IonLabel>${doc.price.precioKilometro} por levantamiento</IonLabel>
                                <IonLabel>${doc.price.precioLevantamiento} por kilometro</IonLabel>
                            </div>) : (<div><IonLabel className='itemTitle'>{doc.content.marca} {doc.content.placa}</IonLabel></div>)}

                        </IonItem>
                    )}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Winchas;
