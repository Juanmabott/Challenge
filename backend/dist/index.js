"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT;
let tasks = [];
let nextId = 1;
// - GET Obtener todas las tareas
app.get("/api/tasks", (req, res) => {
    res.status(200).json(tasks);
});
//- POST Crear una nueva tarea
app.post("/api/tasks", (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        res.status(400).json({ error: "Title is required" });
    }
    const newTask = {
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
app.put("/api/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description } = req.body;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        res.status(404).json({ error: "Task not found" });
    }
    const updatedTask = Object.assign(Object.assign({}, tasks[taskIndex]), { title,
        description });
    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
});
// - DELETE Eliminar una tarea existente
app.delete("/api/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});
