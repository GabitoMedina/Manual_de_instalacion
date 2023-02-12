import React, { PropsWithChildren } from "react";

import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'

import { FIREBASE_CONFIG } from "./firebaseConfig";

// if (firebase.apps.length === 0) {
const firebaseConfig = FIREBASE_CONFIG;
firebase.initializeApp(firebaseConfig);
// }

export const Context = React.createContext<any>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [authValues, setAuthValues] = React.useState<any>({
        authenticated: false,
        user: null,
        uid: null,
        userInfo: null,
        errors: null,
        winchas: null,
        initialized: false
    });

    const login = ({ username, password }: { username: string; password: string }) => {
        return new Promise(async (resolve) => {
            try {
                let authUser = await firebase.auth().signInWithEmailAndPassword(username, password);
                console.log('authUser', authUser);
                if (authUser) {
                    setAuthValues({
                        ...authValues,
                        authenticated: true,
                        user: { ...authUser },
                        uid: firebase.auth().currentUser?.uid
                    });
                    getUserData();
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                console.log('authUser', e);
                resolve(false);
            }

        })
    };

    const getUserData = () => {
        return new Promise(async (resolve) => {
            try {
                var userRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser?.uid);
                // console.log('doc', (await userRef.get()).data());
                userRef.get()
                    .then((doc) => {
                        console.log('doc', doc.data());
                        setAuthValues({
                            ...authValues,
                            authenticated: true,
                            userInfo: { ...doc.data() },
                            uid: firebase.auth().currentUser?.uid
                        });
                        resolve(true);
                    }).catch((error) => {
                        console.log('error', error);
                        setAuthValues({
                            ...authValues,
                            authenticated: true,
                            userInfo: null,
                        });
                        resolve(false);
                    });

            } catch (e) {
                setAuthValues({
                    ...authValues,
                    authenticated: true,
                    userInfo: null,
                    errors: { e }
                });
                resolve(false);
            }
        }

        )
    };

    const createAccount = ({ values, typeUser }: { values: any; typeUser: string; }) => {
        return new Promise(async (resolve) => {
            try {
                let authUser = await firebase.auth().createUserWithEmailAndPassword(values.username, values.pass);
                if (authUser) {
                    await firebase.auth().currentUser?.updateProfile({
                        displayName: values.nombre + ' ' + values.apellido
                    })
                    let usersRef = firebase.firestore().collection("usuarios").doc(firebase.auth().currentUser?.uid);

                    let newUserData = {
                        nombre: values.nombre,
                        apellido: values.apellido,
                        identificacion: values.identificacion,
                        telefono: values.telefono,
                        direccion: values.direccion,
                        perfil: typeUser,
                        email: values.username
                    }

                    await usersRef.set(newUserData);
                    setAuthValues({
                        ...authValues,
                        authenticated: true,
                        user: { ...authUser },
                        userInfo: { ...newUserData },
                        uid: firebase.auth().currentUser?.uid
                    });
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                setAuthValues({
                    ...authValues,
                    authenticated: false,
                    user: null,
                    userInfo: null,
                    errors: { e }
                });
                resolve(false);
            }
        });
    };

    const logout = async () => {
        await firebase.auth().signOut();
        setAuthValues({
            authenticated: false,
            user: null,
        });
        return Promise.resolve(true);
    };


    const recoverPassword = ({ email }: { email: string }) => {
        return firebase.auth().sendPasswordResetEmail(email);
    };

    const addObjectToCollection = ({ collection, objectData }: { collection: string; objectData: any; }) => {
        return new Promise(async (resolve) => {
            console.log(collection, objectData);
            let currentUserId = firebase.auth().currentUser?.uid;
            let collectionRef = firebase.firestore().collection(collection);

            collectionRef
                .add({
                    owner: currentUserId,
                    content: { ...objectData },
                    created: new Date().getTime(),
                    updated: new Date().getTime(),
                })
                .then((doc) => {
                    console.log(`addObjectToCollection ${collection} ${doc}`);
                    resolve(true);
                })
                .catch((e) => {
                    console.log(`ERROR: addObjectToCollection ${collection} ${e}`);
                    resolve(false);
                });
        });
    };

    const queryObjectCollection = ({ collection }: { collection: string; }) => {
        let currentUserId = firebase.auth().currentUser?.uid;
        let collectionRef = firebase.firestore().collection(collection);

        let results: any = [];

        return (
            collectionRef
                .where('owner', '==', currentUserId)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        results.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    console.log('RESULTS', results);
                    return results;
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    return error;
                })
        );
    };

    const queryObjectAllVehicles = ({ collection }: { collection: string; }) => {
        let collectionRef = firebase.firestore().collection(collection);

        let results: any = [];

        return (
            collectionRef
                .where('content.estado', '==', true)
                .get()
                .then((querySnapshot) => {
                    console.log('querySnapshot', querySnapshot);
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        results.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    return results;
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    return error;
                })
        );
    };

    const queryOrdersByProveedor = ({ collection }: { collection: string; }) => {
        let currentUserId = firebase.auth().currentUser?.uid;
        let collectionRef = firebase.firestore().collection(collection);

        let results: any = [];

        return (
            collectionRef
                .where('content.proveedor', '==', currentUserId)
                .get()
                .then((querySnapshot) => {
                    console.log('querySnapshot', querySnapshot);
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        results.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    return results;
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    return error;
                })
        );
    };

    const queryOrdersByCliente = ({ collection }: { collection: string; }) => {
        let currentUserId = firebase.auth().currentUser?.uid;
        let collectionRef = firebase.firestore().collection(collection);

        let results: any = [];

        return (
            collectionRef
                .where('content.usuario', '==', currentUserId,)
                .get()
                .then((querySnapshot) => {
                    console.log('querySnapshot', querySnapshot);
                    querySnapshot.forEach(async (doc) => {
                        results.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    return results;
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    return error;
                })
        );
    };

    const queryOrdersByWincha = ({ id }: { id: string; }) => {
        let collectionRef = firebase.firestore().collection("orders");

        return (
            collectionRef
                .where('content.wincha', '==', id,)
                .get()
                .then((querySnapshot) => {
                    console.log('querySnapshot', querySnapshot);
                    querySnapshot.forEach(async (doc) => {
                        removeObjectFromCollection({collection:"orders", id: doc.id})
                    });
                    return true;
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    return error;
                })
        );
    };

    const queryObjectById = ({ collection, id }: { collection: string; id: string; }) => {
        getUserData();
        let collectionRef = firebase.firestore().doc(collection + "/" + id);

        return (
            collectionRef
                .get()
                .then((querySnapshot) => {
                    console.log(querySnapshot.data());
                    let result = querySnapshot.data();
                    return result;
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    return error;
                })
        );
    };

    const editObjectById = ({ collection, id, obj }: { collection: string; id: string; obj: any }) => {
        let collectionRef = firebase.firestore().doc(collection + "/" + id);

        obj.updated = new Date().getTime();

        return (
            collectionRef
                .update(obj)
                .then((querySnapshot) => {
                    console.log(querySnapshot);
                    // let result = querySnapshot.data();
                    return true;
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    return error;
                })
        );
    };

    const removeObjectFromCollection = ({ collection, id }: { collection: string; id: string; }) => {
        let collectionRef = firebase.firestore().collection(collection);

        return (
            collectionRef
                .doc(id)
                .delete()
                .then((doc) => {
                    console.log(doc);
                    return true;
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    return error;
                })
        );
    };

    const initialize = () => {
        return new Promise((resolve) => {
            let unsub = firebase
                .auth()
                .onAuthStateChanged(async (authUser: firebase.User | null) => {
                    if (authUser) {
                        setAuthValues({
                            ...authValues,
                            authenticated: true,
                            user: authUser,
                            userInfo: null,
                            errors: null,
                            initialized: true
                        });
                        resolve(true);
                    } else {
                        setAuthValues({
                            ...authValues,
                            initialized: true
                        });
                        resolve(false);
                    }
                    //stop listening
                    unsub();
                });
        })
    };

    let state = {
        authValues,
        initialize,
        getUserData,
        createAccount,
        addObjectToCollection,
        queryObjectCollection,
        queryOrdersByCliente,
        queryObjectAllVehicles,
        queryOrdersByProveedor,
        queryObjectById,
        editObjectById,
        removeObjectFromCollection,
        recoverPassword,
        queryOrdersByWincha,
        login,
        logout
    }

    return <Context.Provider value={state}>{children}</Context.Provider>
}

export default Context;


