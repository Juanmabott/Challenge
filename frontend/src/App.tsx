
import './App.css'
import { Routes,Route } from 'react-router';
import HomePage from './pages/HomePage';
import TaskDetailPage from './pages/TaskDetalles';

function App() {

  return (
   <main>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tasks/:id" element={<TaskDetailPage />} /> {/* Ruta corregida */}

    </Routes>
   </main>
  )
}

export default App
