 import "../../styles/question.css"



const Question =({question,recup,points})=>{
    return(
        <>
        <div className="containerQ">
            <div className="sectionQ_1">
                <p> Question : {question} ({points} points)</p>
            </div>
            <div className="sectionQ_2">
                <p>
                    <input type="radio" name={question} id="res" onChange={(e)=> recup(question,true)} />
                    <label htmlFor="res">Vrai</label>
                </p>
                <p>
                    <input type="radio" name={question} id="fo" onChange={(e)=> recup(question,false)}/>
                    <label htmlFor="fo">Faux</label>
                </p>
            </div>
            
        </div>
        
        
        </>
    )
}
export default Question