import { Task } from "../interfaces/task";
import { Link } from "react-router"; // Agregar para navegación

interface TaskItemProps
{
    task: Task;
    showActions?: boolean;

}

function TaskItem({ 
    task,
    showActions = false

  }: TaskItemProps)

{
    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Estado: {task.completed ? "Completada" : "Pendiente"}</p>
            {showActions && (
            <Link to={`/tasks/${task.id}`}>Ver detalles</Link>
            )}
        </div>
    );
}




export default TaskItem;