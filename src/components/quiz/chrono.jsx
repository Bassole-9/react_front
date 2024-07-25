import { useEffect, useState } from "react"
import "../../styles/seconde.css"

const Chrono=({time,calculScore,setShowMessage,setText})=>{


    const [color,setColor]= useState("black")
    const [decompte,setDecompte] = useState(time)


    const formatTime =(temp)=>{
        let minute = parseInt(temp/60)
        let seconde = temp%60
        return `${minute < 10 ? "0"+ minute : minute}:${seconde < 10 ? "0"+ seconde : seconde}`
    }

    useEffect(()=>{
        if(decompte<=10){
            setColor("red")
        }else if(decompte<=30){
            setColor("orange")
        }else{
            setColor("black")
        }

        if(decompte === 15){
            setShowMessage(true)
            setText("il vous reste 15 seconde")
        }else if(decompte ===10){
            setShowMessage(true)
            setText("il vous reste 10 seconde")
        }else if(decompte ===5){
            setShowMessage(true)
            setText("il vous reste 05 seconde")
        }
    },[decompte])



    let inter ;
    useEffect(()=>{
        if(decompte>0){
             inter = setInterval(()=>{
                setDecompte(decompte -1)
            },1000)
        }else{
            calculScore()
        }
        return ()=>{ clearInterval(inter)}
    },[decompte])

    return(
        <>
        <div className="seconde">
            <div className="seconde_cadre">
                <p style={{color}}>time : {formatTime(decompte)}</p>
            </div>
        </div>
        
        </>
    )
}
export default Chrono