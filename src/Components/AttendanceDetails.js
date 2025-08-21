import React from "react";
import { useParams } from "react-router-dom";

const AttendanceDetails = () => {
  const { employeeId } = useParams();

  // بيانات افتراضية
  const attendanceData = [
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
      checkout: "17:15",
      overtime: "30m",
      vacation: "No",
      notes: "Late check-in",
    },
    {
      id: 3,
      date: "2025-08-03",
      checkin: "-",
      checkout: "-",
      overtime: "-",
      vacation: "Yes",
      notes: "Vacation day",
    },
      {
      id: 4,
      date: "2025-08-04",
      checkin: "-",
      checkout: "-",
      overtime: "-",
      vacation: "No",
      notes: "Vacation day",
    },
      {
      id: 5,
      date: "2025-08-05",
      checkin: "-",
      checkout: "-",
      overtime: "-",
      vacation: "Yes",
      notes: "Vacation day",
    },
      {
      id: 6,
      date: "2025-08-04",
      checkin: "-",
      checkout: "-",
      overtime: "-",
      vacation: "No",
         notes: "Late check-in",

    },
  ];

  const thStyle = {
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#f3f4f6",
  };

  const tdStyle = {
    padding: "12px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-5px" }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Check In</th>
            <th style={thStyle}>Check Out</th>
            <th style={thStyle}>Overtime</th>
            <th style={thStyle}>Vacation</th>
            <th style={thStyle}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((row, index) => (
            <tr
              key={row.id}
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
              <td style={tdStyle}>{row.id}</td>
              <td style={tdStyle}>{row.date}</td>
              <td style={tdStyle}>{row.checkin}</td>
              <td style={tdStyle}>{row.checkout}</td>
              <td style={tdStyle}>{row.overtime}</td>
              <td style={tdStyle}>{row.vacation}</td>
              <td style={tdStyle}>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDetails;
