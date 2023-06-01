import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from 'react';
import {db,auth,provider,app} from "../firebase";
import Login from "./Login";
import Loading from '../components/Loading';
import firebase from "firebase/app"
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
function MyApp({ Component, pageProps }) {
  const auth=getAuth(app);
  const [user ,loading] = useAuthState(auth);
// set is used to create if not there else update

  useEffect(() => {
    if (user) {
      setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL
      }, { merge: true })
        .catch(error => {
          console.error('Error updating user document:', error);
        });
    }
  }, [user]);

  if (loading) return <Loading/>;
  if(!user) return <Login/>
  
  return <Component {...pageProps} /> 
  // starting point routing
}

export default MyApp;
