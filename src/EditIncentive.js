// src/pages/EditIncentive.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditIncentive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incentive, setIncentive] = useState({
    name: "", // تعديل الاسم إلى name
    amount: "", // تعديل الاسم إلى amount
    reason: "", // تعديل الاسم إلى reason
    date: ""
  });

  useEffect(() => {
    const allIncentives = JSON.parse(localStorage.getItem("incentives")) || [];
    const foundIncentive = allIncentives.find(i => i.id === parseInt(id));
    if (foundIncentive) {
      setIncentive({
        name: foundIncentive.name || "", // تعديل الاسم إلى name
        amount: foundIncentive.amount || "", // تعديل الاسم إلى amount
        reason: foundIncentive.reason || "", // تعديل الاسم إلى reason
        date: foundIncentive.date ? foundIncentive.date.split("T")[0] : "" // تنسيق التاريخ
      });
    }
  }, [id]);

  const handleChange = (field, value) => {
    setIncentive(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const allIncentives = JSON.parse(localStorage.getItem("incentives")) || [];
    const updated = allIncentives.map(i =>
      i.id === parseInt(id) ? { ...incentive } : i
    );
    localStorage.setItem("incentives", JSON.stringify(updated));
    alert("✅ Incentive updated successfully!");
    navigate("/incentives"); // عدل هذا حسب المسار الصحيح لقائمة المكافآت
  };

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Edit Incentive</h2>
      <div style={{ margin: "auto", maxWidth: "500px", textAlign: "left" }}>
        <label><strong>Name:</strong></label>
        <input
          type="text"
          value={incentive.name} // تعديل الاسم إلى name
          onChange={e => handleChange("name", e.target.value)} // تعديل الاسم إلى name
          style={inputStyle}
        />

        <label><strong>Amount:</strong></label>
        <input
          type="number"
          value={incentive.amount} // تعديل الاسم إلى amount
          onChange={e => handleChange("amount", e.target.value)} // تعديل الاسم إلى amount
          style={inputStyle}
        />

        <label><strong>Incentive Reason:</strong></label>
        <input
          type="text"
          value={incentive.reason} // تعديل الاسم إلى reason
          onChange={e => handleChange("reason", e.target.value)} // تعديل الاسم إلى reason
          style={inputStyle}
        />

        <label><strong>Date:</strong></label>
        <input
          type="date"
          value={incentive.date} // تأكد من أن التاريخ يعرض بشكل صحيح
          onChange={e => handleChange("date", e.target.value)}
          style={inputStyle}
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

export default EditIncentive;