import { useState } from "react";
import Champ from "./components/passwordGen/input"


const PasseWord =()=>{
    const [passe,setPasse]=useState("")

        const uppercase="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        const toLowerCase="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
        const symbole="&$#@§=£-*!)({}¨^%;:+";
        const number="1,2,3,4,5,6,7,8,9";

        const rassembler = uppercase+toLowerCase+symbole+number
        const lenght= 12
        
    const creePassword =() =>{
        let password="";
        password+=toLowerCase[Math.floor(Math.random()*toLowerCase.length)]
        password+=symbole[Math.floor(Math.random()*symbole.length)]
        password+=number[Math.floor(Math.random()*number.length)]
        password+=uppercase[Math.floor(Math.random()*uppercase.length)]

        while(lenght>password.length){
            password+=rassembler[Math.floor(Math.random()*rassembler.length)]
        }
        setPasse(password) 
    }
    
    return(
        <>
        <Champ passe={passe}/>
            <button onClick={()=>creePassword()}>generer</button>
        </>
    )
}
export default  PasseWord