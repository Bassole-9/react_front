import express from "express";
import { AddTChat,addMessage,getChats,Message,Delete,getChat } from "../controllers/chat.controllers.js";



const ChatRouter = express.Router()


ChatRouter.post("/AddChat",AddTChat)
ChatRouter.post("/message",addMessage)
ChatRouter.get("/discution",getChats)
ChatRouter.get("/messages",Message)
ChatRouter.delete("/:id",Delete)
ChatRouter.get("/",getChat)



export default ChatRouter