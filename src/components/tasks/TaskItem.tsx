import React, { useState } from "react";
import Modal from "../Modal";

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

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "to do":
        return "bg-red-100 text-red-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    onDelete();
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${getStatusClasses(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p className="text-gray-700">
          <span className="font-semibold">Début :</span>{" "}
          {new Date(task.startDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Fin :</span>{" "}
          {new Date(task.endDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Durée :</span> {task.duration} jours
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Responsable :</span>{" "}
          {task.responsible}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
          onClick={onEdit}
        >
          Éditer
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleDelete}
        >
          Supprimer
        </button>
      </div>

      <Modal isOpen={showModal} onClose={cancelDelete}>
        <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
        <p className="mb-4">Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
            onClick={cancelDelete}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={confirmDelete}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
