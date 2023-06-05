import { ModeComment } from "@material-ui/icons";
import styled from "styled-components";
import moment from "moment/moment";

function Message({user,message}) {
    const [userLoggedIn]=useAuthState(user);
    //sender or reciever detection logic for styling

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
        <div>
            <Container>
                <TypeOfMessage>{message.message}
                   <Timestamp>
                   {message.timestamp ? moment(message.timestamp).format('LT'): "..."}
                   </Timestamp> 
                </TypeOfMessage>
            </Container>
        </div>
    );
}
export default Message;

const Container = styled.div`

`

const MessageElement = styled.p`
    width: fit-content;
    padding :15px;
    border-radius:8px;
    margin : 10px;
    min-width:60px;
    padding-bottom:26px;
    text-align:right;
`//extended message element
const Sender = styled(MessageElement)`
    margin-left:auto; //alligh right
    background-color:#dcf8c6;
`
const Reciever = styled(MessageElement)`
    margin-right:auto; //alligh left
    background-color:whitesmoke;
`
const Timestamp = styled.span`
    color:gray;
    padding:10px;
    font-size:9px;
    position: absolute;
    bottom:0;
    text-align:right;
    right:0;
`;