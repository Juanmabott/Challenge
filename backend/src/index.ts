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