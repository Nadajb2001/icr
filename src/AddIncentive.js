import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getEmpLabel = (emp) => {
  if (!emp) return "Unknown Member";
  const name =
    emp.name ?? emp.fullName ?? emp.employeeName ?? "Unknown";
  const position =
    emp.position ?? emp.jobTitle ?? emp.title ?? emp.role ?? "";
  return position ? `${name} (${position})` : name;
};

const AddIncentive = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [incentive, setIncentive] = useState({
    employeeIds: [],
    incentiveAmount: "",
    incentiveReason: "",
    date: ""
  });

  // تحميل بيانات الموظفين
  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    }
  }, []);

  const handleChange = (field, value) => {
    setIncentive((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (e) => {
    const selectedIds = Array.from(
      e.target.selectedOptions,
      (option) => String(option.value)
    );
    setIncentive((prev) => ({
      ...prev,
      employeeIds: selectedIds
    }));
  };

  const saveIncentive = () => {
    const { employeeIds, incentiveAmount, incentiveReason, date } = incentive;

    if (
      employeeIds.length === 0 ||
      !incentiveAmount ||
      !incentiveReason ||
      !date
    ) {
      alert("⚠️ Please fill out all fields and select at least one employee.");
      return;
    }

    const savedIncentives =
      JSON.parse(localStorage.getItem("incentives")) || [];

    const newIncentive = {
      ...incentive,
      employeeIds: employeeIds.map((id) => String(id)), // توحيد النوع
      id: Date.now(),
      incentiveAmount: parseFloat(incentiveAmount),
      date: new Date(date).toISOString()
    };

    savedIncentives.push(newIncentive);
    localStorage.setItem("incentives", JSON.stringify(savedIncentives));

    alert("✅ Incentive added successfully!");
    // عدّل المسار حسب تطبيقك
    navigate("/Dashboard/IncentivesManagement");
  };

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Add New Incentive</h2>
      <div style={{ margin: "auto", maxWidth: "400px", textAlign: "left" }}>
        <label><strong>Employees (Select Multiple):</strong></label>
        <select
          multiple
          value={incentive.employeeIds}
          onChange={handleMultiSelectChange}
          style={{ ...inputStyle, height: "120px" }}
        >
          {employees.map((emp) => (
            <option key={emp.id} value={String(emp.id)}>
              {getEmpLabel(emp)}
            </option>
          ))}
        </select>

        <label><strong>Incentive Amount:</strong></label>
        <input
          type="number"
          value={incentive.incentiveAmount}
          onChange={(e) => handleChange("incentiveAmount", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Reason:</strong></label>
        <input
          type="text"
          value={incentive.incentiveReason}
          onChange={(e) => handleChange("incentiveReason", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Date:</strong></label>
        <input
          type="date"
          value={incentive.date}
          onChange={(e) => handleChange("date", e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={saveIncentive}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          ➕ Add Incentive
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

export default AddIncentive;
