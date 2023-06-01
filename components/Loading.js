
import {Circle} from "better-react-spinkit";

function Loading() {
    return (
        <center style={{display:"grid",placeItem:"center",height:"100vh"}}>
            <div>
                <img src="../assets/whatsappicon.png"
                     alt=""
                     style={{marginBottom:10}}
                     height={200}
                >
                </img>
                <Circle color="#3CBC28"/>
            </div>
        </center>
    );
}
export default Loading;