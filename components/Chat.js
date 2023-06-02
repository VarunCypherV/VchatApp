import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../Utils/getRecipientEmail";
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth, app, db } from "../firebase";
import { useRouter } from "next/router";


function Chat({id , users}) {
    const [user] = typeof window !== "undefined" && useAuthState(auth);
    const recipientEmail=getRecipientEmail(users,user);
    const router = useRouter(); //to push chat screen of 1-1 when clickingn user of choice from list

    
    //might me error below line
    const recipientSnapshot = useCollection(db.collection('users'.where('email','==',getRecipientEmail(users,user))));
//     import { collection, query, where, getDocs } from "firebase/firestore";
// import { useDocument } from "react-firebase-hooks/firestore";

// // ...

// const recipientQuery = query(
//   collection(db, "users"),
//   where("email", "==", getRecipientEmail(users, user))
// );
// const recipientSnapshot = useDocument(recipientQuery);
    const recipient=recipientSnapshot?.docs?.[0]?.data();
    
    const enterChat=()=>{
        router.push(`/chat/${id}`);
    }
    
    
    return (
        <div>
            <Container onClick={enterChat}>

            {recipient ? (
            <UserAvatar src={recipient?.Avatar.photoURL}/>
           ) : (
            <UserAvatar>{recipientEmail[0]}</UserAvatar>
           ) }

            </Container>
            
        </div>
    );
}
export default Chat;

const Container = styled.div`
color:black;
display:flex;
cursor: pointer;
align-items:center;
padding:15px;
word-break: break-word; /*protects superlong email*/

:hover{
    background-color:#D3D3D3;
}
`;


const UserAvatar = styled(Avatar)
`margin:5px;
margin-right:5px;
`


//START from 1:59:00 