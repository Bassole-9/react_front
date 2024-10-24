import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import  "./css/connexion.css"
import { Link } from "react-router-dom"

const Connexion=()=>{
        const navigate=useNavigate()
    const [Connexion,setConnexion]=useState({
        email:"",
        password:""
    })
    const envoie= async (e)=>{
        e.preventDefault()
        const reques = await axios.post("http://localhost:3000/api/Auth/signIn",Connexion)
        if(reques.status===200){
            localStorage.setItem("data",reques.data.data)
            navigate("/discution")
        }else{
            console.log("erreur lors de la connexion")
        }    
    }




    return (
        <>
          <div className="container_inscription">
            <div className="section_inscription">
              <form onSubmit={envoie}>
                <div className="xxx">
                  {/* <Link to="/acceuil" className="x1">
                    <X />
                  </Link> */}
                </div>
                <div className="inscri_connexion">
                  <p> Cree un compte </p>
                </div>
                {/* <div className="inscri2">
                  <img src={image20} className="rond" />
                  <img src={image21} className="rond" />
                </div> */}
                <hr />
                <div className="inscri3">
                  <p>les champs marquer en astérisque sont obligatoire</p>
                </div>
                <div className="inscri4">
                  <input
                    type="email"
                    name=""
                    placeholder="E-mail*"
                    value={Connexion.email}
                    onChange={(e) =>
                        setConnexion({ ...Connexion, email: e.target.value })
                    }
                  />
                  <hr />
                </div>
                <div className="info">
                  <p>
                    8 caractères minimum, dont 3 parmi:
                    <br />1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
                  </p>
                </div>
    
                <div className="genre">
                  <label>Genre *</label>
                  <input type="radio" value="" />
                </div>
                <div className="inscri4">
                  <input
                    type="password"
                    placeholder="Password*"
                    value={Connexion.password}
                    onChange={(e) =>
                        setConnexion({ ...Connexion, password: e.target.value })
                    }
                  />
                  <hr />
                </div>
                <div className="check">
                  <input type="checkbox" />
                  <p>
                    J'accepte que mes données soient communiqués et <br />
                    réutilisées afin de recevoir des offres personnalisées *
                  </p>
                </div>
    
                <div className="info2">
                  <p>
                    En cliquant sur « Connexion avec Facebook », « Connexion avec
                    Apple », « Connexion avec Google » ou « Valider et continuer »,
                    je reconnais avoir pris connaissance des Conditions Générales
                    d'Utilisation et je les accepte.
                  </p>
                </div>
                <button className="btn_form">Valider et continuer</button>
                <div className="dejas">
                  <p>
                    déja inscrit(e) ?{" "}
                    <Link className="co" to="/inscripition">
                      se connecter
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      );
    };
    export default Connexion;