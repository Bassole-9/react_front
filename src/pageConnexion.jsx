import { useState } from "react"
import "./styles/connexion.css"
import { useNavigate } from "react-router-dom"

const Connexion =()=>{
    
    const Navigate = useNavigate()

    const [info,setInfo] = useState({
       email : "",
       nom : "",
    })

    const Subtmit =()=>{
        localStorage.setItem("user",JSON.stringify(info))
        Navigate("/Quiz")
    }


    const updateCurrentQuestion =()=>{
        return(
            <>
            </>
        )
    }

    return(
        <>
        <div className="container_login">
            <div className="section_login">
                <form>
                    <div className="titreForm">
                        <p>Connexion : </p>
                    </div>
                    <div className="top">
                        <input type="texte" name="" placeholder="email" value={info.email} onChange={(e)=> setInfo({...info, email : e.target.value})}/>
                    </div>
                    <div className="top">
                        <input type="texte" name="" placeholder="Nom" value={info.nom} onChange={(e)=> setInfo({...info, nom : e.target.value})}/>
                    </div>
                    <button onClick={()=> Subtmit ()}>se connecter</button>
                </form>
            </div>
        </div>
        
        </>
    )
}
export default  Connexion