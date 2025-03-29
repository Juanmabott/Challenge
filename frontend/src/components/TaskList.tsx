import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { Task } from '../interfaces/task';

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('/api/tasks');
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);
    
    
      // Mostrar estado de carga
      if (loading) {
        return <div className="loading">Cargando tareas...</div>;
      }
    
      if (error) {
        return <div className="error">{error}</div>;
      }
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    showActions={true} // Para mostrar el enlace "Ver detalles"

                />
            ))}
        </div>
    );
}