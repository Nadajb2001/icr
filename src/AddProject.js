import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "./lib/apiClient";
const AddProject = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [status, setStatus] = useState("");
  const [budget, setBudget] = useState("");
  const [client_name, setClient_name] = useState("");
 const [team_members_ids, setTeamwork] = useState([]); 
 const [project_manager_id, setProject_manager] = useState("4"); 
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
    budget: "",
    client_name: "",
    teamwork: "",
    project_manager:"",
  });
 
  const validateField = (field, value) => {
    const newErrors = { ...errors };
    if (field === "name") {
      newErrors.email = value.trim() ? "" : "Name is required";
    }
    if (field === "description") {
      newErrors.password = value.trim() ? "" : "Description is required";
    }
    if (field === "start_date") {
      newErrors.password = value.trim() ? "" : "start_date is required";
    }
    if (field === "end_date") {
      newErrors.password = value.trim() ? "" : "end_date is required";
    }
    if (field === "status") {
      newErrors.password = value.trim() ? "" : "status is required";
    }
    if (field === "budget") {
      newErrors.password = value.trim() ? "" : "budget is required";
    }
    if (field === "client_name") {
      newErrors.password = value.trim() ? "" : "client_name is required";
    }
 if (field === "project_manager") {
      newErrors.password = value.trim() ? "" : "project_manager is required";
    }
    setErrors(newErrors);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    setIsLoading(true);

    try {
      const res = await apiRequest("/api/projects/createProject", {
        method: "POST",
        body: JSON.stringify({ name, description, start_date,end_date,status ,budget,client_name,team_members_ids,project_manager_id}),
      });

      if (res.status === true) {
        setMessage({ text: "تم إضافة المشروع بنجاح", type: "success" });
       alert(" project added successfully!");
       console.log(res.result);
      navigate('/Dashboard/ProjectManagement') ;
      
      } else {
        setMessage({
          text: res.result || "فشل في إضافة المشروع",
          type: "error",
        });
            alert("Falid to add  project ");
      }
    } catch (error) {
      setMessage({ text: "حدث خطأ في الاتصال بالخادم", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Add New Project</h2>
      <div style={{ margin: "auto", maxWidth: "500px", textAlign: "left" }}>
        <label>
          <strong>Project Name:</strong>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateField("name", e.target.value);
          }}
          style={inputStyle}
        />

        <label>
          <strong>Description:</strong>
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            validateField("description", e.target.value);
          }}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <label>
          <strong>StartDate:</strong>
        </label>
        <input
          type="date"
          value={start_date}
          onChange={(e) => {
            setStart_Date(e.target.value);
            validateField("start_date", e.target.value);
          }}
          style={inputStyle}
        />

        <label>
          <strong>end_date:</strong>
        </label>
        <input
          type="date"
          value={end_date}
          onChange={(e) => {
            setEnd_date(e.target.value);
            validateField("end_date", e.target.value);
          }}
          style={inputStyle}
        />

        <label>
          <strong>Status:</strong>
        </label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            validateField("status", e.target.value);
          }}
          style={inputStyle}
        >
          <option value="ongoing"> ongoing</option>
          <option value="completed"> completed</option>
          <option value="canceled"> Canceled</option>
        </select>
        <label>
          <strong>Budget:</strong>
        </label>
        <input
          type="number"
          value={budget}
          onChange={(e) => {
            setBudget(e.target.value);
            validateField("budget", e.target.value);
          }}
          style={inputStyle}
        />

        <label>
          <strong>Client Name:</strong>
        </label>
        <input
          type="text"
          value={client_name}
          onChange={(e) => {
            setClient_name(e.target.value);
            validateField("client_name", e.target.value);
          }}
          style={inputStyle}
        />
        <label>
          <strong>Team Work:</strong>
        </label>
        <select
          multiple
          value={team_members_ids}
          onChange={(e) => {
            const selectedIds = Array.from(e.target.selectedOptions, (option) =>
              parseInt(option.value)
            );
            setTeamwork(selectedIds);
          }}
          style={{ ...inputStyle, height: "auto", minHeight: "120px" }}
        >
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.position})
            </option>
          ))}
        </select>
            <label>
          <strong>Project_manager:</strong>
        </label>
        <input
          type="text"
          value={project_manager_id}
          onChange={(e) => {
            setProject_manager(e.target.value);
            validateField("project_manager", e.target.value);
          }}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleAddProject}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ee52a0ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          ➕ Add Project
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
  color: "black",
};

export default AddProject;
