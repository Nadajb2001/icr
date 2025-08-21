import React, { useState, useEffect } from "react";

const AttendanceRequests = () => {
  const [requests, setRequests] = useState([]);

  const thStyle = {
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#f3f4f6",
    border: "none",
  };

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "none",
  };

  // بيانات وهمية
  useEffect(() => {
    const dummyRequests = [
      {
        id: 1,
        date: "2025-08-01",
        checkin: "09:00",
        checkout: "17:00",
        overtime: "1h",
        vacation: "No",
        notes: "On time",
      },
      {
        id: 2,
        date: "2025-08-02",
        checkin: "09:30",
        checkout: "17:10",
        overtime: "30m",
        vacation: "No",
        notes: "Slightly late",
      },
      {
        id: 3,
        date: "2025-08-03",
        checkin: "-",
        checkout: "-",
        overtime: "-",
        vacation: "Yes",
        notes: "Official leave",
      },
    ];
    setRequests(dummyRequests);
  }, []);

  // دالة القبول
  const handleApprove = (id) => {
    alert(`Request #${id} approved ✅`);
  };

  // دالة الرفض
  const handleReject = (id) => {
    alert(`Request #${id} rejected ❌`);
  };

  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-10px" }}
    >

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead style={{ backgroundColor: "#e5e7eb" }}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Check In</th>
            <th style={thStyle}>Check Out</th>
            <th style={thStyle}>Overtime</th>
            <th style={thStyle}>Vacation</th>
            <th style={thStyle}>Notes</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr
              key={req.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f9fafb",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f3f4f6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  index % 2 === 0 ? "#fff" : "#f9fafb")
              }
            >
              <td style={tdStyle}>{req.id}</td>
              <td style={tdStyle}>{req.date}</td>
              <td style={tdStyle}>{req.checkin}</td>
              <td style={tdStyle}>{req.checkout}</td>
              <td style={tdStyle}>{req.overtime}</td>
              <td style={tdStyle}>{req.vacation}</td>
              <td style={tdStyle}>{req.notes}</td>
              <td
                style={{
                  ...tdStyle,
                  display: "flex",
                  gap: "6px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => handleApprove(req.id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "white",
                    color: "green",
                    border: "1px solid green",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "white",
                    color: "red",
                    border: "1px solid red",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRequests;
