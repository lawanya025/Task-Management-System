import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaHome, FaPlus, FaList, FaCog, FaSignOutAlt } from "react-icons/fa";
import Navbar from "../components/NavBar";

interface Tasks {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Due";
}

const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; // Colors for Completed, In Progress, Due

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  // Initial tasks (Hardcoded)
  const initialTasks: Tasks[] = [
  ];

  const [tasks, setTasks] = useState<Tasks[]>(initialTasks);
  const [filter, setFilter] = useState({
    status: "",
    priority: "",
    search: "",
  });
  const [editingTask, setEditingTask] = useState<Tasks | null>(null); 

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5194/api/tasks");
        if (response.ok) {
          const data = await response.json();
          setTasks([...initialTasks, ...data]); // Merge initial tasks with fetched tasks
        } else {
          console.error("Failed to fetch tasks.");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTasks = async (e: React.FormEvent, task: Tasks) => {
    e.preventDefault(); 

    try {
      const response = await fetch("http://localhost:5194/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id, // Sending the task id to be deleted
        }),
      });

      if (response.ok) {
        console.log("Task deleted successfully");
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id)); 
      } else {
        const errorText = await response.text(); 
        console.error("Failed to delete task:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTasks = async (e: React.FormEvent, task: Tasks) => {
    e.preventDefault(); 

    if (!editingTask) return;

    try {
      const response = await fetch(
        `http://localhost:5194/api/tasks/${editingTask.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingTask.id, 
            status: editingTask.status,
            priority: editingTask.priority,
          }),
        }
      );

      if (response.ok) {
        console.log("Task updated successfully");

        // Update the task in the state with the updated data
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === task.id ? { ...task, ...editingTask } : task
          )
        );

        setEditingTask(null); 
      } else {
        const errorText = await response.text(); 
        console.error("Failed to update task:", errorText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filter.status
        ? task.status.toLowerCase().includes(filter.status.toLowerCase())
        : true) &&
      (filter.priority
        ? task.priority.toLowerCase().includes(filter.priority.toLowerCase())
        : true) &&
      (filter.search
        ? task.name.toLowerCase().includes(filter.search.toLowerCase())
        : true)
  );

  const taskCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(taskCounts).map((status) => ({
    name: status,
    value: taskCounts[status],
  }));

  const handleEdit = (task: Tasks) => {
    setEditingTask(task); 
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-3">Welcome to Your Task Manager</h1>
        <p className="mt-1 text-center">
          Manage your tasks efficiently and stay organized.
        </p>
      </div>
      <div className="d-flex justify-content-between align-items-start p-3">
        {/* Task Section */}
        <div>
          <div className="d-flex justify-content-start align-items-start flex-wrap">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                return (
                  <div className="card w-auto me-5 mb-3" key={task.id}>
                    <div className="card-body">
                      <h5 className="card-title">{task.name}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${
                      task.status === "Completed"
                        ? "bg-success text-light"
                        : task.status === "In Progress"
                        ? "bg-warning text-light"
                        : "bg-danger text-light"
                    }`}
                        >
                          {task.status}
                        </span>
                      </h6>
                      <p className="card-text">{task.description}</p>
                      <p className="card-text">
                        Due: {task.dueDate.toString().split("T")[0]} | Priority: {task.priority}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No tasks found.</p>
            )}
          </div>
        </div>
        {/* Calender Section */}
        <div>
          <h5 className="text-center mb-3">Calender</h5>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
