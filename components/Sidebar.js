import styled from "styled-components";
import { Avatar ,IconButton,Button} from "@material-ui/core";
import {useAuthState} from 'react-firebase-hooks/auth';
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/Morevert";
import SearchIcon from "@material-ui/icons/Search";
import * as Emailvalidator from 'email-validator';
import { collection, addDoc } from "firebase/firestore";
import {auth,app,db} from "../firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";


function Sidebar() {
    //const [user]=useAuthState(auth);
    const [user] = typeof window !== "undefined" && useAuthState(auth);
    
const createChat =async ()=>{
    const input=prompt('Enter user email address');
    
    if(!input) return null;

    const auth = getAuth(app);
    const user = auth.currentUser;

    if (Emailvalidator.validate(input)) {
        try {
          const chatRef = await addDoc(collection(db, "chats"), {
            users: [user.email, input],
          });
          console.log("Chat added with ID: ", chatRef.id);
        } catch (error) {
          console.error("Error adding chat: ", error);
        }
      }
    };
    //check mail exist (validator) install react firebase hooks

    // if(Emailvalidator.validate(input)){
    //         // #we need to add chatr into db chat 
    //         // each document is a chat 
    //         // collections of chat having documents each of which is 
    //         // a colelction of chats of that user which has a user 
    //         // array each with his login email the first user
    //         // then the second user email which we will enter as i/p
    //         db.collection('chats').add({
    //             users:[user.email,input],
                
    //         })
    // }
    
   
   


const handleSignOut = () => {
    auth.signOut()
      .catch(error => {
        console.error('Error signing out:', error);
      });
  }
  
    return (
        <Container>
            <Header>
                <UserAvatar onClick={handleSignOut}/>
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
               
            {/* ListofChats */}

        </Container>
        
    );
    }
export default Sidebar;

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