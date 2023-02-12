import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonLoading, IonCard, IonImg, IonButtons, IonIcon, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { toast } from '../toast';
import AuthContext from '../my-context';
import WinchaProps from '../components/WinchaProps';
import './Home.css';
import { arrowBack, camera } from 'ionicons/icons';
import { useForm } from 'react-hook-form';

const CreateWincha: React.FC<WinchaProps> = () => {
    const { addObjectToCollection } = React.useContext(AuthContext);
    const [busy, setBusy] = useState<boolean>(false);
    const history = useHistory();
    const { register, handleSubmit, resetField, reset, formState: { errors } } = useForm();
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
        estado: true,
    });
    const [errores, setErrores] = useState<any>({
        foto: false,
        geo: false
    });

    useIonViewDidEnter(() => {
        setItem({});
        setErrores({});
    });


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
            source:CameraSource.Camera,
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
        setBusy(true)
        
        console.log('photo', item);
        let res = await addObjectToCollection({ collection: "vehicles", objectData: item });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('La Wincha se ha registrado exitosamente!')
            history.push('/winchas');
            reset({placa:'', marca:'',tipo:'',anio:'',altura:'',largo:'',peso:''});
        }
        setBusy(false)
    }

    function mayus(e: any) {
        return e.target.value = e.target.value.toUpperCase();
    }

    async function onSubmit(values: any) {
        console.log('values', values);
        if(item.foto === ''){
            errores.foto = true;
        }else{
            errores.foto = false;
        }
        if(item.latitude === 0){
            errores.geo = true;
        }else{
            errores.geo = false;
        }
        if(!errores.foto && !errores.geo ){
            item.estado=true;
            createVehicle();
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink={"/winchas"} onClick={()=>reset({placa:'', marca:'',tipo:'',anio:'',altura:'',largo:'',peso:''})}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>
                    <IonTitle>Crear Vehículo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonLoading isOpen={busy} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonItem>
                        <IonLabel position="floating">Placa <span className='asterisk'>*</span></IonLabel>
                        <IonInput type='text' onKeyUp={(e: any) => mayus(e)} {...register('placa', { required: true })} onIonChange={(e: any) => setItem({ ...item, placa: e.target.value })} />
                        {errors.placa && errors.placa.type === "required" && <p className="error">Ingresa una placa</p>}
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Marca <span className='asterisk'>*</span></IonLabel>
                        <IonInput {...register('marca', { required: true })} onIonChange={(e: any) => setItem({ ...item, marca: e.target.value })} />
                        {errors.marca && <p className="error">Ingresa una marca</p>}
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Tipo <span className='asterisk'>*</span></IonLabel>
                        <IonInput {...register('tipo', { required: true })} onIonChange={(e: any) => setItem({ ...item, tipo: e.target.value })} />
                        {errors.tipo && errors.tipo.type === "required" && <p className="error">Ingresa un tipo</p>}
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Año <span className='asterisk'>*</span></IonLabel>
                        <IonInput type='number' {...register('anio', { required: true, minLength: 4, maxLength: 4 })} onIonChange={(e: any) => setItem({ ...item, anio: e.target.value })} />
                        {errors.anio && errors.anio.type === "required" && <p className="error">Ingresa un año</p>}
                        {errors.anio && errors.anio.type === "maxLength" && <p className="error">Ingrese máximo 4 dígitos</p>}
                        {errors.anio && errors.anio.type === "minLength" && <p className="error">Ingrese mínimo 4 dígitos</p>}
                    </IonItem >
                    <IonItem>
                        <IonLabel position="floating">Altura(m) <span className='asterisk'>*</span></IonLabel>
                        <IonInput type='number' {...register('altura', { required: true })} onIonChange={(e: any) => setItem({ ...item, altura: e.target.value })} />
                        {errors.altura && <p className="error">Ingresa una altura</p>}
                    </IonItem >
                    <IonItem>
                        <IonLabel position="floating">Largo(m) <span className='asterisk'>*</span></IonLabel>
                        <IonInput type='number' {...register('largo', { required: true })} onIonChange={(e: any) => setItem({ ...item, largo: e.target.value })} />
                        {errors.largo && <p className="error">Ingresa un largo</p>}
                    </IonItem >
                    <IonItem>
                        <IonLabel position="floating">Peso(kg) <span className='asterisk'>*</span></IonLabel>
                        <IonInput type='number' {...register('peso', { required: true })} onIonChange={(e: any) => setItem({ ...item, peso: e.target.value })} />
                        {errors.peso && <p className="error">Ingresa un peso</p>}
                    </IonItem >
                    <IonItem>
                        <IonCard>
                            {item.foto ? (<IonImg src={item.foto}></IonImg>) : (
                                <IonLabel> <IonIcon icon={camera}></IonIcon></IonLabel>
                            )}
                             {errores.foto && <p className="error">Toma una foto</p>}
                            <IonButton onClick={() => takePhoto()}>Tomar foto</IonButton>

                        </IonCard>
                       
                    </IonItem >
                    <IonItem>
                        <IonCard>
                            <IonLabel>Longitud: {item.longitud}</IonLabel>
                            <IonLabel>Latitude: {item.latitude}</IonLabel>
                            {errores.geo && <p className="error">Registre una geolocalizacion</p>}
                            <IonButton onClick={() => addLocation()}> Geolocalizacion</IonButton>

                        </IonCard>
                    </IonItem >
                    <IonButton className='login-button' expand='full' type='submit'>Guardar</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default CreateWincha;
