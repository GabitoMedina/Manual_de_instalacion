import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonButtons, IonLoading, IonIcon, IonApp } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from '../toast';
import UserProps from '../components/UserProps';
import AuthContext from '../my-context';
import './Home.css';
import { arrowBack } from 'ionicons/icons';
import { useForm } from 'react-hook-form';

const EditUser: React.FC<UserProps> = () => {
    const { authValues, editObjectById } = React.useContext(AuthContext);
    const [busy, setBusy] = useState<boolean>(true)
    const [loading, setShowLoading] = useState<boolean>(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [item, setItem] = useState<UserProps>({
        apellido: '',
        direccion: '',
        identificacion: 0,
        telefono: 0,
        nombre: '',
        perfil: '',
        imagen: ''
    });
    const history = useHistory();

    if (busy && authValues.userInfo !== null && authValues.uid !== null) {
        setItem(authValues.userInfo);
        console.log('item', authValues.uid, item);
        setShowLoading(false);
        setBusy(false);
    }



    const actualizar = async () => {
        setShowLoading(true)
        let res = await editObjectById({ collection: "usuarios", id: authValues.uid, obj: item });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('Los datos se han actualizado exitosamente!')
            history.push("/home");
        }
        setShowLoading(false)
    }

    async function onSubmit(values: any) {
        console.log('values', values);
        actualizar();
      }

    if (busy) {
        return (
            <IonApp>
                <IonLoading message="Cargando" isOpen={loading} />
            </IonApp>
        );
    } else {

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton routerLink={"/home"}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                        </IonButtons>
                        <IonTitle>Mis Datos</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='ion-padding'>
                    <IonLoading isOpen={loading} />
                    <form onSubmit={handleSubmit(onSubmit)}> 
                    <IonItem>
                        <IonLabel position="floating">Nombre <span className='asterisk'>*</span></IonLabel>
                        <IonInput  {...register('nombre', { required: true, pattern: /^[A-Za-z]+$/i })} onIonChange={(e: any) => setItem({ ...item, nombre: e.target.value })} value={item.nombre} />
                        {errors.nombre && errors.nombre.type === "required" && <p className="error">Ingresa tu nombre</p>}
                        {errors.nombre && errors.nombre.type === "pattern" && <p className="error">Ingresa solo letras</p>}
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Apellido <span className='asterisk'>*</span></IonLabel>
                        <IonInput {...register('apellido', { required: true, pattern: /^[A-Za-z]+$/i })} onIonChange={(e: any) => setItem({ ...item, apellido: e.target.value })} value={item.apellido} />
                        {errors.apellido && errors.apellido.type === "required" && <p className="error">Ingresa tu apellido</p>}
                        {errors.apellido && errors.apellido.type === "pattern" && <p className="error">Ingresa solo letras</p>}
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Identificación <span className='asterisk'>*</span></IonLabel>
                        <IonInput type='number' {...register('identificacion', { required: true, maxLength: 10, minLength: 10 })} onIonChange={(e: any) => setItem({ ...item, identificacion: e.target.value })} value={item.identificacion} />
                        {errors.identificacion && errors.identificacion.type === "required" && <p className="error">Ingresa tu identificación</p>}
                        {errors.identificacion && errors.identificacion.type === "maxLength" && <p className="error">Ingrese máximo 10 dígitos</p>}
                        {errors.identificacion && errors.identificacion.type === "minLength" && <p className="error">Ingrese mínimo 10 dígitos</p>}
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Teléfono <span className='asterisk'>*</span></IonLabel>
                        <IonInput type='number'  {...register('telefono', { required: true, maxLength: 10, minLength: 9 })} onIonChange={(e: any) => setItem({ ...item, telefono: e.target.value })} value={item.telefono} />
                        {errors.telefono && errors.telefono.type === "required" && <p className="error">Ingresa tu teléfono</p>}
                        {errors.telefono && errors.telefono.type === "maxLength" && <p className="error">Ingrese máximo 10 dígitos</p>}
                        {errors.telefono && errors.telefono.type === "minLength" && <p className="error">Ingrese mínimo 9 dígitos</p>}
                    </IonItem >
                    <IonItem>
                        <IonLabel position="floating">Dirección <span className='asterisk'>*</span></IonLabel>
                        <IonInput {...register('direccion', { required: true })} onIonChange={(e: any) => setItem({ ...item, direccion: e.target.value })} value={item.direccion} />
                        {errors.direccion && <p className="error">Ingresa tu dirección</p>}
                    </IonItem >
                    <IonButton className='login-button' expand='full' type='submit'>Actualizar datos</IonButton>
</form>
                </IonContent>
            </IonPage>
        );
    }
};

export default EditUser;
