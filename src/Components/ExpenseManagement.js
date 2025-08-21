import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineDollar } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // أضف هذا
const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
const [showConfirm, setShowConfirm] = useState(false);
const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const navigate = useNavigate(); // ثم استخدمه هنا

  const goToAddExpense = () => {
    navigate("/add-expense"); // هذا المسار يجب أن يتطابق مع Route
  };
  const handleEditExpense = (id) => {
    const expense = expenses.find((exp) => exp.id === id);
    if (!expense) return;

    const type = prompt("Enter new type (coffee or others):", expense.type);
    const amount = prompt("Enter new amount:", expense.amount);
    const date = prompt("Enter new date (YYYY-MM-DD):", expense.date);
    const description = prompt("Enter new description:", expense.description);

    if (type && amount && date && description) {
      const updatedExpense = {
        ...expense,
        type,
        amount: parseFloat(amount),
        date,
        description,
      };

      const updatedExpenses = expenses.map((exp) =>
        exp.id === id ? updatedExpense : exp
      );
      setExpenses(updatedExpenses);
    } else {
      alert("All fields are required for editing.");
    }
  };

 const handleDeleteExpense = (id) => {
  setSelectedExpenseId(id);
  setShowConfirm(true);
};
const confirmDelete = () => {
  const updated = expenses.filter(e => e.id !== selectedExpenseId);
  setExpenses(updated);
  localStorage.setItem("expenses", JSON.stringify(updated));
  setShowConfirm(false);
  setSelectedExpenseId(null);
};


  return (
    <div
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}
    >
      {/* Add Expense Button */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <button
          onClick={goToAddExpense}
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
            padding: "0 10px 0 20px",
            border: "none",
            transition: "background-color 0.3s ease",
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
          <CiCirclePlus
            style={{ width: "20px", height: "20px", marginLeft: "16px" }}
          />
          Add Expenses
        </button>
      </div>

      {/* Table Header */}
      <div
        style={{
          width: "120%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 2fr 140px",
          backgroundColor: "#E5E7EB",
          padding: "8px 10px",
          fontWeight: "bold",
          border: "1px solid #e0e0e0",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        <div>Type</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Description</div>
        <div>Actions</div>
      </div>

      {/* Table Content */}
      <div
        style={{
          width: "120%",
          border: "1px solid #e0e0e0",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {expenses.map((expense) => (
          <div
            key={expense.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 2fr 140px",
              padding: "8px 10px",
              textAlign: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <div>{expense.type}</div>
            <div>{expense.amount}</div>
            <div>{expense.date}</div>
            <div>{expense.description}</div>
            <div
              style={{ display: "flex", gap: "6px", justifyContent: "center" }}
            >
    <button
  onClick={() => navigate(`/edit-expense/${expense.id}`)}
  style={{
    padding: "4px 8px",
    backgroundColor: "white",
    color: "#3B82F6", // أزرق
    border: "1px solid #3B82F6",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#EFF6FF"; // خلفية خفيفة عند hover
    e.currentTarget.style.color = "#2563EB"; // أزرق غامق
    e.currentTarget.style.borderColor = "#2563EB";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "white";
    e.currentTarget.style.color = "#3B82F6";
    e.currentTarget.style.borderColor = "#3B82F6";
  }}
>
  Edit
</button>



              <button
                onClick={() => handleDeleteExpense(expense.id)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  color: "#EF4444",
                  border: "1px solid #EF4444",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                Delete
              </button>
              {showConfirm && (
  <div style={{
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  }}>
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      minWidth: "300px",
      textAlign: "center"
    }}>
      <p> ?Are you sure you want to delete this expense</p>
      <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={confirmDelete}
          style={{
            backgroundColor: "#EF4444",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Yes
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          style={{
            backgroundColor: "#ccc",
            color: "black",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseManagement;
