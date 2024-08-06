import HeaderTodo from "./components/todolist/header"
import TaskTodo from "./components/todolist/task"
import "./styles/todoCss/grandContainer.css"
const TodoListe =()=>{
    return(
        <>
        <div className="container_Tololiste">
            <HeaderTodo/>
            <TaskTodo/>
        </div>
        </>
    )
}
export default  TodoListe