import { useEffect, useState } from "react";
import Header from "./components/quiz/header";
import Score from "./components/quiz/score";
import Question from "./components/quiz/Question"
import Chrono from "./components/quiz/chrono"
import "./styles/crono.css"
import { useNavigate } from "react-router-dom";
import Message from "./components/quiz/message";


const Quiz = ()=>{

    const navigate = useNavigate()
    const [connecter,SetConnecter] = useState([])
    const [showMessage,setShowMessage] = useState(false)
    const [text,setText] = useState("")
   


    useEffect(()=>{
        const tchek = JSON.parse(localStorage.getItem("user")) 
        if(!tchek){
            navigate('/Connexion')
        }
        SetConnecter(tchek)
    },[])


    //hook question qui contient les differentes question et bonne reponse  
    const [questions,setQuestion]= useState([
        {question : "npm run dev permet de lancer un serveur node ? ",reponse:true, points: 2, time:60},
        {question : "nodemon est un package de npm ? ",reponse:true , points: 2, time: 60},
        {question : "react est un framework coté backend  ? ",reponse:true , points: 2, time:60},
        {question : "fichier css ne permet de styliser une balise ? ",reponse:false , points: 2 ,time:60},
        {question : "nodemon n'est pas un relanceur automatique de serveur? ",reponse:true , points: 2, time:60}
    ])

    //hook tableaux vide qui permet de stocker les diffentes reponses 
    const [reponse,setReponse]=useState([])
    const tailleReponse = reponse.length



    //function qui permet d'ajoutez les reponses dans le tableau de reponse
    const getResponse = (question, rep)=>{
            const find = reponse.find(re => re.question === question)
        if(find){   
            setReponse(reponse.map( r => r.question === question ? {...r, reponse : rep }: r))
        }else {
            setReponse([...reponse, {question,reponse : rep}])
        }
    }
    console.log(reponse);


    //function calcule scrore
    const calculScore =()=>{
        let count = 0
            reponse.map((r)=>{
                const quest = questions.find(q => q.question === r.question)
            
                if( quest.reponse === r.reponse ){
                   count +=quest.points 
                }
            })
            setScore(count)
            setIquiz(true)   
    }

    const [Iquiz,setIquiz] = useState(false)
    const [score,setScore]=useState(0)


    return(
        <>
           { !Iquiz ?
            <div className="valider">
                <Header title={connecter.nom}/>
                <Message show={showMessage} text={text} setShowMessage={setShowMessage}/>
                <Score Qlength={questions.length} Rlength={reponse.length}/>
                <Chrono time={120} calculScore={calculScore} setShowMessage={setShowMessage} setText={setText}/>
                <div>
                    {
                        questions.map((q)=> {
                            return <Question question={q.question} recup={getResponse} points={q.points}/>
                        })
                    }
                </div>
                <div className="centrer">
                    {
                        tailleReponse>0 ? <button onClick={calculScore}>valider</button>
                        :
                        <button disabled="disable">valider</button>
                    }
                </div>
                <div></div>
            </div> : <div className="containerCrono">
                <div className="crono">
                    <div className="tex">
                        {
                            score<5 ? <div className="petit">{score}/10</div>
                            :
                            <div className="grand">{score}/10</div>
                        }
                    </div>
                    
                    <div className="abso">
                        <button onClick={(e) => {setReponse([]), setIquiz(false)}}> mettre a zero</button> 
                    </div>
                </div>
            </div>
            }
        </>
    )
 }
export default Quiz