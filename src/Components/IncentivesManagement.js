import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const getEmpLabel = (emp) => {
  if (!emp) return "Unknown Member";
  const name =
    emp.name ?? emp.fullName ?? emp.employeeName ?? "Unknown";
  const position =
    emp.position ?? emp.jobTitle ?? emp.title ?? emp.role ?? "";
  return position ? `${name} (${position})` : name;
};

const IncentivesManagement = () => {
  const [incentives, setIncentives] = useState(() => {
    const saved = localStorage.getItem("incentives");
    return saved ? JSON.parse(saved) : [];
  });

  const [employees, setEmployees] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  // حفظ التغييرات على المكافآت
  useEffect(() => {
    localStorage.setItem("incentives", JSON.stringify(incentives));
  }, [incentives]);

  // تحميل الموظفين مرة واحدة
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    setEmployees(storedEmployees ? JSON.parse(storedEmployees) : []);
  }, []);

  const goToAddIncentive = () => {
    navigate("/add-incentive");
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    const updated = incentives.filter((i) => i.id !== selectedId);
    setIncentives(updated);
    setShowConfirm(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  return (
    <div style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}>
      {/* Add Incentive Button */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <button
          onClick={goToAddIncentive}
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
        >
          <CiCirclePlus style={{ width: "20px", height: "20px", marginLeft: "16px" }} />
          Add Incentive
        </button>
      </div>

      {/* Table Header */}
      <div style={{
        width: "120%",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 2fr 1fr 140px",
        backgroundColor: "#E5E7EB",
        padding: "8px 10px",
        fontWeight: "bold",
        border: "1px solid #e0e0e0",
        borderRadius: "8px 8px 0 0",
        textAlign: "center",
        fontSize: "14px",
      }}>
        <div>Employee</div>
        <div>Amount</div>
        <div>Reason</div>
        <div>Date</div>
        <div>Actions</div>
      </div>

      {/* Table Content */}
      <div style={{
        width: "120%",
        border: "1px solid #e0e0e0",
        borderTop: "none",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}>
        {incentives.map((incentive) => (
          <div key={incentive.id} style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr 1fr 140px",
            padding: "8px 10px",
            textAlign: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderBottom: "1px solid #f0f0f0",
            fontSize: "14px",
          }}>
            {/* Dropdown showing employee(s) */}
            <div style={{ padding: "0 4px" }}>
             <select style={{ width: "60%", padding: "2px", borderRadius: "6px" }}>

                {(incentive.employeeIds || []).map((memberId) => {
                  const emp = employees.find((e) => String(e.id) === String(memberId));
                  return (
                    <option key={memberId}>
                      {getEmpLabel(emp)}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>{incentive.incentiveAmount}</div>
            <div>{incentive.incentiveReason}</div>
            <div>{new Date(incentive.date).toLocaleDateString()}</div>

            <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
              <button
                onClick={() => navigate(`/edit-incentive/${incentive.id}`)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  color: "#3B82F6",
                  border: "1px solid #3B82F6",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(incentive.id)}
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
            </div>
          </div>
        ))}
      </div>

      {/* Delete  Modal */}
      {showConfirm && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "300px",
            textAlign: "center",
          }}>
            <p>Are you sure you want to delete this incentive?</p>
            <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={confirmDelete}
                style={{
                  backgroundColor: "#EF4444",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  backgroundColor: "#ccc",
                  color: "black",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncentivesManagement;
