import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/apiClient";
const PointsManagement = () => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem("points");
    return savedPoints ? JSON.parse(savedPoints) : [];
  });
  const [projects, setProjects] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  const savedPoints = localStorage.getItem("points");
  if (savedPoints) {
    setPoints(JSON.parse(savedPoints));
  }
}, []);


  const [selectedProjecteId, setSelectedProjecteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedProjecteId(id);
    setShowConfirm(true);
  };

  const confirmDeleteEmployee = async () => {
    if (selectedProjecteId !== null) {
      setIsLoading(true);
      try {
        const url = `/api/employee-points/${selectedProjecteId}`;
        const res = await apiRequest(url, {
          method: "DELETE",
        });

        if (res.status === true) {
       const updatedProjects = projects.filter(
    (emp) => emp.id !== selectedProjecteId
  );

  setProjects(updatedProjects);
  localStorage.setItem("employees", JSON.stringify(updatedProjects));

  const updatedPoints = points.filter((p) => p.id !== selectedProjecteId);
  setPoints(updatedPoints);
  localStorage.setItem("points", JSON.stringify(updatedPoints));

  setMessage({ text: "تم حذف النقاط بنجاح", type: "success" });
   console.log(res.result);
        } else {
          setMessage({
            text: res.result || "فشل في حذف النقطة",
            type: "error",
          });
        }
      } catch (error) {
        setMessage({ text: "حدث خطأ أثناء الحذف", type: "error" });
      }
      setIsLoading(false);
      setShowConfirm(false);
      setSelectedProjecteId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedProjecteId(null);
  };

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "1px solid #e5e7eb",
    border: "none",
  };

  const handleUpdate = (id) => navigate(`/edit-points/${id}`);

  return (
    <div style={{ padding: "20px", marginTop: "-40px" }}>
      {/* زر إضافة نقاط */}
      <button
        onClick={() => navigate("/add-points")}
        style={{
          marginRight: "250px",
          width: "200px",
          background: "#9333EA",
          color: "white",
          borderRadius: "8px",
          height: "40px",
          border: "none",
          fontSize: "1rem",
          marginBottom: "15px",
          cursor: "pointer",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#805AD5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#9333EA";
        }}
      >
        + Add Points
      </button>

      {/* الجدول */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "14px",
          marginRight: "220px",
          direction: "rtl",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6" }}>
            <th style={{ padding: "8px 10px" }}>Name</th>
            <th style={{ padding: "8px 10px" }}>Points</th>
            <th style={{ padding: "8px 10px" }}>Point Reason</th>
            <th style={{ padding: "8px 10px" }}>Date</th>
            <th style={{ padding: "8px 10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {points.map((p, index) => (
           <tr key={`${p.id}-${index}`} style={{ backgroundColor: "#fff" }}>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{p.points}</td>
              <td style={tdStyle}>{p.reason}</td>
              <td style={tdStyle}>{p.date}</td>

              <td style={{ padding: "10px", textAlign: "center" }}>
                <button
                  onClick={() => handleUpdate(p.id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "white",
                    color: "#3B82F6",
                    border: "1px solid #3B82F6",
                    borderRadius: "6px",
                    fontSize: "12px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(p.id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "white",
                    color: "#EF4444",
                    border: "1px solid #EF4444",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* مربع حوار التأكيد */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              هل تريد حذف نقاط هذا الموظف؟
            </p>
            <button
              onClick={confirmDeleteEmployee}
              disabled={isLoading}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: "#EF4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? "جارٍ الحذف..." : "نعم"}
            </button>
            <button
              onClick={cancelDelete}
              disabled={isLoading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ccc",
                color: "black",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              لا
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsManagement;
