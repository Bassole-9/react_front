import "./styles/incription.css"

const Inscription =()=>{
    return(
        <>
        <div className="container_Inscri">
            <div className="section_Inscri">
                <form>
                    <div className="titreForm">
                        <p>Inscritpion : </p>
                    </div>
                    <div className="top">
                        <input type="texte" name="" placeholder="Nom"/>
                    </div>
                    <div className="top">
                        <input type="password" name="" placeholder="Prenom"/>
                    </div>
                    <div className="top">
                        <input type="texte" name="" placeholder="email"/>
                    </div>
                    <div className="top">
                        <input type="password" name="" placeholder="mot de passe"/>
                    </div>
                    <button>se connecter</button>
                </form>
            </div>
        </div>
        
        </>
    )
}
export default  Inscription