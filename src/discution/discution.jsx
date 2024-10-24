import { useState,useEffect } from "react"
import "./discution.css"
import  axios  from "axios"
import { useNavigate } from "react-router-dom"
import {io} from "socket.io-client"



const Discution =()=>{
    const navigate = useNavigate()
    const[discution,setDiscution]=useState("")
    const[discour,setDiscour]=useState([])

   

    useEffect(()=>{
        const socket = new io("http://localhost:4000",{
            auth:{
                token:localStorage.getItem("data")
            }
        })
        socket.on("connect",()=>{
            socket.send("bonjour")
            console.log("connect");
            // socket.emit("discution")
        })

        socket.on("message",(msg)=>{
            console.log(msg);
        })

        socket.on("salut",(messa)=>{
            console.log(messa);
        })
        
    },[])









    useEffect(()=>{
        axios.get("http://localhost:4000/api/Chat/discution",{
            headers:{
                Authorization:localStorage.getItem("data")
            }
        }).then(res => {
            if(res.status===200){
                console.log(res);
                setDiscour(res.data)
            }else{
            }
        })
    },[])



    const envoie= async (e)=>{
        e.preventDefault()
        const reques = await axios.post("http://localhost:4000/api/Chat/AddChat",{
            name:discution
        },
        { 
            headers:{
                Authorization:localStorage.getItem("data")
            }
        }
        )
        if(reques.status===200){
            setDiscour((discour)=> [...discour,reques.data])
            // navigate("/Chat/"+reques.data.id)
        }else{
            console.log("erreur lors de l'ajout du Chat")
        }
    }


    const supprimer= async (supprime)=>{
            const supprimer = await axios.delete("http://localhost:4000/api/Chat/"+supprime,{
                headers:{
                    Authorization: localStorage.getItem("data")
                },   
            })
            if(supprimer.status===200){
                setDiscour(discour.filter((f)=>f.id!=supprimer.data.id))
            }else{
                console.log("erreur lors de suppression du Chat")
            }
    }


    return(
        <>
            <div className="container_discution">
                <div className="section_discution">
                    <div>
                        <h1>creation de discution</h1>
                    </div>
                    
                    <div className="cadre">
                        <div className="input_dis">
                            <input type="text" value={discution} onChange={(e)=>setDiscution(e.target.value)}/>
                            <button className="btn_ajout" onClick={envoie}>+</button>
                        </div>
                      
                        <div className="black">
                                {
                                    discour.map((m,id)=>{
                                        return<div key={id} >
                                            <div className="espace" onClick={()=>navigate("/Chat/"+m.id)}>{m.name}</div>
                                            <button className="btn_sup" onClick={(e)=>supprimer(m.id)}>supprimer</button>
                                        </div>
                                        
                                    })
                                    
                                }
                                
                        </div>
                        
                    </div>
                   
                    
                </div>
            </div>
        
        
        </>
    )
}
export default Discution