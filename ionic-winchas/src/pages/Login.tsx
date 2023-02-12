import { IonButton, IonContent, IonItem, IonPage, IonInput, IonImg, IonLabel, IonLoading, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../my-context';
import { toast } from '../toast';
import './Home.css';

const Login: React.FC = () => {
    const { login, authValues } = React.useContext(AuthContext);
    const [busy, setBusy] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const loginUser = async () => {
        setBusy(true)
        console.log(username, password);
        let res = await login({ username: username, password: password });

        console.log('login', res);
        if (!res) {
            setShowError(true);
            toast('Ha ocurrido un error')
        } else {
            setShowError(false);
            toast('Has iniciado sesion!')
            history.push('/home', res)
        }
        setBusy(false)
    }

    useIonViewDidEnter(() => {
        if(authValues.authenticated){
            history.push('/home')
        }
    });

    

    return (
        <IonPage>
            <IonContent className='ion-padding'>
                <IonLoading isOpen={busy} />
                <div className='ion-text-center'>
                    <IonImg src="assets/wincha.webp" />

                </div>
                <div className='ion-text-center title'>
                    <IonLabel className=''>PROVEEDOR DE SERVICIOS</IonLabel>
                </div>
                <div>
                    <form>
                        <IonItem>
                            <IonLabel position="floating">Correo electrónico</IonLabel>
                            <IonInput onIonChange={(e: any) => setUsername(e.target.value)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Contraseña</IonLabel>
                            <IonInput type='password' onIonChange={(e: any) => setPassword(e.target.value)} />
                        </IonItem>
                        <IonItem>
                        {showError ? (<p className="error">Correo electrónico y/o contraseña incorrectos</p>):''} 
                        </IonItem>
                        <IonButton className='ion-margin-top login-button' expand='full' onClick={() => loginUser()}>Iniciar sesión</IonButton>
                    </form>
                </div>
                <div>
                    <p className='ion-text-center'>
                        ¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link>
                    </p>
                </div>
                <div>
                    <p className='ion-text-center'>
                        <Link to="/password">Olvidé mi contraseña</Link>
                    </p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
