// wild card index js
import styled from "styled-components";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
import { Avatar, IconButton, Input } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/Morevert";
import  AttachFileIcon  from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from "@material-ui/icons/Mic";
import { useState } from "react";
import { doc, setDoc, serverTimestamp, collection, addDoc , useFirestoreCollectionData } from "firebase/firestore";
import { auth, app, db } from "../firebase";
import getRecipientEmail from "../../Utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import { useRef } from "react";

function ChatScreen({chat,messages}) {
    const [user] = typeof window !== "undefined" && useAuthState(auth);
    const router = useRouter();
    const EndOfMessageRef=useRef(null);//connect pointer to element
    const messagesRef = collection(db, "chats", router.query.id, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
    const [messagesSnapshot] = useFirestoreCollectionData(messagesQuery);
    //const [messagesSnapshot]= useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy("timestamp","asc"));
    const [input , setInput]=useState("");

    //client render
    const showMessages = () =>{
        if (messagesSnapshot){
            return messagesSnapshot.docs.map((doc) => {
                const message = doc.data();
                return (
                    <Message 
                    key={doc.id} 
                    user={message.user}
                    message={{
                        ...message,
                        timestamp: message.data().timestamp?.toDate().getTime()}} />
                );
            });
        } else{
            return JSON.parse(messages).map(message =>{
                <Message key ={message.id} user={message.user} messahe={message}/>
            })
        }
        //server side
        
    }

    const sendMessage = (e) => {
        e.preventDefault(); //to prevent refresh

        //error updatin last seen
        // db.collection("users").doc(user.uid).set({
        //     lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        // },{merge:true});

        // db.collection("chats").doc(router.query.id).collection("messages").add({
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     message:input,
        //     user: user.email,
        //     photoURL: user.photoURL,
        // });
        // const updateUserLastSeen = async (db, userId) => {
        //     const userRef = doc(db, "users", userId);
        //     await setDoc(
        //       userRef,
        //       {
        //         lastSeen: serverTimestamp()
        //       },
        //       { merge: true }
        //     );
        //   };
        const userRef = doc(db, "users", user.uid);
        setDoc(
          userRef,
          {
            lastSeen: serverTimestamp()
          },
          { merge: true }
        );
          // Adding a new document to "messages" subcollection
        //   const addNewMessage = async (db, chatId, input, user) => {
        //     const messagesRef = collection(db, "chats", chatId, "messages");
        //     await addDoc(messagesRef, {
        //       timestamp: serverTimestamp(),
        //       message: input,
        //       user: user.email,
        //       photoURL: user.photoURL
        //     });
        //   };
        const messagesRef = collection(db, "chats", router.query.id, "messages");
addDoc(messagesRef, {
  timestamp: serverTimestamp(),
  message: input,
  user: user.email,
  photoURL: user.photoURL
});
        setInput("");
    }


    const recipientEmail = getRecipientEmail(chat.users,user);
    const [recipientSnapshot]= useCollection(
        db.collection("users").where("email", "==",recipientEmail
    ));
//recipient details
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const ScrollTOBottom =()=>{
        EndOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }
    ScrollTOBottom();
    return (
        <div>
           <Container> 
                <Header>
                    {recipient ? (<Avatar  src= {user.photoURL}/>)
                    : (<Avatar src= {recipientEmail[0]} />)
                    }


                    <HeaderInformations>
                        <h3>{recipientEmail}</h3>
                        {recipientSnapshot ? (
                            <p>Last Active : {' '} {recipient?.lastSeen?.toDate()?(
                                    <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                            ): "unavailable"}
                            </p>
                        ): (<p>Loading Last Active..</p>)}
                        
                    </HeaderInformations>
                    <HeaderIcons>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                        <IconButton>
                            <AttachFileIcon/>
                        </IconButton>
                    </HeaderIcons>
                </Header>
                <MessageContainer>
                    {showMessages()}
                    {/* shows data that fromes thru server side
                    then real time connection to firestore
                    it swaps to real time since same key */}

                    <EndOfMessage ref={EndOfMessageRef}/>

                
                </MessageContainer>
                <InputContainer>
                        <InsertEmoticonIcon/>
                        <Inputs value={input} onChange={e=>setInput(e.target.value)} />
                
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>send msg</button>
                <MicIcon/>
                </InputContainer>
           </Container>
        </div>
    );
}
export default ChatScreen;

const Container = styled.div`
    
`;
const Header = styled.div`
    position: sticky;
    background-color:white;
    z-index:100;
    top:0;
    display:flex;
    padding:11px;
    height:80px;
    align-items:center;
    border-bottom:1px solid whitesmoke;
`;

const HeaderInformations = styled.div`
    margin-left: 15px;
    flex:1;

    >h3{
        margin-bottom:3px;
    }

    >p{
        font-size:14px;
        color:gray;
    }
`;
const HeaderIcons = styled.div`
    
`;
const MessageContainer = styled.div`
    padding-top:30px;
    background-color:#e5ded8;
    min-height: 90vh;
`;
const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;

const Inputs = styled.input`
    /* flex:1;
    align-items:center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:whitesmoke;
    z-index:100; */
    flex:1;
    outline:none;
    border:none;
    border-radius:10px;
    align-items:center;
    background-color:whitesmoke;
    margin-left:15px;
    margin-right:15px;
    padding:20px;
`;

const InputContainer=styled.form`
    display:flex;
    align-items:center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:white;
    z-index:100;
`;

const Message=styled.div`
    display:flex;
    align-items:center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:white;
    z-index:100;
`;