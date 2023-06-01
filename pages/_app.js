import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from 'react';
import {db,auth,provider,app} from "../firebase";
import Login from "./Login";
import Loading from '../components/Loading';
import firebase from "firebase/app"
function MyApp({ Component, pageProps }) {
  const auth=getAuth(app);
  const [user ,loading] = useAuthState(auth);
// set is used to create if not there else update
  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid).set({
        email:user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimeStamp(),
        photoURL:user.photoURL
      },{merge:true});
    }
  },[user])


  if (loading) return <Loading/>;
  if(!user) return <Login/>
  
  return <Component {...pageProps} /> 
  // starting point routing
}

export default MyApp;
