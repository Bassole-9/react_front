import { useState } from 'react'
import Quiz from './Pagequiz'
import Connexion from './pageConnexion'
import Inscription from './pageInscription'
import { Route,Routes } from 'react-router-dom'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import TodoListe from './todolist'
import PasseWord from './passGenerator'



function App() {

  const router = createBrowserRouter([
    {
      path : "/Connexion",
      element : <Connexion/>   
    },
    {
      path : "/Quiz",
      element : <Quiz/>   
    },
    {
      path : "/Todoliste",
      element : <TodoListe/>  
    },
    {
      path : "/passeword",
      element : <PasseWord/>
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
