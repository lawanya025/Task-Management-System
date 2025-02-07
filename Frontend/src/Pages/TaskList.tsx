import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../components/NavBar";

interface Tasks {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Due";
}

const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; 

// Initial tasks (Hardcoded)
const initialTasks: Tasks[] = [
];

const TaskList = () => {
  const [tasks, setTasks] = useState<Tasks[]>(initialTasks);
  const [filter, setFilter] = useState({
    status: "",
    priority: "",
    search: "",
  });
  const [editingTask, setEditingTask] = useState<Tasks | null>(null); 
  const navigate = useNavigate();

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
          id: task.id, 
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

      <div className="d-flex justify-content-center align-items-center bg-dark p-2 mb-5">
        <div className="form-floating me-3">
          <input
            type="text"
            className="form-control"
            id="searchTask"
            placeholder="Enter task name"
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <label htmlFor="searchTask">Search Task</label>
        </div>

        <div className="form-floating me-3">
          <select
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
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

        <div className="form-floating me-3">
          <select
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
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
      </div>
      {/* Calender Section */}
      <div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-3">
        {/* Task Section */}
        <div className="d-flex justify-content-start align-items-start flex-wrap">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              return (
                <div className="card w-auto me-5 mb-5" key={task.id}>
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
                    <div className="d-flex ">
                      <button
                        className="btn btn-dark card-link me-3"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>

                      {/* Form for Delete Action */}
                      <form onSubmit={(e) => handleDeleteTasks(e, task)}>
                        <button type="submit" className="btn btn-dark">
                          Delete
                        </button>
                      </form>
                    </div>

                    {editingTask && editingTask.id === task.id && (
                      <div className="mt-2">
                        <form onSubmit={(e) => handleUpdateTasks(e, task)}>
                          <div className="form-floating mb-3">
                            <select
                              value={editingTask.status}
                              onChange={(e) =>
                                setEditingTask({
                                  ...editingTask,
                                  status: e.target.value,
                                })
                              }
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

                          <div className="form-floating mb-3">
                            <select
                              value={editingTask.priority}
                              onChange={(e) =>
                                setEditingTask({
                                  ...editingTask,
                                  priority: e.target.value,
                                })
                              }
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

                          <button type="submit" className="btn btn-dark">
                            Save Changes
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No tasks found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;
