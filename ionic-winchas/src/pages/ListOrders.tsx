import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonMenuButton, IonText, IonIcon, useIonViewDidEnter } from '@ionic/react';
import AuthContext from "../my-context";
import { useHistory } from 'react-router';

import './Home.css';
import { arrowBack } from 'ionicons/icons';

const Orders: React.FC = () => {
    const { authValues, getUserData, queryOrdersByProveedor, queryOrdersByCliente } = React.useContext(AuthContext);
    const [showLoading, setShowLoading] = React.useState<boolean>(true);
    const [showBusy, setShowBusy] = React.useState<boolean>(false);
    const history = useHistory();
    const [orders, setOrders] = React.useState<any>();
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


    const getOrdersByProveedor = async () => {
        setShowBusy(true);
        let res = await queryOrdersByProveedor({ collection: "orders" });

        setOrders(res);
        console.log("ORDERS", res);
        setShowBusy(false);
    }


    const getOrdersByUser = async () => {
        setShowBusy(true);
        let res = await queryOrdersByCliente({ collection: "orders" });

        setOrders(res);
        console.log("ORDERS", res);
        setShowBusy(false);
    }

    if (!showLoading && user) {
        console.log(authValues.userInfo);
        if (authValues.userInfo?.perfil === 'C') {
            console.log("Cliente");
            getOrdersByUser();
        } else {
            console.log("Proveedor");
            getOrdersByProveedor();
        }



        setUser(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Lista de ordenes</IonTitle>
                    <IonButtons slot="end">
                    <IonButton routerLink={"/home"}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonLoading message="Consultando datos" isOpen={showBusy} />
                <IonList>
                    {orders?.map((doc: any) =>
                        <IonItem className={'itemCard' + (` estado${doc.content.estado}`)} key={doc.id} onClick={() => { history.replace(`/detalleOrden/${doc.id}`); history.go(1) }}>
                            <div>
                                <IonLabel className='itemTitle'>Fecha: {doc.content.fechaSolicitud}</IonLabel>
                                <IonLabel className=''>Estado: {doc.content.estado == 'S' ? ("Solicitado") : (doc.content.estado == "R" ? "Rechazado" : "Aprobado")}</IonLabel>
                            </div>
                        </IonItem>
                    )}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Orders;
