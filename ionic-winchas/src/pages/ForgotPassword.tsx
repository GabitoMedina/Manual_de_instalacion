import { IonButton, IonContent, IonItem, IonPage, IonInput, IonLabel, IonLoading, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import AuthContext from '../my-context';
import { toast } from '../toast';
import './Home.css';

const RecoverPassword: React.FC = () => {
    const { recoverPassword } = React.useContext(AuthContext);
    const [busy, setBusy] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory();

    async function onSubmit(values: any) {
        setBusy(true)
        try {
            await recoverPassword({ email: values.username });
            toast('Se ha enviado un email, revisa tu correo electrónico!')
            history.push('/login')
            setBusy(false)
        } catch (error) {
            setBusy(false)
            toast('El correo electrónico es incorrecto o no corresponde a ninguna cuenta!')
        }
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink={"/login"}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>
                    <IonTitle>Recuperar Contraseña</IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonLoading isOpen={busy} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='recoverPass'>
                        <IonItem className='ion-padding-bottom'>
                            <IonLabel position="floating">Correo electrónico</IonLabel>
                            <IonInput type="email" {...register('username', { required: true, pattern: /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ })} />
                            {errors.username && errors.username.type === "required" && <p className="error">Ingresa tu correo electrónico</p>}
                            {errors.username && errors.username.type === "pattern" && <p className="error">Ingresa un correo electrónico válido</p>}
                        </IonItem>
                        <IonButton className='ion-margin-top login-button' expand='full' type='submit'>Continuar</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default RecoverPassword;
