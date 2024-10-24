import { Link } from "react-router-dom";
import "./css/connexion.css";
import { X } from "lucide-react";
import { image20,image21 } from "../../assets";
import { service } from "../../cadenas/service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Connexion = () => {
    const navigate= useNavigate()

    const [connect,setConnect]=useState({
        email:"",
        motDePasse:""
    })

    const connecter=(e)=>{
        e.preventDefault()
        service.logins(connect)
        .then((res)=>{ console.log(res)
        service.saveToken(res.data.token)
        service.saveUser(res.data.message)
        navigate("/acceuil")})
        .catch(err=> console.log(err))
    }




  return (
    <>
      <div className="container_inscription">
        <div className="section_inscription">
          <form onSubmit={connecter}>
            <div className="xxx">
              <Link to="/acceuil" className="x1">
                <X />
              </Link>
            </div>
            <div className="inscri_connexion">
              <p>Se Connecter </p>
            </div>
            <div className="inscri2">
              <img src={image20} className="rond"/>
             <img src={image21} className="rond"/>
            </div>
            <hr />

            <div className="inscri4">
              <input
                className="text"
                type="email"
                name=""
                placeholder="E-mail*"
                value={connect.email}
                onChange={(e)=>setConnect({...connect,email:e.target.value})}
              />
              <hr />
            </div>
            <div className="inscri4">
              <input type="password" name="" placeholder="Mot de passe*" value={connect.motDePasse} onChange={(e)=>setConnect({...connect,motDePasse:e.target.value})}/>
              <hr />
            </div>
            <div className="mot">
              <p>Mot de passe oublié ?</p>
            </div>

            <button className="btn_form">Se Connecter</button>
            <div className="dejas">
              <p>
                Nouveau ?{" "}
                <Link className="co" to="/inscription">
                  Créer un compte
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
