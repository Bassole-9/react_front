import signUpSchema from "../validators/signeUp.validator.js"
import Prisma from "../lib/Prisma-client.js"
import signInValidator from "../validators/signeIn.validator.js"
import { generateToken } from "../lib/jwt.js"


export const signUp = async (req,res)=>{
    try{
        const data = req.body
        const  check = await signUpSchema.validate(data)
        const newUser= await Prisma.user.create({
            data:check
        })
        res.send(newUser)
    }catch(err){
        res.status(500).send(err.message)
    }
    
}

export const signIn = async (req,res)=>{
    try {
        const data = req.body
        const donnee = await signInValidator.validate(data)
        const verif = await Prisma.user.findUnique({
            where : {
                email : donnee.email,
                password : donnee.password
            }
        })
        if(verif){
            const tokens = await generateToken({id:verif.id,email:verif.email})
            if(tokens){
                res.json({statut:true,data:tokens})
            }else{
                res.status(400).json({statut:false,message:e})
            }
        }
    } catch (err) {
        console.log(err.message);
        res.statut(500).send(err.message)
    }
}