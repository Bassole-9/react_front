import Prisma from "../lib/Prisma-client.js";
import Gemini from "gemini-ai";


export const AddTChat = async (req,res)=>{
    try {
        const name = req.body.name
        if(name){
            if(typeof name==="string"){
                const chat = await Prisma.chat.create({
                    data :{
                        name,
                        userId:res.locals.userId
                    }
                })
                console.log(chat);
                res.json(chat)
            }else{
                res.status(400).send("argument name is string")
            }

        }else{
            res.status(400).send("argument name not found")
        }
        
    } catch (error) {
        res.status(502).send(error.message)
    }
}

export const addMessage = async (req,res)=>{
    try {
        const chatId= req.query.chatId
        if(chatId){
            const chat = await Prisma.chat.findFirst({
                where :{
                    id:parseInt(chatId)
                }
            })
            if(chat){
                const message = await Prisma.message.create({
                    data :{
                        text : req.body.message,
                        ChatId: parseInt(chatId)
                    }
                })

                if(message){

                    const gemini = new Gemini("AIzaSyAST8o1ocx9KIuUQRM2e8rQSwuJ6dZaj4c")
                    let verif = await gemini.ask(message.text,{stream: console.log})
                    let geminiResponse = await Prisma.message.create({
                        data:{
                            text: verif,
                            isFromIa: true,
                            ChatId: parseInt(chatId)
                        }
                    })
                    res.json(geminiResponse)
                }else{
                    res.status(404).send("message not created")
                }
            }else{
                res.status(403).send("chat not found")
            }
        }else{
            res.status(402).send("query chatID missing")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

}

export const getChats= async (req,res)=>{
    try {
        const Chats = await Prisma.chat.findMany({
            where:{
                userId:res.locals.userId
            }
        })
        console.log(Chats);
        res.json(Chats)
    } catch (error) {
        res.status(500).send(error.message)
    }

}
export const Message= async (req,res)=>{
    try {
        const ChatId = req.query.ChatId
        const FindChat = await Prisma.chat.findFirst({
            where :{
                id:parseInt(ChatId)
            },
            include:{
                Messages:true
            }
        })
        if(FindChat){
            res.json(FindChat.Messages)
        }else{
            res.status(403).send("Chat not found")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

}


export const Delete= async (req,res)=>{
    try {
        const chatId= req.params.id
        console.log("bassole",chatId);
        const verification = await Prisma.chat.findFirst({
            where:{
                id: parseInt(chatId),
                userId:res.locals.userId
            }
        })
        if(verification){
            await Prisma.message.deleteMany({
                where:{
                    ChatId:parseInt(chatId) 
                }
            })
            await Prisma.chat.delete({
                where:{
                    id:parseInt(chatId) 
                }
            })
            res.send(verification)     
        }else{
            res.status(403).send("user not found")
        }
        

    } catch (error) {
        res.status(500).send(error.message)
    }

}



