import axios from "axios";
import Cookies from "js-cookie";

interface Task {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  responsible: string;
  status: string;
  __v: number;
}

// Axios object
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Interceptors are used to add the JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    throw error;
  }
};

export const createTask = async (
  task: Omit<Task, "_id" | "__v">
): Promise<Task> => {
  try {
    const response = await api.post<Task>("/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la tâche:", error);
    throw error;
  }
};

export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  try {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche:", error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche:", error);
    throw error;
  }
};
