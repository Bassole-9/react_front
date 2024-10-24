import { useEffect, useState } from "react";
import Tchat from "./tac/tchat"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TchatMessage =()=>{
    const  params = useParams()
    const[messages,setMessages]=useState([])
    const Navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:3000/api/Chat/messages?ChatId="+params.chatId,{
            headers:{
                Authorization:localStorage.getItem("data")
            }
        }).then(res => {
            if(res.status===200){
                setMessages(res.data)
            }else{
                Navigate("/discution")
            }
        })
    },[])




    return(
        <>
        <div>
            <Tchat setMessages={setMessages} messages={messages} chat={params.chatId}/>
        </div>
        </>
    )
}
export default TchatMessage