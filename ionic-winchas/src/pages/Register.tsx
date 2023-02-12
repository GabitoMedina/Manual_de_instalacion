import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonNote, IonModal, IonButtons, IonLoading, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useForm} from "react-hook-form";
import { toast } from '../toast';
import AuthContext from '../my-context';
import './Home.css';

const Register: React.FC = () => {
    const { createAccount } = React.useContext(AuthContext);
    const [busy, setBusy] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [typeUser, setTypeUser] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [password, setPassword] = useState('')
    const history = useHistory();

    useIonViewDidEnter(() => {
        setIsVisible(false);
        setIsOpen(true);
    });

    function cancel() {
        setIsOpen(false);
        history.push("/login");
    }

    function viewForm() {
        setIsVisible(true);
        setIsOpen(false);
    }

    async function onSubmit(values: any) {
        console.log('values', values);
        setBusy(true)
        let res = await createAccount({ values, typeUser })
        if (!res) {
            toast('Ha ocurrido un error en el registro')
        } else {
            toast('Has sido registrado exitosamente')
            history.push('/home')
        }
        setBusy(false)
      }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonLoading isOpen={busy} />
                <IonModal isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => cancel()}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle>Registrarme</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonItem button onClick={() => { setTypeUser('P'); viewForm(); }}>
                            <IonLabel>Registrarme como proveedor</IonLabel>
                        </IonItem>
                        <IonItem button onClick={() => { setTypeUser('C'); viewForm(); }}>
                            <IonLabel>Registrarme como cliente</IonLabel>
                        </IonItem>
                    </IonContent>
                </IonModal>
                {isVisible ? (
                    <div className='d-none'>
                        <form onSubmit={handleSubmit(onSubmit)}> 
                        <IonItem>
                            <IonLabel position="floating">Nombre <span className='asterisk'>*</span></IonLabel>
                            <IonInput {...register('nombre', { required: true, pattern: /^[A-Za-z]+$/i })} />
                            {errors.nombre && errors.nombre.type === "required" && <p className="error">Ingresa tu nombre</p>}
                            {errors.nombre && errors.nombre.type === "pattern" && <p className="error">Ingresa solo letras</p>}
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Apellido <span className='asterisk'>*</span></IonLabel>
                            <IonInput {...register('apellido', { required: true, pattern: /^[A-Za-z]+$/i })}  />
                            {errors.apellido && errors.apellido.type === "required" &&  <p className="error">Ingresa tu apellido</p>}
                            {errors.apellido && errors.apellido.type === "pattern" && <p className="error">Ingresa solo letras</p>}
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Identificación <span className='asterisk'>*</span></IonLabel>
                            <IonInput type='number' {...register('identificacion', { required: true, maxLength: 10, minLength: 10  })} />
                            {errors.identificacion && errors.identificacion.type === "required"  && <p className="error">Ingresa tu identificación</p>}
                            {errors.identificacion && errors.identificacion.type === "maxLength" && <p className="error">Ingrese máximo 10 dígitos</p>}
                            {errors.identificacion && errors.identificacion.type === "minLength" && <p className="error">Ingrese mínimo 10 dígitos</p>}
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Correo electrónico <span className='asterisk'>*</span></IonLabel>
                            <IonInput type="email" {...register('username', { required: true, pattern: /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ })} />
                            {errors.username && errors.username.type === "required"  && <p className="error">Ingresa tu correo electrónico</p>}
                            {errors.username && errors.username.type === "pattern"  && <p className="error">Ingresa un correo electrónico válido</p>}
                        </IonItem >
                        <IonItem>
                            <IonLabel position="floating">Teléfono <span className='asterisk'>*</span></IonLabel>
                            <IonInput type='number'  {...register('telefono', { required: true, maxLength: 10, minLength: 9 })} />
                            {errors.telefono && errors.telefono.type === "required" && <p className="error">Ingresa tu teléfono</p>}
                            {errors.telefono && errors.telefono.type === "maxLength" && <p className="error">Ingrese máximo 10 dígitos</p>}
                            {errors.telefono && errors.telefono.type === "minLength" && <p className="error">Ingrese mínimo 9 dígitos</p>}
                        </IonItem >
                        <IonItem>
                            <IonLabel position="floating">Dirección <span className='asterisk'>*</span></IonLabel>
                            <IonInput {...register('direccion', { required: true })} />
                            {errors.direccion && <p className="error">Ingresa tu dirección</p>}
                        </IonItem >
                        <IonItem>
                            <IonLabel position="floating">Contraseña <span className='asterisk'>*</span></IonLabel>
                            <IonInput type='password' {...register('pass', { required: true, minLength: 6 })} onIonChange={(e: any) => setPassword(e.target.value)} />
                            {errors.pass && errors.pass.type === "required" && <p className="error">Ingresa tu contraseña</p>}
                            {errors.pass && errors.pass.type === "minLength" && <p className="error">Ingrese mínimo 6 caracteres</p>}
                        </IonItem >
                        <IonItem>
                            <IonLabel position="floating">Confimar Contraseña <span className='asterisk'>*</span></IonLabel>
                            <IonInput type='password' {...register('confPassword', { required: true, validate: v => v === password})} />
                            {errors.confPassword && errors.confPassword.type === "required" && <p className="error">Confima tu Contraseña</p>}
                            {errors.confPassword && errors.confPassword.type === "validate" && <p className="error">Las contraseñas no coinciden</p>}

                        </IonItem >
                        <IonButton className='login-button' expand='full' type='submit'>Registrarme</IonButton>
                        </form>
                        <p className='ion-text-center'>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
                    </div>)
                    : null}
            </IonContent>
        </IonPage>
    );
};

export default Register;

