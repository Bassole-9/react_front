import { useState } from "react"
import { BiSolidSend } from "react-icons/bi";

const InputTchat =({sendRequest,setMessages})=>{
    const[mess,setMess]=useState("")
    return(
        <>
                <div className="input_ecrit">
                    <input type="text" value={mess} onChange={(e)=>setMess(e.target.value)}/>
                </div>
                <button className="send" onClick={()=>{
                    //videur de input
                    setMessages((hold)=>[...hold,{text : mess, isFromIa:false, date: new Date()}])
                    setMess("")
                    sendRequest(mess)
                }}><BiSolidSend className="icon"/></button>
        </>
    )
}
export default InputTchat