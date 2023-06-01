
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Head from 'next/head';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const signin = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="../assets/whatsappicon.png" />
        <Button variant="outlined" onClick={signin}>
          Sign in
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 300vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;


// import styled from "styled-components";
// import {Button} from "@material-ui/core";
// import Head from "next/head";
// import {app,auth,provider} from "../firebase";
// import { useState } from 'react';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// function Login() {
//     const auth=getAuth(app);
//     const signin =() =>{
//         signInWithPopup(auth,provider).catch(alert);
//     }
//     // const [loading, setLoading] = useState(false);

//     // const signin = async () => {
//     //   setLoading(true);
//     //   try {
//     //     await signInWithPopup(auth, provider);
//     //   } catch (error) {
//     //     alert(error.message);
//     //   }
//     //   setLoading(false);
//     // };


//     return (
//         <Container>
//             <Head>
//                 <title>login </title>
//             </Head>

        
//             <LoginContainer>
//                 <Logo src="../assets/whatsappicon.png"/>
//                 <Button variant='outlined' onClick={signin}>Sign in</Button>
//                 {/* <Button variant='outlined' onClick={signin} disabled={loading}>
//                     {loading ? 'Signing in...' : 'Sign in'}
//                 </Button> */}
//             </LoginContainer>
//         </Container>
//     );
// }
// export default Login;

// const Container = styled.div`
//     display: grid;
//     place-items:center;
//     height:300vh;
//     background-color: whitesmoke;
// `;

// const LoginContainer = styled.div`
// display: flex;
// flex-direction: column;
// padding:100px;
// align-items: center;
// background-color: white;
// border-radius:5px;
// box-shadow: 0px 4px 14px -3px rgba(0,0,0,.7);
// `;

// const Logo = styled.img`
//     height:200px;
//     width:200px;
//     margin-bottom:50px;
// `;