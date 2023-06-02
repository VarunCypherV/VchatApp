
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/Morevert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, app, db } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import Chat from "./Chat";
 function Sidebar() {
    
    const [user] = typeof window !== "undefined" && useAuthState(auth);


    const [chatSnapshot, setChatSnapshot] = useState(null); //chatsnap has all user current docs
      
        useEffect(() => {
          const fetchChatSnapshot = async () => {

            const userChatRef = query(
              collection(db, "chats"),
              where("users", "array-contains", user.email)
            );

            const snapshot = await getDocs(userChatRef);
    
            setChatSnapshot(snapshot);
           
          };
      
          fetchChatSnapshot();
          
        }, [user]);
      //u get dofc ie chatsanphot , .data() of it gives every shit
      const chatAlreadyExists = (recipientEmail) => {
        return chatSnapshot.docs.some((chat) => {
          const users = chat.data().users;
          return users.includes(recipientEmail);
        });
      };
      
const createChat =async ()=>{
    const input=prompt('Enter user email address');
    
    if(!input) return null;

    const auth = getAuth(app);
    const user = auth.currentUser;
    
    if (input === user.email) {
      alert("You can't create a chat with yourself!");
      return null;
    }
   
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !==user.email) {
        try {
          const chatRef = await addDoc(collection(db, "chats"), {
            users: [user.email, input],  //putting both users name in the collection as array
          });
          console.log("Chat added with ID: ", chatRef.id);
          
        } catch (error) {
          console.error("Error adding chat: ", error);
        }
      }
    else{
        alert("chat already exists")
    }
    };

const handleSignOut = () => {
    auth.signOut()
      .catch(error => {
        console.error('Error signing out:', error);
      });
  }


    return (
        <div>
            <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={handleSignOut}/>
                <IconsContainer>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search"/>
            </Search>

            <SideBarButton onClick={createChat}>new chat</SideBarButton>
            
             {chatSnapshot?.docs.map((chat)=>(
                <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
            ))}
            {/* //rendering existing chats for the current user is abv */}

        </Container>
        </div>
        
        
    );
    }


//   `` -> used for styled-components
const Container = styled.div`
    

`; 
const Header = styled.div`
    display:flex;
    position:sticky;
    top:0;
    background-color:white;
    z-index: 1;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    height:80px;
    border-bottom: 1px solid whitesmoke;

`;

const UserAvatar = styled(Avatar)`
    margin:10px;
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`;

const IconsContainer= styled.div`
    

`;
const Search = styled.div`
     display:flex;
    align-items: center;
    padding:20px;
    border-radius:2px;

`;


const SearchInput = styled.input`
   outline-width:0;
   border:none;
   flex:1; //use entire width

`;



const SideBarButton = styled(Button)`
    width:100%;
//increasing priority of rules
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
    

`;


export default Sidebar;

 