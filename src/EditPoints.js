import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "./lib/apiClient";

const EditPoints = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pointRecord, setPointRecord] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  // تحميل البيانات من localStorage
  useEffect(() => {
    const allPoints = JSON.parse(localStorage.getItem("points")) || [];
    const foundRecord = allPoints.find(p => p.id === parseInt(id));
    setPointRecord(foundRecord || { points: "", reason: "" });
  }, [id]);

  const handleChange = (field, value) => {
    setPointRecord(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePoints = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    
    if (!pointRecord.points || isNaN(pointRecord.points)) {
      setMessage({ text: "الرجاء إدخال عدد النقاط بشكل صحيح", type: "error" });
      return;
    }
    if (!pointRecord.reason || pointRecord.reason.trim() === "") {
      setMessage({ text: "الرجاء إدخال سبب تعديل النقاط", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiRequest(`/api/employee-points/${id}`, {
        method: "POST",
        body: JSON.stringify({
          points: Number(pointRecord.points),
          reason: pointRecord.reason.trim()
        }),
      });
console.log(res.result);
      setIsLoading(false);

      if (res.status === true) {
  // تحديث localStorage
  const allPoints = JSON.parse(localStorage.getItem("points")) || [];
  const updatedPoints = allPoints.map(p =>
    p.id === parseInt(id) ? { ...p, points: Number(pointRecord.points), reason: pointRecord.reason.trim() } : p
  );
  localStorage.setItem("points", JSON.stringify(updatedPoints));

  setMessage({ text: "تم تعديل المعلومات بنجاح", type: "success" });
  alert("Update successfully");
  navigate("/Dashboard/PointsManagement");
      } else {
        setMessage({ text: res.result || "فشل في التحديث", type: "error" });
      }
    } catch (error) {
      setIsLoading(false);
      setMessage({ text: "حدث خطأ أثناء الاتصال بالخادم", type: "error" });
    }
  };

  if (!pointRecord) {
    return <p style={{ textAlign: "center" }}>جاري تحميل البيانات...</p>;
  }

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Edit Points</h2>
      <div style={{ margin: "auto", maxWidth: "500px", textAlign: "left" }}>
        <label><strong>Points:</strong></label>
        <input
          type="number"
          value={pointRecord.points}
          onChange={e => handleChange("points", e.target.value)}
          style={inputStyle}
        />

        <label><strong>Reason:</strong></label>
        <input
          type="text"
          value={pointRecord.reason}
          onChange={e => handleChange("reason", e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={updatePoints}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            background: "#9333EA",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message.text && (
        <p
          style={{
            marginTop: "15px",
            color: message.type === "error" ? "red" : "green"
          }}
        >
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
  color: "black"
};

export default EditPoints;
