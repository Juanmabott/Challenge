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
