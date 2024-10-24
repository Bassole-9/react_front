import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Passe from './passeWord/passe'
import AlarmeDay from './AlarmeDay'
import TchatMessage from './tchat'
import Inscription from './Auth/inscription'
import Connexion from './Auth/connexion'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Discution from './discution/discution'

const Wraper=({Component})=>{
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  let location= useLocation()

  useEffect(()=>{
    let session = localStorage.getItem("data")
    const sessionDeco=["/connexion","/inscription"]
    
    if(session && sessionDeco.includes(location.pathname)){
        navigate("/")
    }
    if(!session && !sessionDeco.includes(location.pathname)){
      navigate("/connexion")
    }
    setLoading(false)
  },[location])
  return loading?<p>loading</p>:<Component/>
} 




function App() {
  
  const router = createBrowserRouter([
    {
      path : "/passe",
      element : <Wraper Component={Passe}/>   
    },
    {
      path : "/Alarme",
      element : <Wraper Component={AlarmeDay}/>   
    },
    {
      path : "/Chat/:chatId",
      element : <Wraper Component={TchatMessage}/>   
    },
    // {
    //   path : "/inscription",
    //   element : <Wraper Component={Inscription}/>   
    // },
    {
      path : "/connexion",
      element : <Wraper Component={Connexion}/>   
    },
    {
      path : "/Discution",
      element : <Wraper Component={Discution}/>   
    },
])


  return (
    <>
        <RouterProvider router={router}/>
        {/* <Routes>
          <Route path="/" element={<Quiz/>}></Route>
          <Route path="/Inscription" element={<Inscription/>}></Route>
          <Route path="/Connexion" element={<Connexion/>}></Route>
        </Routes> */}
    </> 
  )
}

export default App
