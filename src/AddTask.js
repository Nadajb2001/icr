import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");

  // تحميل المشاريع والموظفين من localStorage
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
    setProjects(storedProjects);
    setEmployees(storedEmployees);
  }, []);

  const handleAddTask = () => {
    if (!selectedProject || !selectedEmployee || !title || !description || !date || !hours) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // الحصول على اسم المشروع والموظف من القائمة
    const projectObj = projects.find((proj) => proj.id === parseInt(selectedProject));
    const employeeObj = employees.find((emp) => emp.id === parseInt(selectedEmployee));

    const newTask = {
      id: Date.now(),
      projectId: selectedProject,
      projectName: projectObj ? projectObj.name : "",
      employeeId: selectedEmployee,
      employeeName: employeeObj ? employeeObj.name : "",
      employeeJobTitle: employeeObj ? employeeObj.position : "",
      title,
      description,
      date,
      hours
    };

    localStorage.setItem("tasks", JSON.stringify([...savedTasks, newTask]));

    alert("task added successfully!");
    navigate("/Dashboard/TaskManagement");
  };

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Add Task</h2>
      <div style={{ margin: "auto", maxWidth: "400px", textAlign: "left" }}>

        {/* اختيار المشروع */}
        <label><strong>Project:</strong></label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Project</option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>{proj.name}</option>
          ))}
        </select>

        {/* اختيار الموظف */}
        <label><strong>Assign To Employee:</strong></label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Employee </option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} - {emp.position}
            </option>
          ))}
        </select>

        {/* باقي الحقول */}
        <label><strong>Title:</strong></label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <label><strong>Description:</strong></label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />

        <label><strong>Date:</strong></label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <label><strong>Hours:</strong></label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={inputStyle}
        />

      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          onClick={handleAddTask}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          ➕ Add Task
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "15px",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "white",
  color: "black"
};

export default AddTask;
