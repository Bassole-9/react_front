import { useState,useEffect } from "react"
import { useSocket } from "../lib/socket"
import axios from "axios"


const Home=()=>{
    const[users,setUsers]=useState([])
    const[Chats,setChats]=useState([])
    const[connectUserId,setConnectUserId]=useState([])
    const[CurrentChat,setCurrentChat]=useState(null)
    const[message,setMessage]=useState("")
    const[name,setName]=useState([])



    const socket = useSocket()
    useEffect(()=>{
        socket?.connect()

        socket?.on("connect",()=>{
            console.log("connect");
            socket?.emit("getUsers",(donnee)=>{
               setUsers(donnee) 
            })
        })
        socket?.on("sendMessage",({data,isNew})=>{
            if(isNew){
                console.log("datateee",data);
                setChats([...Chats,data])
            }else{
                setChats(Chats.map(m=>{
                    if(m.userId===data.userId &&  m.contactId===data.contactId){
                        return {...m,Messages :[...m.Messages,data.message] }
                    }else{
                        return m
                    }
                }))
            }
        })
    },[Chats,socket])


    useEffect(()=>{
            axios.get("http://localhost:4000/api/Chat",{
                             headers:{
                              Authorization : localStorage.getItem("data")
                         }
                      }).then((res)=>{
                        if(res.status===200){
                            setChats(res.data.Chats)
                            setConnectUserId(res.data.userId)
                            setName(res.data.userName)
                        }
                      })
                      .catch((err)=>console.log(err))
            },[])


    
    // useEffect(async ()=>{
    //     const resultats = await axios.get("http://localhost:4000/api/Chat",{
    //         headers:{
    //             Authorization : localStorage.getItem("data")
    //         }
    //     })
    //     if(resultats.status===200){
    //         setChats(resultats.data.Chats)
    //         setConnectUserId(resultats.data.userId)
    //     }
       
    // },[])


    const getData=(co)=>{
        return co.userId===connectUserId? co.contact : co.user
    }

    

 

    const SendMessage=()=>{
            socket.emit("sendMessage",{chatId :CurrentChat.id,message,contactId:CurrentChat.contactId },(data)=>{
                console.log(data);
                setMessage("")
                if(CurrentChat.id){
                    setChats(Chats.map(m=>{
                        if(m.id===CurrentChat.id){
                            return {...m,Messages :[...m.Messages,data.message] }
                        }else{
                            return m
                        }
                    }))
                }else{
                    setChats([...Chats,data])
                    setCurrentChat({...CurrentChat,id:data.id,})
                }
            })
        }
    




    // useEffect(()=>{
    //    if(users.length>0){
    //         const contact = users[0]
    //         socket?.emit("initChat",{contactId:contact.id,text:"bonsoir"},(data)=> console.log("log du chat",data))
    //    }
    // },[users,socket])


    return(
        <>
        <div className="w-[100%] bg-purple-400 h-auto p-2 text-3xl flex ">
            <p className="text-white">Chat Js </p>
            <p className="text-blue-700">{name}</p>
        </div>
            <div className="w-[100vw] h-[95.1vh] bg-white flex flex-row items-start justify-start">
                <div className="w-[15%] bg-gray-400 h-full">
                    <h1 className="w-full font-bold h-[25px] bg-gray-200 text-2xl">Users</h1>
                    {
                        Chats.map((m,index)=>{
                            return <div key={index} onClick={()=>setCurrentChat({contactId : getData(m).id,messages : m.Messages,id:m.id})} className="w-full h-[70px] flex flex-row items-center justify-start p-1 bg-white border-b-[1px] border-b-solid border-b-gray-400 relative">
                            <div className="p-8 rounded-full bg-gray-500 bg-[url('https://img.freepik.com/photos-gratuite/joueur-football-masculin-ballon-terrain-herbe_23-2150821530.jpg')] bg-cover"></div>
                            <div className="h-full flex flex-col items-start justify-start w-full ml-2 p-1">
                                <p className="font-bold text-black text-xl">{getData(m).name}</p>
                                <p className="text-gray-500 text-md"></p>
                            </div>
                            <div className={`absolute p-2 ${users.find(f=> f.id===getData(m).id)?"bg-lime-400":"bg-red-700"} rounded-full top-[45px] left-[55px]`}></div>
                        </div>
                        })
                    }
                    {
                    users.filter((f)=>{
                        const isChat= Chats.length>0? Chats.find((fin)=> fin.userId===connectUserId ? fin.contactId !=f:
                        fin.userId !=f):true
                    return isChat
                    }).map((m,index)=>{
                            return <div key={index} onClick={()=>setCurrentChat({contactId : m.id,messages:[]})} className="w-full h-[70px] flex flex-row items-center justify-start p-1 bg-white border-b-[1px] border-b-solid border-b-gray-400 relative">
                            <div className="p-8 rounded-full bg-gray-500 bg-[url('https://img.freepik.com/photos-gratuite/joueur-football-masculin-ballon-terrain-herbe_23-2150821530.jpg')] bg-cover"></div>
                            <div className="h-full flex flex-col items-start justify-start w-full ml-2 p-1">
                                <p className="font-bold text-black text-xl"></p>
                                <p className="text-gray-500 text-md"></p>
                            </div>
                            <div className={`absolute p-2 bg-lime-400 rounded-full top-[45px] left-[55px]`}></div>
                        </div>
                        })
                    }
                </div>
                <div className="w-[85%] bg-white h-[100%] flex flex-col items-start justify-start">
                        {
                            CurrentChat&& <>
                                    <div className="w-full h-[95%] bg-gray-200 flex flex-col items-start justify-start overflow-x-hidden">
                                    {
                                            
                                        Chats.find(f=> f.id===CurrentChat.id)?.Messages?.map((m,index)=>{
                                                    return  <div key={index} className={`w-[40%] p-2 ${m.senderId === connectUserId ? "bg-white self-end":"bg-blue-400"} rounded-md m-[2rem] my-4`}>
                                                            <p className="text-black text-md p-4">{m.text}</p>
                                                            <span className="w-[100%] inline-block text-right text-black font-bold">{new Date(m.date).getHours()+":"+new Date(m.date).getMinutes()}</span>
                                                        </div>
                                        })
                                    }
                                    </div>
                                    <div className="w-full h-[5%] flex flex-row items-start justify-start bg-blue-700 border-t-solid border-t-[1px] border-t-gray-400">
                                        <input onChange={(e)=>setMessage(e.target.value)} value={message} className="w-[90%] h-full p-2 outline-none" placeholder="entrer votre message"/>
                                        <button onClick={()=>SendMessage()} className="w-[10%] h-full  text-white align-center  bg-green-700 font-bold">send</button>
                                    </div>    
                            </>
                        }
                        {
                            !CurrentChat&&<>
                                <p>veuillez  selectionné  un Chat </p>
                            </>
                        }
                </div>
            </div>
        </>
    )
}
export default Home