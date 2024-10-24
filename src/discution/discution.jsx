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
        const socket = new io("http://localhost:3000",{
            auth:{
                token:localStorage.getItem("data")
            }
        })
        socket.on("connect",()=>{
            console.log("connect");
        })
    },[])









    useEffect(()=>{
        axios.get("http://localhost:3000/api/Chat/discution",{
            headers:{
                Authorization:localStorage.getItem("data")
            }
        }).then(res => {
            if(res.status===200){
                setDiscour(res.data)
            }else{
            }
        })
    },[])

    const envoie= async (e)=>{
        e.preventDefault()
        const reques = await axios.post("http://localhost:3000/api/Chat/AddChat",{
            name:discution
        },
        {
            headers:{
                Authorization:localStorage.getItem("data")
            }
        }
        )
        if(reques.status===200){
            navigate("/Chat/"+reques.data.id)
        }else{
            console.log("erreur lors dde l'ajout du Chat")
        }
    }

    const supprimer= async (supprime)=>{
            const supprimer = await axios.delete("http://localhost:3000/api/Chat/"+supprime,{
                headers:{
                    Authorization: localStorage.getItem("data")
                },   
            })
            if(supprimer.status===200){
                setDiscour(discour.filter((f)=>f.id!=supprimer.data.id))
            }else{

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
                            <button onClick={envoie}>commencer</button>
                        </div>
                      
                        <div className="black">
                                {
                                    discour.map((m,id)=>{
                                        return<div key={id} >
                                            <div onClick={()=>navigate("/Chat/"+m.id)}>{m.name}</div>
                                            <button onClick={(e)=>supprimer(m.id)}>supprimer dis</button>
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