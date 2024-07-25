import "../../styles/Header.css"

const Header = ({title})=>{
    return(
        <>
            <div className="section">
                <h1>Bienvenue : {title} </h1>
            </div>  
        </>
    )
}
export default Header