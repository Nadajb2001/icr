import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/apiClient";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const navigate = useNavigate();

  const tdStyle = {
    padding: "14px 40px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "none",
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await apiRequest("/api/tasks", { method: "GET" });

    if (res.status && res.result?.tasks) {
      setTasks(res.result.tasks);
      setMessage({ text: "تم جلب المهام بنجاح", type: "success" });
    } else {
      setMessage({ text: "فشل في جلب المهام", type: "error" });
    }
  };

  const handleEditTask = (id) => navigate(`/edit-task/${id}`);

  const confirmDeleteTask = async () => {
    await apiRequest(`/api/tasks/${selectedTaskId}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((task) => task.id !== selectedTaskId));
    setShowConfirm(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}
    >
      <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
        <button
          onClick={() => navigate("/add-task")}
          style={{
            width: "200px",
            background: "#9333EA",
            color: "white",
            borderRadius: "8px",
            height: "40px",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            transition: "0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#805AD5";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#9333EA";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Add Task
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr style={{ background: "#E5E7EB", fontWeight: "bold" }}>
            <th style={{ padding: "14px 40px" }}>Project Name</th>
            <th style={{ padding: "14px 40px" }}>Title</th>
            <th style={{ padding: "14px 40px" }}>Description</th>
            <th style={{ padding: "14px 40px", minWidth: "140px" }}>Date</th>
            <th style={{ padding: "14px 40px" }}>Hours</th>
            <th style={{ padding: "14px 20px", minWidth: "160px" }}>
              Assigned Employees
            </th>
            <th style={{ padding: "14px 40px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              style={{
                textAlign: "center",
                background: "white",
                lineHeight: "1.2",
              }}
            >
              <td style={tdStyle}>{task.projectName}</td>
              <td style={tdStyle}>{task.title}</td>
              <td style={tdStyle}>{task.description}</td>
              <td style={tdStyle}>{task.date}</td>
              <td style={tdStyle}>{task.hours}</td>
              <td style={{ padding: "14px 20px" }}>
                <select>
                  <option>
                    {task.employeeName} {task.employeeJobTitle}
                  </option>
                </select>
              </td>
              <td style={{ padding: "14px 40px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <button
                    onClick={() => handleEditTask(task.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "white",
                      color: "#3B82F6",
                      border: "1px solid #3B82F6",
                      borderRadius: "6px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirm(true);
                      setSelectedTaskId(task.id);
                    }}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "white",
                      color: "#EF4444",
                      border: "1px solid #EF4444",
                      borderRadius: "6px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <p>Are you sure you want to delete this task?</p>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={confirmDeleteTask}
                style={{
                  backgroundColor: "#EF4444",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  backgroundColor: "#ccc",
                  color: "black",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
