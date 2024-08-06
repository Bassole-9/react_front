import { useState } from "react"
import "../../styles/todoCss/taskTodo.css"
import AddTodo from "./add"
const TaskTodo =()=>{
    const [tasks,setTask]=useState([])


    return(
        <>
            <div className="container_Task">
            <AddTodo setTask={setTask} />
                <div className="Task">
                    <div>
                        <h1>My Task List</h1>
                    </div>
                    {/* ajout de tache */}
                    <div className="ajout">
                        {
                            tasks.map((r,index) =>{
                            return  <>
                                        <input type="texte" name="" placeholder="" value={r.task} disabled={r.isFinish} onChange={(e)=> setTask(tasks.map((f,i)=> i===index?{...f,task:e.target.value}:f))}/>
                                        <div>
                                                <button onClick={()=>setTask(tasks.filter(t => t.task!=r.task))}>s</button>
                                            {
                                                <button className="supprim" onClick={()=>setTask(tasks.map(t => t.task===r.task ? {...t,isFinish:!r.isFinish}:t))}>{r.isFinish ?"non terminer": "terminer"}</button>
                                            }
                                        </div>
                                    </>
                            })
                        }
                    </div>
                        
                </div>
            </div>
        </>
    )
}
export default  TaskTodo