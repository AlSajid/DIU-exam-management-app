import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from '../../hooks/useFirebase';

initializeAuthentication();

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);

    const provider = new GoogleAuthProvider();

    const auth = getAuth();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result.user.email.substr(result.user.email.length - 10))
                // setUser(result.user);
            }).catch((error) => {

            });
    }

    const logout = () => {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {

        });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // setUser(user);
        }
        setChecking(false);
    });

    return { user, setUser, signInWithGoogle, checking, logout };
};

export default useAuth;