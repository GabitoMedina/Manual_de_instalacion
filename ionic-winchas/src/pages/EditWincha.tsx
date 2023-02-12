import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonLoading, IonImg, IonCard, IonButtons, IonIcon, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useParams } from 'react-router-dom';
import { toast } from '../toast';
import AuthContext from '../my-context';
import WinchaProps from '../components/WinchaProps';
import './Home.css';
import { arrowBack } from 'ionicons/icons';

const EditWincha: React.FC<WinchaProps> = () => {
    const params = useParams<{ id: string }>();
    const { editObjectById, queryObjectById } = React.useContext(AuthContext);
    const [loading, setShowLoading] = useState<boolean>(true);
    const history = useHistory();
    const [wincha, setWincha] = React.useState<any>();
    const [item, setItem] = useState<WinchaProps>({
        placa: '',
        marca: '',
        tipo: '',
        anio: '',
        altura: 0,
        largo: 0,
        peso: 0,
        latitude: 0,
        longitud: 0,
        foto: '',
        estado: true
    });

    useIonViewDidEnter(() => {
        setShowLoading(true);
    });


    const getVehicleById = async () => {
        let res = await queryObjectById({ collection: "vehicles", id: params.id });

        setItem(res.content);
        setWincha(res);
        console.log("WINCHAS", res);

    }

    if (loading) {
        getVehicleById();
        setShowLoading(false);
    }

    const addLocation = async () => {
        const position = await Geolocation.getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("LOCATION", position);
        return setItem({
            ...item,
            longitud: longitude,
            latitude: latitude
        })
    }

    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Prompt,
            quality: 100,
            width: 800,
            height:800
        });
        const photo = `data:image/jpeg;base64,${cameraPhoto.base64String}`;
        return setItem({
            ...item,
            foto: photo
        });
    }

    const createVehicle = async () => {
        setShowLoading(true)
        wincha.content = item;
        console.log('EDIT', wincha);
        let res = await editObjectById({ collection: "vehicles", id: params.id, obj: wincha });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('La Wincha se ha actualizado exitosamente!')
            history.push(`/detalleWincha/${params.id}`);
        }
        setShowLoading(false)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink={`/detalleWincha/${params.id}`}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>
                    <IonTitle>Editar Vehículo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonLoading isOpen={loading} />
                <IonItem>
                    <IonLabel position="floating">Placa <span className='asterisk'>*</span></IonLabel>
                    <IonInput required onIonChange={(e: any) => setItem({ ...item, placa: e.target.value })} value={item.placa} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Marca <span className='asterisk'>*</span></IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, marca: e.target.value })} value={item.marca} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Tipo <span className='asterisk'>*</span></IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, tipo: e.target.value })} value={item.tipo} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Año <span className='asterisk'>*</span></IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, anio: e.target.value })} value={item.anio} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Altura(m) <span className='asterisk'>*</span></IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, altura: e.target.value })} value={item.altura} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Largo(m) <span className='asterisk'>*</span></IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, largo: e.target.value })} value={item.largo} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Peso(kg) <span className='asterisk'>*</span></IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, peso: e.target.value })} value={item.peso} />
                </IonItem >
                <IonItem >
                    <IonCard>
                        <IonImg src={item.foto}></IonImg>
                        <IonButton onClick={() => takePhoto()}>Actualizar foto</IonButton>
                    </IonCard>
                </IonItem >
                <IonItem >
                    <IonCard>
                        <IonLabel>Longitud: {item.longitud}</IonLabel>
                        <IonLabel>Latitude: {item.latitude}</IonLabel>
                        <IonButton onClick={() => addLocation()}>Actualizar Geolocalizacion</IonButton>
                    </IonCard>
                </IonItem >
                <IonButton className='login-button' expand='full' onClick={() => createVehicle()}>Actualizar</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default EditWincha;
