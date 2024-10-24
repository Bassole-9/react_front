import { verifyToken } from "../lib/jwt.js";
import Prisma from "../lib/Prisma-client.js";

const checkUSer = async (req,res,next)=>{
    try {
        const token = req.headers["authorization"]
        if(token){
            const verif = await verifyToken(token)
            if(verif){
                const user = await Prisma.user.findUnique({
                    where:{
                        email:verif.email
                    }
                })
                if(user){
                    res.locals.userId = verif.id
                    res.locals.userName = verif.name
                    next()
                }else{
                    res.status(403).send("user n'exisite pas")
                }
            }else{
                res.status(403).send("token not found")
            }
        }else{
            res.status(403).send("token not found")
        }
        
    } catch (error) {
        console.log("erreur de checkUSer",error);
        return res.status(500).send(error.message)
    }
}
export default checkUSer
