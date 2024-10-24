import { useEffect,useRef,useState } from "react"
import { io } from "socket.io-client"

export const useSocket =()=>{
    const socket = useRef(new io("http://localhost:4000",{
        auth:{
            token:localStorage.getItem("data")
        },
        autoConnect:false
    }
))
    const [connected,setConnected]=useState(false)

    

    // useEffect(()=>{

    //     console.log("bonjour");
    //     if(!connected){
    //         socket.current= new io("http://localhost:4000",{
    //             auth:{
    //                 token:localStorage.getItem("data")
    //             },
    //             autoConnect:false
    //         }
    //     )
    //         // socket.current.on("connect",()=>setConnected(true))
    //     }
    //     // return ()=> socket.current.disconnect()
    // },[connected])

    return socket.current
}
