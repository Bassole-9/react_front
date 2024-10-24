import express from "express";
import http from "http"
import cors from "cors";
import Gemini from "gemini-ai";
import Authrouter from "./routers/Auth.router.js";
import ChatRouter from "./routers/chat.router.js";
import checkUSer from "./middlewares/checkUser.js";
import {Server} from "socket.io"
import { verifyToken } from "./lib/jwt.js";


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use("/api/Auth",Authrouter)
app.use("/api/Chat",checkUSer,ChatRouter)

//creation du socket io
const serveur = http.createServer(app)
const io = new Server(serveur,{
    cors: "*"
})
//midellwears du socket
io.use((socket,next)=>{
    const handshakes =socket.handshake.auth.token
    const verif = verifyToken(handshakes)
    if(verif){
        next()
    }else{
        
    }


    console.log("salut",handshakes);
})
//connexion du socket

io.on("connection",(socket)=>{
    console.log("connected");
})


serveur.listen(3000,()=>{
    console.log("demarre");
})