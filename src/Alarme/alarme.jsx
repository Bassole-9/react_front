import { useState } from "react"
import son from "../sam/sons.wav"
import "./alarme.css"
import { useRef } from "react"



const Alarme = ()=>{
    const [donnee,setDonnee]=useState({lundi : false, mardi : false, mercredi : false, jeudi : false, vendredi: false, samedi: false, Dimanche: false,})
    const [Heure,setHeure]=useState("")
    const [Alarm,setAlarme]=useState([])
    const [name,setName]=useState("")
    const [decompte,setDecompte]=useState({})
    const [currentAlarm, setCurrentAlarm]=useState(null)
    const audio = useRef()
    const [recup,setRecupe]=useState({})


    const envoie =()=>{
        Alarm.push({Heures : Heure, donnee : Object.keys(donnee).filter(f => donnee[f]), isActive : false, name : name })
        setAlarme(Alarm)
        setHeure("")
        setDonnee({lundi : false, mardi : false, mercredi : false, jeudi : false, vendredi: false, samedi: false, Dimanche: false})
        setName("")
    }

    let checkAlarme =(Alarm)=>{
        const cb=(data)=>{
            clearTimeout(timeOute)
            let date = new Date()
            let heur = date.getUTCHours()
            let minute= date.getUTCMinutes()
            let day = ["Dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"][date.getUTCDay()]
            console.log(heur);
            console.log(minute);
            console.log(day);
            console.log('decompt',decompte)
            console.log(data.Heures);
            const [heuree,temp]= data.Heures.split(":")

            if(parseInt(heuree)===heur && parseInt(temp)===minute && data.donnee.includes(day)){
                console.log("ok");
                audio.current = new Audio(son)
                audio.current.play()
                audio.current.onended = ()=>audio.current.play()
                setCurrentAlarm({name:data.name, Heure:data.Heures})
            }else{
               
            timeOute = setTimeout(()=> cb(Alarm) ,1000) 
            }
        }
        let timeOute = setTimeout(()=> cb(Alarm) ,1000) 
        return  { clear : ()=> clearTimeout(timeOute)}
    }

    const ToggleAlarme=(Alarm)=>{
        console.log(Alarm,decompte);
        let id = decompte[Alarm.name]
        if(Alarm.isActive){ 
            setDecompte({...decompte,[Alarm.name]: checkAlarme(Alarm)})
        }else{
            decompte[Alarm.name].clear()
            setDecompte({...decompte,[Alarm.name]:undefined})
            recup[Alarm.name].clear()
        }
    }

    let ajour =(info,seconde)=>{
        {
            let recuperation = setTimeout(()=>{
                if(decompte[info.name]){
                    audio.current = new Audio(son)
                    audio.current.play()
                    audio.current.onended = ()=>audio.current.play()
                    setCurrentAlarm({name:info.name, Heure:info.Heures})
                }
                clearTimeout(recuperation)
                },seconde)
                return {clear:()=>clearTimeout(recuperation)}     
        }
    }




    return(
        <>
        { currentAlarm && 
            <div className="carre">
            <div className="containt">
                <p>{currentAlarm.Heure}</p>
                <p className="nom">Nom de Alarme : {currentAlarm.name}</p>
                <div className="btn">
                <button onClick={()=>{audio.current.pause();setCurrentAlarm(null)}}>stop alarme</button>
                <button onClick={()=>
                    {
                    audio.current.pause();
                    setCurrentAlarm(null);
                    recup[currentAlarm.name]=ajour(currentAlarm,5000);
                    }}>Repeter alarme</button>
                </div>
                
            </div>
        </div>
        }
            <h1>Alarme</h1>
                <div className="ala1">
                    <div className="top">
                    </div>
                    <div className="ala3">
                        {Object.keys(donnee).map((l,index) => { 
                   
                        return <button 
                            style={{backgroundColor: donnee[l]? "blue" : "white", 
                            color: donnee[l]? "white" : "black" }} 
                            onClick={()=>{
                            setDonnee((e)=>{
                            let resul={}
                            resul[l]=!e[l]
                            let output = {...e,...resul}
                            return output;
                            })
                        }}>{l}</button>
                        
                    })}
                </div>
                    <div className="ala2">
                        <div>
                        <label>Heure : </label>
                        <input type="time" name="part" value={Heure} onChange={(e)=> setHeure(e.target.value)}/>
                        </div>
                    </div>
                    <div className="ala2">
                        <div>
                        <label>nom de l'alarme </label>
                        <input type="text" name="par" value={name} onChange={(e)=> setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="ala2">
                        <div>
                            <button onClick={()=>envoie()}>soumettre</button>
                        </div>  
                    </div>
                </div>


                <div className="resultat">
                    <h1>La lise des Alarmes</h1>
                    {
                        Alarm.map((alar)=>{
                            return  <div className="resultat_1">
                            <div className="resultat2">
                                    <p>nom</p>
                                    <p className="haut">{alar.name}</p>
                            </div>
                            <div className="resultat3">
                                    <p>jour</p>
                                    <p className="haut">{alar.donnee}</p>
                            </div>
                            <div className="resultat3">
                                    <p>Heure</p>
                                    <p className="haut">{alar.Heures}</p>
                            </div>
                            <div className="resultat3">
                                    <p>etat</p>
                                    <button  onClick={()=>setAlarme(Alarm.map((al,index)=>{
                                        if(al.name===alar.name){   
                                        let update = {...al,isActive : !alar.isActive}
                                        
                                        ToggleAlarme(update)
                                        return update
                                        }else al
                                    }))} style={{background:alar.isActive?"green":"gray",color:alar.isActive?"white":"white"}}>{alar.isActive?"desactiver":"activer"}</button>
                            </div>
                        </div>
                

                        })
                    }
                </div>
        </>
    )
}
export default Alarme