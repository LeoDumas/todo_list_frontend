import React, { useEffect, useState } from "react";
import { getAllTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import TaskItem from "../components/tasks/TaskItem";
import Modal from "../components/Modal";

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

const initialTaskState = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  duration: 0,
  responsible: "",
  status: "to do",
};

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] =
    useState<Omit<Task, "_id" | "__v">>(initialTaskState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("endDate");

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

  useEffect(() => {
    if (newTask.startDate && newTask.endDate) {
      const start = new Date(newTask.startDate);
      const end = new Date(newTask.endDate);
      const duration = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      setNewTask((prevTask) => ({ ...prevTask, duration }));
    }
  }, [newTask.startDate, newTask.endDate]);

  const handleCreateOrUpdateTask = async () => {
    try {
      const taskToSave = {
        ...newTask,
        responsible: newTask.responsible || "moi",
      };

      if (editingTask) {
        const updatedTask = await updateTask(editingTask._id, taskToSave);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } else {
        const createdTask = await createTask(taskToSave);
        setTasks((prevTasks) => [...prevTasks, createdTask]);
      }

      setNewTask(initialTaskState);
      setEditingTask(null);
      setIsModalOpen(false);
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

  const handleCloseModal = () => {
    setNewTask(initialTaskState);
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const sortedTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "endDate") {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      } else if (sortOption === "status") {
        const statusOrder = ["to do", "in progress", "done"];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      }
      return 0;
    });

  return (
    <div className="p-4">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-10 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          className="w-full sm:flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <select
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="endDate">Trier par date de fin</option>
            <option value="status">Trier par état</option>
          </select>
          <button
            className="p-2 bg-blue-500 text-white rounded w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Créer une nouvelle tâche
          </button>
        </div>
      </div>
      <div className="mt-52 sm:mt-48 md:mt-44 lg:mt-36">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={() => {
              setEditingTask(task);
              setNewTask(task);
              setIsModalOpen(true);
            }}
            onDelete={() => handleDeleteTask(task._id)}
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
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
          min={newTask.startDate}
          onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
        />
        <input
          type="number"
          placeholder="Durée (jours)"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={newTask.duration}
          readOnly
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
        <button
          className="w-full p-2 bg-gray-500 text-white rounded mt-2"
          onClick={handleCloseModal}
        >
          Fermer
        </button>
      </Modal>
    </div>
  );
};

export default TodoPage;
