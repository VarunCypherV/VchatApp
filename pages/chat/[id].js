// wild card index js
import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/sidebar";
import ChatScreen from "../../components/ChatScreen";
import { doc, getFirestore } from "firebase/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';
import getRecipientEmail from "../../Utils/getRecipientEmail";
function Chat({chat , messages}) {


    const [user] = typeof window !== "undefined" && useAuthState(auth);
    return (
        <div>
           <Container> 
                <Head>
                    <title>Chat with {getRecipientEmail(chat.users,user)}</title>
                </Head>
                <Sidebar />
                <ChatContainer>
                    <ChatScreen chat={chat} messages={messages}/>
                </ChatContainer>
           </Container>
        </div>
    );
}
export default Chat;

export async function getServerSideProps(context){
    // server side rendering of the chats that has to be refreshed
    
    const db = getFirestore();
    const ref = doc(db, "chats", context.query.id);
    //prep the msg on server to render
    const messagesRes = await ref.collection("messages")
    .order("timestamp","asc")
    .get();

    //spread the messages and prep the message
    const messages = messagesRes.docs.map((doc) => ({
            id: doc.id,
          ...doc.data()
        })).map(messages=>({
            //when stringify and send we lose timestamp data type! when
            //when sent from back end to front end 
            ...messages,
            timestamp : messages.timestamp.toDate().getTime()

        })
        );

    // prep the chats on server
    const chatRes = await ref.get();
    const chat={
        id: chatRes.id,
        ...chatRes.data()
        //...sth means spread other objects of here say chatres there

    }
    //server side render preps page before client sees page , then server
    //returns some props that the react app when loads first tiome already ahs some
    //props 
    return {
        props:{
            messages : JSON.stringify(messages), //complex object so string
            chat:chat //very simple object
            
        }
    }
    return
}

const Container = styled.div`
    display:flex;
`;

const ChatContainer = styled.div`
    flex:1;
    overflow:scroll;
    height:100vh;
//to remove scrollbar , instead just drag it down as if in phone
    ::-webkit-scrollbar{
        display:none;
    }
    -ms-overflow-style:none;
    scrollbar-width:none;
`;