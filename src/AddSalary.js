// src/pages/AddSalary.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const navigate = useNavigate();
  const [salary, setSalary] = useState({
    employeeName: "",
    baseSalary: "",
    totalHours: "",
    overtime: "",
    deductions: "",
    bonuses: "",
    points: "",
    finalSalary: ""
  });

  const handleChange = (field, value) => {
    setSalary(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSalary = () => {
    const savedSalaries = JSON.parse(localStorage.getItem("salaries")) || [];
    const newSalary = {
      ...salary,
      id: Date.now(),
      baseSalary: parseFloat(salary.baseSalary),
      totalHours: parseFloat(salary.totalHours),
      overtime: parseFloat(salary.overtime),
      deductions: parseFloat(salary.deductions),
      bonuses: parseFloat(salary.bonuses),
      points: parseInt(salary.points),
      finalSalary: parseFloat(salary.finalSalary),
    };
    savedSalaries.push(newSalary);
    localStorage.setItem("salaries", JSON.stringify(savedSalaries));
    alert("✅ Salary added successfully!");
    navigate("/Dashboard/SalaryManagement");
  };

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Add New Salary</h2>
      <div style={{ margin: "auto", maxWidth: "400px", textAlign: "left" }}>
        <label><strong>Employee Name:</strong></label>
        <input
          type="text"
          value={salary.employeeName}
          onChange={e => handleChange("employeeName", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Base Salary:</strong></label>
        <input
          type="number"
          value={salary.baseSalary}
          onChange={e => handleChange("baseSalary", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Total Hours:</strong></label>
        <input
          type="number"
          value={salary.totalHours}
          onChange={e => handleChange("totalHours", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Overtime:</strong></label>
        <input
          type="number"
          value={salary.overtime}
          onChange={e => handleChange("overtime", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Deductions:</strong></label>
        <input
          type="number"
          value={salary.deductions}
          onChange={e => handleChange("deductions", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Bonuses:</strong></label>
        <input
          type="number"
          value={salary.bonuses}
          onChange={e => handleChange("bonuses", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Points:</strong></label>
        <input
          type="number"
          value={salary.points}
          onChange={e => handleChange("points", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Final Salary:</strong></label>
        <input
          type="number"
          value={salary.finalSalary}
          onChange={e => handleChange("finalSalary", e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={saveSalary}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          ➕ Add Salary
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

export default AddSalary;
