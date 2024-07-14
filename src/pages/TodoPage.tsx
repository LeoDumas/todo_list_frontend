import React, { useEffect, useState } from "react";
import { getAllTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import TaskItem from "../components/tasks/TaskItem";

interface Task {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  responsible: string;
  status: string;
}

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Omit<Task, "_id" | "__v">>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: 0,
    responsible: "",
    status: "to do",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAllTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateOrUpdateTask = async () => {
    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask._id, newTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } else {
        const createdTask = await createTask(newTask);
        setTasks((prevTasks) => [...prevTasks, createdTask]);
      }
      setNewTask({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        duration: 0,
        responsible: "",
        status: "to do",
      });
      setEditingTask(null);
    } catch (error) {
      console.error(
        "Erreur lors de la création ou mise à jour de la tâche:",
        error
      );
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
  };

  const sortedTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {editingTask ? "Modifier la tâche" : "Créer une nouvelle tâche"}
        </h2>
        <input
          type="text"
          placeholder="Titre"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Date de début"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={newTask.startDate}
          onChange={(e) =>
            setNewTask({ ...newTask, startDate: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Date de fin"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={newTask.endDate}
          onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
        />
        <input
          type="number"
          placeholder="Durée (jours)"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={newTask.duration}
          onChange={(e) =>
            setNewTask({ ...newTask, duration: parseInt(e.target.value) })
          }
        />
        <input
          type="text"
          placeholder="Responsable"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={newTask.responsible}
          onChange={(e) =>
            setNewTask({ ...newTask, responsible: e.target.value })
          }
        />
        <select
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={handleCreateOrUpdateTask}
        >
          {editingTask ? "Mettre à jour la tâche" : "Créer la tâche"}
        </button>
      </div>
      {sortedTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={() => {
            setEditingTask(task);
            setNewTask(task);
          }}
          onDelete={() => handleDeleteTask(task._id)}
        />
      ))}
    </div>
  );
};

export default TodoPage;
