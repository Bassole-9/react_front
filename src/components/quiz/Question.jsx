 import "../../styles/question.css"
 import { useEffect, useState } from "react";


const Question =({question,recup,points,time, isActive, setCurrentQuestion,index,answer})=>{
    const [decompte,setDecompte] = useState (null)

    //permet de faire le decompte de chaque question
    let inter = null;
    useEffect(()=>{
        if(isActive && decompte===null){
            setDecompte(time)
        }
        if(isActive && decompte > 0){
            inter = setInterval(()=>{
                setDecompte(decompte -1)
            },1000)

            console.log(isActive,decompte);

        }else if(decompte===0){
            setCurrentQuestion(index +1)
            setDecompte(null)
        }
        return ()=>{ clearInterval(inter)}

    },[isActive,decompte])


    return(
        <>
        <div className="containerQ" style={{backgroundColor: isActive ? "dodgerblue": "gray"}}>
            <div className="sectionQ_1">
                <p> Question : {question} ({points} points)</p>
                <p>{decompte}</p>
            </div>
            <div className="sectionQ_2">
                <p>
                    <input type="radio" name={question} disabled={isActive ===false} id="res" onChange={(e)=> recup(question,true)} checked={answer===true}/>
                    <label htmlFor="res">Vrai</label>
                </p>
                <p>
                    <input type="radio" name={question} disabled={isActive ===false}  id="fo" onChange={(e)=> recup(question,false)} checked={answer===false}/>
                    <label htmlFor="fo">Faux</label>
                </p>
           
            </div>
            
        </div>
        
        
        </>
    )
}
export default Question