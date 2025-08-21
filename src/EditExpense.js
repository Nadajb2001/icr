
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const allExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const foundExpense = allExpenses.find(e => e.id === parseInt(id));
    setExpense(foundExpense || null);
  }, [id]);

  const handleChange = (field, value) => {
    setExpense(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const allExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const updated = allExpenses.map(e =>
      e.id === parseInt(id) ? { ...expense } : e
    );
    localStorage.setItem("expenses", JSON.stringify(updated));
    alert("✅ Expense updated successfully!");
    navigate("/expenses"); // عدل هذا حسب المسار الصحيح لقائمة المصاريف
  };

  if (!expense) return <div>Loading...</div>;

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Edit Expense</h2>
      <div style={{ margin: "auto", maxWidth: "500px", textAlign: "left" }}>
        <label><strong>Type:</strong></label>
        <select
          value={expense.type}
          onChange={e => handleChange("type", e.target.value)}
          style={inputStyle}
        >
          <option value="coffee">☕ Coffee</option>
          <option value="others">📦 Others</option>
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
        <textarea
          value={expense.description}
          onChange={e => handleChange("description", e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 20px",
            background: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          💾 Save Changes
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

export default EditExpense;
