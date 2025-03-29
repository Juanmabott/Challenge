import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import TaskItem from '../components/TaskItem';
import { Task } from '../interfaces/task';

function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/tasks/`);
        
        if (!response.ok) {
          throw new Error(`Error al cargar la tarea: ${response.statusText}`);
        }
        
        const data = await response.json();
        const selectedTask = data.find((task: Task) => task.id === Number(id));

        setTask(selectedTask || null);

      } catch (err) {
        console.error('Error fetching task:', err);
        setError('No se pudo cargar la tarea solicitada');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return <div>Cargando tarea...</div>;
  }

  if (error || !task) {
    return <div>Error: {error || 'Tarea no encontrada'}</div>;
  }

  return (
    <div className="task-detail">
      <h2>Detalle de Tarea</h2>
      <TaskItem task={task} />
    </div>
  );
}

export default TaskDetailPage;