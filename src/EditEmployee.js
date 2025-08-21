import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "./lib/apiClient";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job_titles, setJobTitles] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
const [job_title_id, setSelectedJobId] = useState(null);
const [role_id, setRoleId] = useState(null);
  const [role_display_name, setrole_display_name] = useState("");
  const [job_display_name, setJobDisplayName] = useState("");
  const [errors, setErrors] = useState({ name: "", role_display_name: "" });

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = savedEmployees.find((e) => e.id === parseInt(id));

    if (emp) {
      setEmployee(emp);
      setName(emp.name || "");
      setrole_display_name(emp.role_display_name || emp.position || "");
    }
  }, [id]);

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    if (field === "name") {
      newErrors.name = value.trim() ? "" : "Name is required";
    }
    if (field === "role_display_name") {
      newErrors.role_display_name = value.trim() ? "" : "Job title is required";
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    validateField("name", name);
    validateField("role_display_name", role_display_name);
    return name.trim() && role_display_name.trim();
  };

  const showProfile = async () => {
    setIsLoading(true);
    const res = await apiRequest(`/api/employee-profile/${id}`, {
      method: "GET",
    });

    if (res.result.data.role) {
      const role = res.result.data.role;
      setRoleId(role.id);
      getJobs(role.id);
    } else {
      setMessage({
        text:
          typeof res.message === "string" ? res.message : "فشل في جلب البيانات",
        type: "error",
      });
    }
    setIsLoading(false);
  };

  // جلب قائمة الوظائف المرتبطة بالدور المختار
  const getJobs = async (roleId) => {
    setIsLoading(true);

    const res = await apiRequest(`/api/job-titles/${roleId}`, {
      method: "GET",
    });
    console.log("🎯 Job titles from API:", res.result.job_titles);

    if (res.result.job_titles) {
      setJobTitles(res.result.job_titles);
    } else {
      setMessage({
        text:
          typeof res.message === "string" ? res.message : "فشل في جلب البيانات",
        type: "error",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    showProfile();
  }, []);
  
  useEffect(() => {
    setSelectedJobId(job_title_id);
     console.log("selected_job_id in use ee");
 console.log(job_title_id);

  }, []);

  const updateEmployee = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    setIsLoading(true);
    console.log("body");
    console.log(JSON.stringify({ name, job_title_id }));
    const res = await apiRequest(`/api/updateemployee/${id}`, {
      method: "POST",
      
      body: JSON.stringify({ name, job_title_id }),
      
    });
 console.log(res.result);
    setIsLoading(false);

    if (res.status === true) {
      setMessage({ text: "تم تعديل المعلومات بنجاح", type: "success" });
      alert(" Update successfully");
      navigate("/Dashboard/EmployeeManagement");
    } else {
      setMessage({ text: res.result || "فشل في التحديث", type: "error" });
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      {/* <h2>Edit  Employee</h2> */}
      <h2>Edit Employee</h2>

      <div style={{ margin: "auto", maxWidth: "400px", textAlign: "left" }}>
        <label>
          <strong>Name:</strong>
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
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <label>
          <strong>Job Title:</strong>
        </label>
        <select
          value={job_display_name}
          onChange={(e) => {
           const foundJob = job_titles.find(job => job.display_name === e.target.value);
                   console.log(job_title_id);

           setSelectedJobId(foundJob.id);
           console.log(job_title_id);
           console.log("foundJobId");

              setJobDisplayName(e.target.value)
          }}
          style={inputStyle}
        >
          {job_titles.map((job) => (
            <option key={job.id} value={job.display_name}>
              {job.display_name}
            </option>
          ))}

        </select>

        {errors.job_display_name && (
          <p style={{ color: "red" }}>{errors.job_display_name}</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={updateEmployee}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            background: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Saving..." : "💾 Save Changes"}
        </button>
      </div>

      {message.text && (
        <p
          style={{
            color: message.type === "error" ? "red" : "green",
            marginTop: "15px",
          }}
        >
          {message.text}
        </p>
      )}
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

export default EditEmployee;
