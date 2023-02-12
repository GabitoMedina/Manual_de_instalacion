import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonMenuButton, IonText, IonCard, IonCardContent, IonIcon, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import AuthContext from "../my-context";
import { Geolocation } from '@capacitor/geolocation';
import { useHistory, useParams } from 'react-router';

import './Home.css';
import { arrowBack, call, logoWhatsapp, navigate } from 'ionicons/icons';
import { setDefaultHandler } from 'workbox-routing';
import { toast } from '../toast';

const DetailOrder: React.FC = () => {
    const { authValues, queryObjectById, editObjectById} = React.useContext(AuthContext);
    const [showLoading, setShowLoading] = React.useState<boolean>(true);
    const [showBusy, setShowBusy] = React.useState<boolean>(true);
    const history = useHistory();
    const [orders, setOrders] = React.useState<any>();
    const [user, setUser] = React.useState<any>();
    const [wincha, setWincha] = React.useState<any>();
    const [item, setItem] = React.useState<any>();
    const params = useParams<{ id: string }>();

    useIonViewDidEnter(() => {
        setShowLoading(true);
        setShowBusy(true);
    });

    React.useEffect(() => {
        if (showLoading) {
            (async () => {
                let res = await queryObjectById({ collection: "orders", id: params.id });
                setOrders(res);
                console.log('res detalle', res);
                if (res.content.wincha) {
                    let w = await queryObjectById({ collection: "vehicles", id: res.content.wincha });
                    setWincha(w);
                }
                if (authValues.userInfo.perfil == "C") {
                    let user = await queryObjectById({ collection: "usuarios", id: res.content.proveedor });
                    setUser(user);
                } else {
                    let user = await queryObjectById({ collection: "usuarios", id: res.content.usuario });
                    setUser(user);
                }
                setShowLoading(false);
                setShowBusy(false);
            })();
        }

    }, [queryObjectById, showLoading, showBusy]);

    const addLocation = async () => {
        const position = await Geolocation.getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("LOCATION", position);
        return setItem({
            longitud: longitude,
            latitude: latitude
        })

    }

    const aprobarOrden = async () => {
        orders.content.estado="A";
        let res = await editObjectById({ collection: "orders", id: params.id, obj: orders });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('La orden se ha aprobado exitosamente!')
            setShowLoading(true);
            setShowBusy(true);
        }

    }

    const rechazarOrden = async () => {
        orders.content.estado="R";
        let res = await editObjectById({ collection: "orders", id: params.id, obj: orders });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('La orden se ha rechazado exitosamente!')
            setShowLoading(true);
            setShowBusy(true);
        }

    }

    if (showLoading) {
        return (
            <IonPage>
                <IonLoading message="Cargando orden" isOpen={showBusy} duration={1000} />
            </IonPage>
        );

    } else {

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton routerLink={"/orders"}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle>{authValues.userInfo?.perfil === 'C' ? 'Cliente' : 'Proveedor'}</IonTitle>
                        <IonButtons slot="end"></IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonLoading message="Cargando orden" isOpen={showBusy} duration={1000} />
                    <IonText color="primary">
                        <h3 className='ion-text-center'>Detalles de Solicitud</h3>
                    </IonText >
                    <IonList>
                        <IonItem>
                            <IonLabel>Fecha Solicitud: {orders.content.fechaSolicitud}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Wincha: {wincha.content.placa}  {wincha.content.marca}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Estado: {orders.content.estado == "S" ? "Solicitado" : (orders.content.estado == "R" ? "Rechazado": "Aprobado")}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>{authValues.userInfo?.perfil === 'C' ? 'Propietario' : 'Solicitante'}: {user.nombre} {user.apellido} </IonLabel>
                        </IonItem>
                        <IonItem>
                            {authValues.userInfo?.perfil === 'P' ? (<a href={`https://www.google.com/maps/dir/${wincha.content.latitude},${wincha.content.longitud}/${orders.content.latOrigen},${orders.content.lonOrigen}`} target="_blank" rel="noreferrer"><IonIcon icon={navigate}></IonIcon> Ver ruta</a>) : (
                                <a href={`https://maps.google.com/?q=${wincha.content.latitude},${wincha.content.longitud}`} target="_blank" rel="noreferrer">Ver ubicación</a>
                            )}                        </IonItem>
                    </IonList>
                    <IonCard>
                        <IonText>
                            <h3>¿Necesitas más información?</h3>
                        </IonText>
                        <IonCardContent><div className='divButtons'>
                            <a className='linkButton' target="_blank" rel="noreferrer" href={`tel:${user.telefono}`}><IonIcon icon={call}></IonIcon></a>
                            <a className='linkButton' target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?phone=${user.telefono}&text=Hola,%20`}
                            ><IonIcon icon={logoWhatsapp}></IonIcon>
                            </a></div>
                        </IonCardContent>
                    </IonCard>
                    {orders.content.estado == "S" && authValues.userInfo?.perfil === 'P'  ? ( <div className='ion-text-center' >
                        <IonButton onClick={() => aprobarOrden()}>Aceptar</IonButton>
                        <IonButton color="danger" onClick={() => rechazarOrden()}>Rechazar</IonButton>
                    </div>):(<></>)}
                   
                </IonContent>
            </IonPage>
        );
    }
};

export default DetailOrder;
