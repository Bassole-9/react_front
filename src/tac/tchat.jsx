import { useState } from "react"
import "./tchat.css"
import axios from "axios"
import InputTchat from "./inputTchat"
import { useNavigate } from "react-router-dom"


const Tchat =({setMessages,messages,chat})=>{

    const sendRequest= async (messagerie)=>{
    let req = await axios.post("http://localhost:3000/api/Chat/message?chatId="+chat,{message:messagerie},{
        headers:{
            Authorization:localStorage.getItem("data")
        }
    })
    if(req.status===200){
        setMessages((hold)=>[...hold,req.data])
    }else{

    }

    }
    const Navigate = useNavigate()
    
    const deconnecter =()=>{
        localStorage.removeItem("data")
        Navigate("/connexion")
    }

    
    

    
    return(
        <>
        <div className="container_tchat">
            <div className="section_tchat">
                <button onClick={()=>deconnecter()}>deconnexion</button>
                <div className="titre_tchat">
                <h1>Tchat</h1>
                </div>
                <div className="cadre">
                    {/* <div>utilisateur</div>
                    <div>robot</div> */}
                </div>
                <div className="convers">
                    <div className="bleu">
                        {
                            messages.map((m,index)=>{
                                return <div key={index} style={m.isFromIa ?{width:"15rem",background:"gray",Left:"30px",marginTop:"1rem",borderRadius:"10px",padding:"5px 12px",borderBottomLeftRadius:"0px"}
                                :{background:"green",marginLeft:"15rem",width:"15rem",marginTop:"1rem",borderRadius:"10px",padding:"5px 12px",borderBottomRightRadius:"0px"}}>{m.text}</div>
                            })
                        }
                    </div>
                </div>
                <div className="top">
                    <InputTchat sendRequest={sendRequest} setMessages={setMessages}/>
                </div>
            </div>
        </div>
        
        </>
    )
}
export default Tchat