import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import TodoPage from "../TodoPage";

describe("TodoPage", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should render TodoPage and fetch tasks", async () => {
    const mockTasks = [
      {
        _id: "1",
        title: "Task 1",
        description: "",
        startDate: "",
        endDate: "",
        duration: 0,
        responsible: "",
        status: "to do",
      },
    ];
    mock.onGet("http://localhost:3000/tasks").reply(200, mockTasks);

    render(<TodoPage />);

    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
    });
  });

  it("should add a new task", async () => {
    const mockTasks = [
      {
        _id: "1",
        title: "Task 1",
        description: "",
        startDate: "",
        endDate: "",
        duration: 0,
        responsible: "",
        status: "to do",
      },
    ];
    mock.onGet("http://localhost:3000/tasks").reply(200, mockTasks);
    mock
      .onPost("http://localhost:3000/tasks")
      .reply(201, { _id: "2", title: "New Task" });

    render(<TodoPage />);

    fireEvent.click(screen.getByText(/ajouter/i));
    fireEvent.change(screen.getByPlaceholderText(/titre/i), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByText(/créer la tâche/i));

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });
});
