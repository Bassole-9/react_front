import Prisma from "../lib/Prisma-client.js";
import Gemini from "gemini-ai";


// export const AddTChat = async (req,res)=>{
//     try {
//         const name = req.body.name
//         if(name){
//             if(typeof name==="string"){
//                 const chat = await Prisma.chat.create({
//                     data :{
//                         name,
//                         userId:res.locals.userId
//                     }
//                 })
//                 console.log(chat);
//                 res.json(chat)
//             }else{
//                 res.status(400).send("argument name is string")
//             }

//         }else{
//             res.status(400).send("argument name not found")
//         }
        
//     } catch (error) {
//         res.status(502).send(error.message)
//     }
// }



// export const addMessage = async (req,res)=>{
//     try {
//         const chatId= req.query.chatId
//         if(chatId){
//             const chat = await Prisma.chat.findFirst({
//                 where :{
//                     id:parseInt(chatId)
//                 }
//             })
//             if(chat){
//                 const message = await Prisma.message.create({
//                     data :{
//                         text : req.body.message,
//                         ChatId: parseInt(chatId)
//                     }
//                 })

//                 if(message){

//                     const gemini = new Gemini("AIzaSyAST8o1ocx9KIuUQRM2e8rQSwuJ6dZaj4c")
//                     let verif = await gemini.ask(message.text,{stream: console.log})
//                     let geminiResponse = await Prisma.message.create({
//                         data:{
//                             text: verif,
//                             isFromIa: true,
//                             ChatId: parseInt(chatId)
//                         }
//                     })
//                     res.json(geminiResponse)
//                 }else{
//                     res.status(404).send("message not created")
//                 }
//             }else{
//                 res.status(403).send("chat not found")
//             }
//         }else{
//             res.status(402).send("query chatID missing")
//         }
//     } catch (error) {
//         res.status(500).send(error.message)
//     }

// }

// export const getChats= async (req,res)=>{
//     try {
//         const Chats = await Prisma.chat.findMany({
//             where:{
//                 userId:res.locals.userId
//             }
//         })
//         res.json(Chats)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }

// }
// export const Message= async (req,res)=>{
//     try {
//         const ChatId = req.query.ChatId
//         const FindChat = await Prisma.chat.findFirst({
//             where :{
//                 id:parseInt(ChatId)
//             },
//             include:{
//                 Messages:true
//             }
//         })
//         if(FindChat){
//             res.json(FindChat.Messages)
//         }else{
//             res.status(403).send("Chat not found")
//         }
//     } catch (error) {
//         res.status(500).send(error.message)
//     }

// }


// export const Delete= async (req,res)=>{
//     try {
//         const chatId= req.params.id
//         console.log("bassole",chatId);
//         const verification = await Prisma.chat.findFirst({
//             where:{
//                 id: parseInt(chatId),
//                 userId:res.locals.userId
//             }
//         })
//         if(verification){
//             await Prisma.message.deleteMany({
//                 where:{
//                     ChatId:parseInt(chatId) 
//                 }
//             })
//             await Prisma.chat.delete({
//                 where:{
//                     id:parseInt(chatId) 
//                 }
//             })
//             res.send(verification)     
//         }else{
//             res.status(403).send("user not found")
//         }
        

//     } catch (error) {
//         res.status(500).send(error.message)
//     }

// }






//avec socket
export const AddTChat = async (req,res)=>{
    try {
        const name = req.body.name

        console.log("venuName",name);
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



export const addMessage = async (data)=>{
    console.log("senderrrr",data);
try {
            const chatId= data.chatId
            let text = data.message

            console.log("X",chatId);
    if(chatId){
                const chat = await Prisma.chat.findFirst({
                    where :{
                        id:parseInt(chatId)
                        }
                    })
                    
                        //
                        if(chat){
                           
                            const message = await Prisma.message.create({
                                data :{
                                    text : text,
                                    ChatId: chatId,
                                    senderId: data.sendId
                                }
                            })
                            console.log("m",message);

                            if(message){
                                return  {statut:true,message:message,userId:chat.userId,contactId:chat.contactId }
                            }else{
                                return {statut:false,message : "message non trouve"}
                            }
                        }else{
                            return {statut:false,message : "message non trouvee"}
                        }
                }else{
            return {statut:false,message : "message non trouveee"}
        }
} catch (error) {
    return {statut:false,message : "message non trouve"}
}

}



export const InitieChat = async (data)=>{
    console.log(data);
    try {
        const NewChat = await Prisma.chat.create({
            data :{
                userId : data.userId,
                contactId : data.contactId
            },
            include:{
                user:true,
                contact:true
            }
        })
        if(NewChat){
            const message = await Prisma.message.create({
                data:{
                    text :data.message,
                    ChatId:NewChat.id,
                    senderId:data.userId
                }
            })
            return {statut:true, data : message, chat:NewChat }
        }

    } catch (error) {
        return {statut:false,message : "message non trouve"}
    }

}

export const getChat= async (req,res)=>{
    try {
        const Result = await Prisma.chat.findMany({
            where:{
                OR:[
                    {
                        userId : res.locals.userId
                    },
                    {
                        contactId: res.locals.userId
                    }
                ]
            },
            include : {
                user : true,
                contact : true,
                Messages:true
            }
        })
        if(Result){
            res.json({Chats :Result,userId:res.locals.userId,userName:res.locals.userName })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


//////////


































export const getChats= async (req,res)=>{
    try {
        const Chats = await Prisma.chat.findMany({
            where:{
                userId:res.locals.userId
            }
        })
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



