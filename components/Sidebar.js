import styled from "styled-components";
import { Avatar ,IconButton,Button} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/Morevert";
import SearchIcon from "@material-ui/icons/Search";
import * as Emailvalidator from 'email-validator';
function Sidebar() {
  
const createChat =()=>{
    const input=prompt('Enter user email address');

    if(!input) return null;

    //check mail exist (validator) install react firebase hooks

    if(Emailvalidator.validate(input)){
            // #we need to add chatr into db chat 


    }

}

    return (
        <Container>
            <Header>
                <UserAvatar/>
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