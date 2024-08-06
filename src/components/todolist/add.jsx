import { useState } from "react"
import "../../styles/todoCss/add.css"

const AddTodo =({setTask})=>{
    const [tach,setTach]= useState("")

    return(
        <>
        <div className="container_Add">
            <div className="Add_title">
                <p>Add new Task :</p>
                <input type="text" name=""  placeholder="nouvelle tache" value={tach} onChange={(e)=> setTach(e.target.value)}/>
            </div>
            <div className="input_Add">
                <div className="button_Add">
                    <button onClick={()=>{
                         if(tach.trim()!==""){
                            setTask((hold)=>[...hold,{task:tach.trim(), isFinish:false}])
                            setTach("")
                         }
                        
                    }}>Add</button>
                </div>
                <div className="button_clear">
                    <button>clear All</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default  AddTodo