import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskItem from "../tasks/TaskItem";

jest.mock("../Modal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) =>
    isOpen ? (
      <div>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null,
}));

describe("TaskItem Component", () => {
  const task = {
    _id: "1",
    title: "Test Task",
    description: "This is a test task",
    startDate: "2023-07-17",
    endDate: "2023-07-18",
    duration: 1,
    responsible: "John Doe",
    status: "to do",
  };

  const onEdit = jest.fn();
  const onDelete = jest.fn();

  it("renders task details correctly", () => {
    render(<TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByTestId("task-title")).toHaveTextContent("Test Task");
    expect(screen.getByTestId("task-description")).toHaveTextContent(
      "This is a test task"
    );
    expect(screen.getByTestId("task-start-date")).toHaveTextContent(
      "Début : 17/07/2023"
    );
    expect(screen.getByTestId("task-end-date")).toHaveTextContent(
      "Fin : 18/07/2023"
    );
    expect(screen.getByTestId("task-duration")).toHaveTextContent(
      "Durée : 1 jours"
    );
    expect(screen.getByTestId("task-responsible")).toHaveTextContent(
      "Responsable : John Doe"
    );
    expect(screen.getByText("to do")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId("edit-button"));
    expect(onEdit).toHaveBeenCalled();
  });

  it("shows modal when delete button is clicked", () => {
    render(<TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId("delete-button"));
    expect(screen.getByText("Confirmer la suppression")).toBeInTheDocument();
    expect(
      screen.getByText("Êtes-vous sûr de vouloir supprimer cette tâche ?")
    ).toBeInTheDocument();
  });

  it("calls onDelete when confirm delete button is clicked", () => {
    render(<TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId("delete-button"));
    fireEvent.click(screen.getByTestId("confirm-delete-button"));
    expect(onDelete).toHaveBeenCalled();
  });

  it("closes modal when cancel delete button is clicked", () => {
    render(<TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId("delete-button"));
    fireEvent.click(screen.getByTestId("cancel-delete-button"));
    expect(
      screen.queryByText("Confirmer la suppression")
    ).not.toBeInTheDocument();
  });
});
