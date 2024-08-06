import { useState,useEffect } from "react"


const ChangeColor = ()=>{

    const [color,setColor]= useState("#000000")

    useEffect(()=>{
       console.log(color);
    },[color])


    function genColor(){
        let output = "#"
        const alphabet ="abcdef0123456789"
        while (output.length<7){
            const index = Math.floor(Math.random()*alphabet.length) 
            output += alphabet[index]
        }
        setColor(output)
    }

    return(
        <div style={{backgroundColor:color, padding:"10rem"}}>
            <input onClick={()=>genColor()} value={color} onChange={(e)=>setColor(e.target.value)}/>
            
        </div>
    )
}
export default ChangeColor