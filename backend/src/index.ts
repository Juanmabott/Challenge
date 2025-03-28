import express, { RequestHandler } from "express";
import { Request, Response } from "express-serve-static-core";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    completedAt: Date | null;
  }

  let tasks: Task[] = [];
  let nextId = 1;

    // - GET Obtener todas las tareas
    app.get("/api/tasks", (req: Request, res: Response) => {
        res.status(200).json(tasks);
        }); 
    //- POST Crear una nueva tarea
    app.post("/api/tasks",(req: Request, res: Response) => {
        const { title, description } = req.body;
        
        if(!title)
        {
            res.status(400).json({ error: "Title is required" });
        }
        const newTask: Task = {
            id: nextId++,
            title,
            description,
            completed: false,
            completedAt: null 
        };
        tasks.push(newTask);

         res.status(201).json(newTask);
    }); 

    app.listen(PORT, () => { 
    console.log("Server running at PORT: ", PORT); 
    }).on("error", (error) => {
    throw new Error(error.message);
    });

    // - PUT Actualizar una tarea existente
    app.put("/api/tasks/:id", (req: Request, res: Response) => {
        const taskId = parseInt(req.params.id);
        const { title, description } = req.body;
        
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        
        if (taskIndex === -1) {
            res.status(404).json({ error: "Task not found" });
        }
        
        const updatedTask: Task = {
            ...tasks[taskIndex],
            title,
            description,
        };
        
        tasks[taskIndex] = updatedTask;
        
        res.status(200).json(updatedTask);
    });
    // - DELETE Eliminar una tarea existente
    app.delete("/api/tasks/:id", (req: Request, res: Response) => {
        const taskId = parseInt(req.params.id);
        
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        
        if (taskIndex === -1) {
            res.status(404).json({ error: "Task not found" });
        }
        
        tasks.splice(taskIndex, 1);
        
        res.status(204).send();
    });