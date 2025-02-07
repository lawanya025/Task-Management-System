import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const AddTask: React.FC = () => {
  const [name, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("In Progress");
  const navigate = useNavigate();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      name: name,
      description,
      dueDate,
      priority,
      status,
    };

    try {
      const response = await fetch("http://localhost:5194/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log("Task added successfully");
        navigate("/task-list"); // Redirect to task list after success
      } else {
        console.error("Failed to add task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div id="authContainer" className="ms-auto me-auto text-center add-task-container">
        <h1>Add Task</h1>

        <div id="authFormContainer" className="ms-auto me-auto">
          <form onSubmit={handleAddTask}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="taskName"
                placeholder="name@example.com"
                value={name}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label htmlFor="taskName">Task Title</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Leave a descritpion"
                id="taskDescription"
                rows={4}
              ></textarea>
              <label htmlFor="taskDescription">Description</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="dueDate"
                placeholder="Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <label htmlFor="taskName">Due Date</label>
            </div>

            <div className="form-floating mb-3">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
                id="priority"
                aria-label="Floating label select example"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <label htmlFor="priority">Priority</label>
            </div>

            <div className="form-floating mb-3">
              <select
                 value={status}
                 onChange={(e) => setStatus(e.target.value)}
                className="form-select"
                id="status"
                aria-label="Floating label select example"
              >
                <option>Due</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <label htmlFor="status">Status</label>
            </div>

          
            <button
              type="submit"
              className="btn btn-dark w-100"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
