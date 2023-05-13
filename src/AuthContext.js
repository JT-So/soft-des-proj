import {useContext, createContext, useEffect, useState} from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState()
    const [userName, setUserName] = useState()
    const [userId, setUserId] = useState()
    const userCollectionRef = collection(db, "Users");
    const navigate = useNavigate();
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account',
        });
        signInWithPopup(auth, provider).then(() => {
            navigate('/board')
        }).then((error) => {
            console.log(error)
        });
    }

    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUserName(null);
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    useEffect (() => {
    
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            const userData = await getDocs(userCollectionRef);
            userData.docs.every ((doc) => {
                if (doc.data().email === currentUser?.email) {
                setUserId(doc.id);
                setUserName(doc.data().name);
                return false;
              }
              else {
                return true;
              }
            })
        });

        return () => {
            unsubscribe()
        }

    }, [])


    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user, userId, userName }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}