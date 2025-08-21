import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "./lib/apiClient";
const AddPoints = () => {
  const navigate = useNavigate();
    const [message, setMessage] = useState({ text: "", type: "" });
      const [isLoading, setIsLoading] = useState(false);
  const [employeeIds, setEmployeeIds] = useState([]);
   const [points, setPoints] = useState("");
    const [reason, setReason] = useState("");
  const [employees, setEmployees] = useState([]);
  const [pointsData, setPointsData] = useState({
    employeeIds: [],
    points: "",
    reason: "",

  });
  const [errors, setErrors] = useState({
  employeeIds: [],
    points: "",
    reason: "",
  });
  // تحميل بيانات الموظفين من localStorage
  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    }
  }, []);
  const handleAddPoint = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    setIsLoading(true);

    try {
      const res = await apiRequest("/api/employee-points/add", {
        method: "POST",
        body: JSON.stringify({employeeIds,points,reason}),
      });

      if (res.status === true) {
      setMessage({ text: "تم اضافة النقاط بنجاح", type: "success" });
  // تحديث localStorage
  const savedPoints = localStorage.getItem("points");
  const currentPoints = savedPoints ? JSON.parse(savedPoints) : [];
  // نفترض إن res.result يحتوي على النقاط المضافة أو تقدر تبني النقاط الجديدة هنا:
  const newPoints = employeeIds.map(id => ({
    id,
    name: employees.find(emp => emp.id === id)?.name || "Unknown",
    points,
    reason,
    date: new Date().toLocaleDateString(),
  }));
  const updatedPoints = [...currentPoints, ...newPoints];
  localStorage.setItem("points", JSON.stringify(updatedPoints));

  alert("Points added successfully!");
  console.log(res.result);
  navigate('/Dashboard/PointsManagement');
      
      } else {
        setMessage({
          text: res.result || "فشل في اضافة النقاط",
          type: "error",
        });
            alert("Falid to add  points ");
            // console.log("Validation Errors:", res.errors);

      }
    } catch (error) {
      setMessage({ text: "حدث خطأ في الاتصال بالخادم", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };




         


  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Add Points</h2>
      <div style={{ margin: "auto", maxWidth: "400px", textAlign: "left" }}>
        
        <label><strong>Employees (Select Multiple):</strong></label>
       <select
  multiple
  value={employeeIds}
  onChange={(e) => {
    const selected = Array.from(
      e.target.selectedOptions, 
     option => parseInt(option.value) // إذا IDs أرقام

    );
    setEmployeeIds(selected);
  }}
  style={{ ...inputStyle, height: "120px" }}
>
  {employees.map(emp => (
    <option key={emp.id} value={emp.id}>
      {emp.name} ({emp.position})
    </option>
  ))}
</select>


        <label><strong>Points:</strong></label>
        <input
          type="number"
          value={points}
          onChange={(e) => {
            setPoints(e.target.value);
           
          }}
          style={inputStyle}
        />

        <label><strong>Reason:</strong></label>
        <input
          type="text"
          value={reason}
         onChange={(e) => {
            setReason(e.target.value);
       
          }}
          style={inputStyle}
        />

      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleAddPoint}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          ➕ Add Points
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

export default AddPoints;
