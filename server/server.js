import express from "express";
import http from "http"
import cors from "cors";
import Gemini from "gemini-ai";
import Authrouter from "./routers/Auth.router.js";
import ChatRouter from "./routers/chat.router.js";
import checkUSer from "./middlewares/checkUser.js";
import {Server} from "socket.io"
import { verifyToken } from "./lib/jwt.js";
import { promises } from "dns";
import { InitieChat } from "./controllers/chat.controllers.js";
import { addMessage } from "./controllers/chat.controllers.js";
import { log } from "console";
import { type } from "os";


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use("/api/Auth",Authrouter)
app.use("/api/Chat",checkUSer,ChatRouter)

//creation du serveur du socket io
const serveur = http.createServer(app)
const io = new Server(serveur,{
    cors: "*"
})

//recuperation  du socketId
const getSocketId =(id)=>{
    return new Promise((next)=>{
            io.sockets.sockets.forEach((s)=>{
                    if(s.session.id===id){
                        next(s.id) 
                    }
            })
            next(null)
    })

}



//recuperation  des utitilsateur connecter sauf lui meme 
const getUsers =(id)=>{
    const output=[]
    return new Promise((next)=>{
            io.sockets.sockets.forEach((s)=>{
                console.log(s.session);
                    if(s.session.id!==id){
                        output.push({id:s.session.id, name:s.session.Name, socketId:s.id})
                    }
            })
            next(output)
    })
}






//midellwears du socket
io.use(async (socket,next)=>{
    const handshakes =socket.handshake.auth.token
    const verif = await verifyToken(handshakes)
    if(verif){
        socket.session = {
           id: verif.id,
           Name: verif.name
        } 
        next()
    }else{
        socket.send(new Error ("your a not autorise"))
    }
})



//connexion du socket

io.on("connection",async (socket)=>{
    console.log("connected",socket.session,socket.id);

    socket.on("getUsers",async(cb)=>{
        const getUSer= await getUsers(socket.session.id)
        console.log(getUSer);
        cb(getUSer)
    })


    socket.on("sendMessage",async(data,cb)=>{
        console.log("send message",data);
        let messenger
        if(data.chatId){
            messenger = await addMessage({...data,sendId:socket.session.id})
        }else{
            messenger = await InitieChat({...data,userId:socket.session.id})
        }
        console.log(messenger);
        if(messenger.statut){
            const sendData = data.chatId? {message:messenger.message,userId:messenger.userId,contactId:messenger.contactId}:{
                ...messenger.chat,
                messages : [messenger.data]
            }
            const contactSignal = await getSocketId(data.contactId)
            if(contactSignal){
                    socket.to(contactSignal).emit("sendMessage",{
                        data:sendData,
                        isNew:data.chatId?false:true
                    })      
            }
            cb(sendData)
        }
    })

    socket.on("disconnect",async(cb)=>{
        console.log("disconnect");
    })


// socket.emit("salutation","bonjour")

    // socket.on("discution",(discu)=>{
    //     console.log(discu);
    // })
})



serveur.listen(4000,()=>{
    console.log("demarre");
})