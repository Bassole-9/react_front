import jwt from "jsonwebtoken"

export const generateToken = async (data)=>{
    try {
        const token = await jwt.sign(data,"nan205",{ expiresIn: 60*60})
        return token 
        } catch (error) {
            console.log(error);
            return null
        }
}

export const verifyToken=async (token)=>{
    try {
        const verify = await jwt.verify(token,"nan205")
        if(verify){
            return verify
        }else{
            return false
        }
    } catch (error) {
        console.log(error);
        return null
    }
}