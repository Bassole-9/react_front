import "../../styles/score.css"

const Score =({Qlength, Rlength})=>{
    return(
        <>
        <div className="container">
            <div className="section_1">
                <p>Nombre de question : {Qlength}</p>
            </div>
            <div className="section_2">
                <p>question repondu : {Rlength}/{Qlength}</p>
            </div>
        </div>
        
        </>
    )
}
export default Score