// src/pages/AddExpense.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    type: "coffee",
    amount: "",
    date: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setExpense(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveExpense = () => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const newExpense = {
      ...expense,
      id: Date.now(),
      amount: parseFloat(expense.amount),
    };

    savedExpenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));
    alert("✅ Expense added successfully!");
    navigate("/Dashboard/ExpenseManagement");
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Add New Expense</h2>
      <div style={{ margin: "auto", maxWidth: "400px", textAlign: "left" }}>
        <label><strong>Type:</strong></label>
        <select
          value={expense.type}
          onChange={e => handleChange("type", e.target.value)}
          style={inputStyle}
        >
          <option value="coffee">Coffee</option>
          <option value="others">Others</option>
        </select>

        <label><strong>Amount:</strong></label>
        <input
          type="number"
          value={expense.amount}
          onChange={e => handleChange("amount", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Date:</strong></label>
        <input
          type="date"
          value={expense.date}
          onChange={e => handleChange("date", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Description:</strong></label>
        <input
          type="text"
          value={expense.description}
          onChange={e => handleChange("description", e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={saveExpense}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          ➕ Add Expense
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

export default AddExpense;
