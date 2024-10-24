import { useState } from "react"

const Passe=()=>{
    const [passeWord,setPassWord]=useState("")
    const [params,setParams]=useState({})

    const genePasseWord =()=>{
        let Alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let Alpha="abcdefghijklmnopqrstuvwxyz"
        let number="123456789"
        let symbole='$*§%+=?!^¨#@_-+='
        const Constance_Variable = Alphabet+Alpha+number+symbole

        let outPut="";
        let length = params.uppercase + params.lowercase + params.symbol + params.number


        while(outPut.length<length){
            const index = Math.random()*Constance_Variable.length
            const value =Constance_Variable[Math.floor(index)]

            //verifier si c'est une lettre majuscule
            if(Alphabet.includes(value)){
                let numberOfuppercase = outPut.split("").filter(f=> Alphabet.includes(f)).length
                console.log("number of uppercase ", numberOfuppercase,params.uppercase);
                if(numberOfuppercase<params.uppercase){
                    outPut+=value
                }
            }
            //verifier si c'est une lettre miniscule
            if(Alpha.includes(value)){
                let numberOflowercase = outPut.split("").filter(f=> Alpha.includes(f)).length
                console.log("number of lowercase ", numberOflowercase,params.lowercase);
                if(numberOflowercase<params.lowercase){
                    outPut+=value
                }
            }
            //verifier si c'est un nombre
            if(number.includes(value)){
                let numberOfNumber = outPut.split("").filter(f=> number.includes(f)).length
                console.log("number of number ", numberOfNumber,params.number);
                if(numberOfNumber<params.number){
                    outPut+=value
                }
            }
            //verifier si c'est un symbole
            if(symbole.includes(value)){
                let numberOfSymbole = outPut.split("").filter(f=> symbole.includes(f)).length
                console.log("number of symbol ", numberOfSymbole,params.symbol);
                if(numberOfSymbole<params.symbol){
                    outPut+=value
                }
            }
        }
        console.log(outPut);
        setPassWord(outPut) 
    }

    console.log(params);

    return(
        <div>
                <input type="number" name="" placeholder="combien voulez vous de majuscule" max={5} min={1} value={params?.uppercase || 0} onChange={(e)=>setParams({...params,uppercase:parseInt(e.target.value)})}/>
                <input type="number" name="" placeholder="combien voulez vous de minuscule" max={5} min={1} value={params?.lowercase || 0} onChange={(e)=>setParams({...params,lowercase:parseInt(e.target.value)})}/>
                <input type="number" name="" placeholder="combien voulez vous de chiffre" max={5} min={1} value={params?.number || 0}  onChange={(e)=>setParams({...params,number:parseInt(e.target.value)})}/>
                <input type="number" name="" placeholder="combien voulez vous de symboles" max={5} min={1} value={params?.symbol || 0}  onChange={(e)=>setParams({...params,symbol:parseInt(e.target.value)})}/>
                <button onClick={()=>genePasseWord()}>generer</button>
                <p>{passeWord}</p>
        </div>
    )
}
export default Passe