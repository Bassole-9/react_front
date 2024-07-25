import { useEffect } from "react"

const Message =({show,text,setShowMessage})=>{

    useEffect(()=>{
        if(show){
            setTimeout(()=>{
                setShowMessage(false)
            },1500)
        }
    },[show])

    return(
        <>
        <div style={{visibility : show ? "visible" : "hidden"}}>
            <p>{text}</p>
        </div>
        </>
    )
}
export default Message