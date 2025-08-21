import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const SalaryManagement = () => {
  const [searchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  
  const [salaries, setSalaries] = useState(() => {
    const savedSalaries = localStorage.getItem("salaries");
    return savedSalaries ? JSON.parse(savedSalaries) : [];
  });
const [showConfirm, setShowConfirm] = useState(false);
const [selectedSalaryId, setSelectedSalaryId] = useState(null);
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const storedSalaries = JSON.parse(localStorage.getItem("salaries")) || [];
    setEmployees(storedEmployees);
    setSalaries(storedSalaries);
    setFilteredSalaries(storedSalaries);
  }, []);
  const navigate = useNavigate();
  const [filteredSalaries, setFilteredSalaries] = useState(salaries);

const handleDeleteSalary = (id) => {
  setSelectedSalaryId(id);
  setShowConfirm(true);
};
const confirmDelete = () => {
  const updated = salaries.filter(s => s.id !== selectedSalaryId);
  setSalaries(updated);
  setFilteredSalaries(updated);
  localStorage.setItem("salaries", JSON.stringify(updated));
  setShowConfirm(false);
  setSelectedSalaryId(null);
};




  const addSalary = () => {
    const employeeName = prompt("Enter Name:");
    const baseSalary = parseFloat(prompt("Enter base salary:") || 0);
    const totalHours = parseFloat(prompt("Enter total hours:") || 0);
    const overtime = parseFloat(prompt("Enter overtime hours:") || 0);
    const deductions = parseFloat(prompt("Enter deductions:") || 0);
    const bonuses = parseFloat(prompt("Enter bonuses:") || 0);
    const points = parseInt(prompt("Enter points:") || 0);

    const finalSalary = baseSalary + overtime * 10 + bonuses - deductions;

    if (employeeName) {
      const newSalary = {
        id: Math.max(0, ...salaries.map((s) => s.id)) + 1,
        employeeName,
        baseSalary,
        totalHours,
        overtime,
        deductions,
        bonuses,
        points,
        finalSalary,
      };

      const updated = [...salaries, newSalary];
      setSalaries(updated);
      setFilteredSalaries(updated);
      localStorage.setItem("salaries", JSON.stringify(updated));
      console.log("Added new salary:", newSalary);
    } else {
      console.log("Name is required.");
    }
  };



  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}
    >
     
      

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
          marginTop: "15px",
        }}
      >
        <button
          onClick={() => navigate("/add-salary")}
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
            padding: "0 16px",
            transition: "background-color 0.3s ease",
            border: "none",
            margin: "10px",
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
          Add Salary
        </button>
      </div>

      {/* Table header */}
      <div
        style={{
          width: "120%",
          marginTop: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          backgroundColor: "#f5f5f5",
          padding: "8px 10px",
          fontWeight: "bold",
          border: "1px solid #e0e0e0",
          borderRadius: "8px 8px 0 0",
          background: "#E5E7EB",
          textAlign: "center",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        <div>Name</div>
        <div>Base Salary</div>
        <div>Total Hours</div>
        <div>Overtime</div>
        <div>Deductions</div>
        <div>Bonuses</div>
        <div>Points</div>
        <div>Final Salary</div>
        <div>Action</div>
      </div>

      {/* Table content */}
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
        {filteredSalaries
          .filter((s) =>
            s.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((salary) => (
            <div
              key={salary.id}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(9, 1fr)",
                padding: "8px 10px",
                textAlign: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderBottom: "1px solid #f0f0f0",
                fontSize: "14px",
              }}
            >
              <div>{salary.employeeName}</div>
              <div>{salary.baseSalary} </div>
              <div>{salary.totalHours}</div>
              <div>{salary.overtime}</div>
              <div>{salary.deductions} </div>
              <div>{salary.bonuses} </div>
              <div>{salary.points}</div>
              <div>{salary.finalSalary} </div>
              <div>
                <button
                  onClick={() => handleDeleteSalary(salary.id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "white",
                    color: "#EF4444",
                    border: "1px solid #EF4444",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FEF2F2";
                    e.currentTarget.style.color = "#DC2626";
                    e.currentTarget.style.borderColor = "#DC2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#EF4444";
                    e.currentTarget.style.borderColor = "#EF4444";
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
      <p> ?Are you sure you want to delete this salary</p>
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

export default SalaryManagement;
