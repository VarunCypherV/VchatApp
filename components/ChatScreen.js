// wild card index js
import styled from "styled-components";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/Morevert";
import  AttachFileIcon  from "@material-ui/icons/AttachFile";
function Chat(chat,messages) {
    const [user] = typeof window !== "undefined" && useAuthState(auth);
    const router = useRouter();
    
    return (
        <div>
           <Container> 
                <Header>
                    <Avatar />

                    <HeaderInformations>
                        <h3>Recipient Email</h3>
                        <p>Last Seen...</p>
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
           </Container>
        </div>
    );
}
export default Chat;

const Container = styled.div`
    
`;
const Header = styled.div`
    
`;

const HeaderInformations = styled.div`
    
`;
const HeaderIcons = styled.div`
    
`;
