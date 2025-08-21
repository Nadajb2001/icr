import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "./lib/apiClient";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  // حقول المشروع
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [budget, setBudget] = useState("");
  const [team_members_ids, setTeam_members_ids] = useState([]);
  const [project_manager_id, setProject_manager_id] = useState("");
  const [end_date, setEnd_date] = useState("");

  // جلب المشروع من localStorage
useEffect(() => {
  const allProjects = JSON.parse(localStorage.getItem("projects")) || [];
  const foundProject = allProjects.find((p) => p.id === parseInt(id));

  if (foundProject) {
    setName(foundProject.name || "");
    setDescription(foundProject.description || "");
    setStatus(foundProject.status || "");
    setBudget(foundProject.budget || "");
    setEnd_date(foundProject.end_date || "");

    // ✅ إذا كان عنده team_members -> استخرج ids
    if (foundProject.team_members) {
      setTeam_members_ids(
        foundProject.team_members.map((m) => String(m.employee_id))
      );
    } else {
      setTeam_members_ids(foundProject.team_members_ids || []);
    }

    setProject_manager_id(
      foundProject.project_manager_id
        ? String(foundProject.project_manager_id)
        : ""
    );
  }

  const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
  setEmployees(storedEmployees);
}, [id]);


  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Project name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!end_date) newErrors.end_date = "End date is required.";
    if (!status) newErrors.status = "Status is required.";
    if (!budget) newErrors.budget = "Budget is required.";
    if (!team_members_ids || team_members_ids.length === 0)
      newErrors.team_members_ids = "At least one team member is required.";
    if (!project_manager_id) newErrors.project_manager_id = "Project manager is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const updateProject = async (e) => {
  e.preventDefault();
  setMessage({ text: "", type: "" });

  if (!validate()) {
    setMessage({ text: "⚠️ Please fill in all required fields", type: "error" });
    return;
  }

  setIsLoading(true);

  try {
    // جسم الطلب
    const body = {
      name,
      description,
      status,
      budget,
      end_date,
      team_members_ids,
      project_manager_id,
    };

    // إرسال للـ API
    const res = await apiRequest(`/api/projects/${id}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (res.status === true) {
      // ✅ تحديث localStorage إذا نجح
      const allProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const updated = allProjects.map((p) =>
        p.id === parseInt(id) ? { ...p, ...body } : p
      );
      localStorage.setItem("projects", JSON.stringify(updated));

      alert("✅ Project updated successfully!");
      console.log(res.result);
      navigate("/Dashboard/ProjectManagement");
    } else {
      setMessage({ text: res.result || "فشل في تعديل المشروع", type: "error" });
    }
  } catch (error) {
    console.error(error);
    setMessage({ text: "❌ حدث خطأ في الاتصال بالخادم", type: "error" });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Edit Project</h2>
      <div style={{ margin: "auto", maxWidth: "500px", textAlign: "left" }}>
        {/* Name */}
        <label><strong>Project Name:</strong></label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}

        {/* Description */}
        <label><strong>Description:</strong></label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        {errors.description && <p style={errorStyle}>{errors.description}</p>}

        {/* Status */}
        <label><strong>Status:</strong></label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="">-- Select --</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        {errors.status && <p style={errorStyle}>{errors.status}</p>}

        {/* Budget */}
        <label><strong>Budget:</strong></label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={inputStyle}
        />
        {errors.budget && <p style={errorStyle}>{errors.budget}</p>}

        {/* End Date */}
        <label><strong>End Date:</strong></label>
        <input
          type="date"
          value={end_date}
          onChange={(e) => setEnd_date(e.target.value)}
          style={inputStyle}
        />
        {errors.end_date && <p style={errorStyle}>{errors.end_date}</p>}

        {/* Team Work */}
        <label><strong>Team Work:</strong></label>
        <select
          multiple
          value={team_members_ids}
          onChange={(e) => {
            const selectedIds = Array.from(
              e.target.selectedOptions,
              (option) => parseInt(option.value)
            );
            setTeam_members_ids(selectedIds);
          }}
          style={{ ...inputStyle, height: "auto", minHeight: "120px" }}
        >
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.position})
            </option>
          ))}
        </select>
        {errors.team_members_ids && <p style={errorStyle}>{errors.team_members_ids}</p>}

        {/* Project Manager */}
        <label><strong>Project Manager:</strong></label>
        <input
          type="text"
          value={project_manager_id}
          onChange={(e) => setProject_manager_id(e.target.value)}
          style={inputStyle}
        />
        {errors.project_manager_id && <p style={errorStyle}>{errors.project_manager_id}</p>}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={updateProject}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            background: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          {isLoading ? "Saving..." : "Save Changes"}
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

const errorStyle = { color: "red", fontSize: "0.85rem" };

export default EditProject;
