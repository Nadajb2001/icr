import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { apiRequest } from "./lib/apiClient";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [employee, setEmployee] = useState({
    id: Date.now(),
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    date: "",
    salary: "",
    roleId: "",
    jobTitleId: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ تحديث الحقول
  const handleChange = (field, value) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // ✅ رفع صورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployee((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ التحقق من الحقول
  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "Full name is required";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== employee.password) error = "Passwords do not match";
        break;
      case "phone":
        if (!/^\d{10,15}$/.test(value)) error = "Enter valid phone number";
        break;
      case "date":
        if (!value) error = "Hire date is required";
        break;
      case "salary":
        if (value <= 0) error = "Salary must be greater than 0";
        break;
      case "roleId":
        if (!value) error = "Role is required";
        break;
      case "jobTitleId":
        if (!value) error = "Job title is required";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    Object.keys(employee).forEach((field) =>
      validateField(field, employee[field])
    );
    return Object.values(errors).every((err) => !err);
  };

  // ✅ جلب الـ Roles
  const showProfile = async () => {
    setIsLoading(true);
    const res = await apiRequest("/api/roles", { method: "GET" });
    if (res.result?.roles) {
      setRoles(res.result.roles);
    } else {
      setMessage({
        text: typeof res.message === "string" ? res.message : "فشل في جلب الأدوار",
        type: "error",
      });
    }
    setIsLoading(false);
  };

  // ✅ جلب الـ Job Titles
  const getJobs = async (roleId) => {
    setIsLoading(true);
    const res = await apiRequest(`/api/job-titles/${roleId}`, { method: "GET" });
    if (res.result?.job_titles) {
      setJobTitles(res.result.job_titles);
    } else {
      setMessage({
        text: typeof res.message === "string" ? res.message : "فشل في جلب المسميات",
        type: "error",
      });
    }
    setIsLoading(false);
  };

  // ✅ إضافة موظف جديد
  const addEmployee = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) {
      setMessage({ text: "Please fix errors before submitting", type: "error" });
      return;
    }

    setIsLoading(true);

    const body = {
      name: employee.name,
      password: employee.password,
      phone: employee.phone,
      hire_date: employee.date,
      salary: employee.salary,
      role_id: employee.roleId,
      job_title_id: employee.jobTitleId,
      image: employee.image,
    };

    const res = await apiRequest("/api/addemployee", {
      method: "POST",
      body: JSON.stringify(body),
    });

    setIsLoading(false);

    if (res.status === true) {
      alert("✅ Employee added successfully!");
      navigate("/Dashboard/EmployeeManagement");
    } else {
      setMessage({ text: res.result || "Failed to add employee", type: "error" });
    }
  };

  useEffect(() => {
    showProfile();
  }, []);

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Add New Employee</h2>

      {/* صورة الموظف */}
      <div style={{ position: "relative", marginBottom: "20px", display: "inline-block" }}>
        <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
          <div
            style={{
              borderRadius: "50%",
              width: "140px",
              height: "140px",
              backgroundColor: "#f9f9f9",
              margin: "0 auto",
              overflow: "hidden",
              position: "relative",
              border: "3px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {employee.image ? (
              <img
                src={employee.image}
                alt="Employee"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "#888",
                }}
              >
                No Image
              </div>
            )}
            <div
              style={{
                position: "absolute",
                bottom: "6px",
                right: "6px",
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: "50%",
                padding: "6px",
              }}
            >
              <FaCamera color="#555" size={14} />
            </div>
          </div>
        </label>
        <input
          id="upload-photo"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* فورم الحقول */}
      <div style={{ margin: "auto", maxWidth: "400px", textAlign: "left" }}>
        <label><strong>Full Name:</strong></label>
        <input
          type="text"
          value={employee.name}
          onChange={(e) => handleChange("name", e.target.value)}
          style={inputStyle}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <label><strong>Password:</strong></label>
        <input
          type="password"
          value={employee.password}
          onChange={(e) => handleChange("password", e.target.value)}
          style={inputStyle}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <label><strong>Confirm Password:</strong></label>
        <input
          type="password"
          value={employee.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          style={inputStyle}
        />
        {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}

        <label><strong>Phone Number:</strong></label>
        <input
          type="text"
          value={employee.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          style={inputStyle}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

        <label><strong>Hire Date:</strong></label>
        <input
          type="date"
          value={employee.date}
          onChange={(e) => handleChange("date", e.target.value)}
          style={inputStyle}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

        <label><strong>Salary:</strong></label>
        <input
          type="number"
          value={employee.salary}
          onChange={(e) => handleChange("salary", e.target.value)}
          style={inputStyle}
        />
        {errors.salary && <p style={{ color: "red" }}>{errors.salary}</p>}

        <label><strong>Role:</strong></label>
        <select
          value={employee.roleId}
          onChange={(e) => {
            handleChange("roleId", e.target.value);
            getJobs(e.target.value);
          }}
          style={inputStyle}
        >
          <option value="">-- Select Role --</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.display_name}</option>
          ))}
        </select>
        {errors.roleId && <p style={{ color: "red" }}>{errors.roleId}</p>}

        {jobTitles.length > 0 && (
          <>
            <label><strong>Job Title:</strong></label>
            <select
              value={employee.jobTitleId}
              onChange={(e) => handleChange("jobTitleId", e.target.value)}
              style={inputStyle}
            >
              <option value="">-- Select Job Title --</option>
              {jobTitles.map((job) => (
                <option key={job.id} value={job.id}>{job.display_name}</option>
              ))}
            </select>
            {errors.jobTitleId && <p style={{ color: "red" }}>{errors.jobTitleId}</p>}
          </>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={addEmployee}
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
          {isLoading ? "Saving..." : "➕ Add Employee"}
        </button>
      </div>

      {message.text && (
        <p style={{ color: message.type === "error" ? "red" : "green", marginTop: "15px" }}>
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

export default AddEmployee;
