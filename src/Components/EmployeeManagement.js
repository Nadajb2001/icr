import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/apiClient";

const EmployeeManagement = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const thStyle = {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
    fontWeight: "bold",
    backgroundColor: "#f3f4f6",
    border: "none",
  };

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "1px solid #e5e7eb",
    border: "none",
  };

  const btnStyle = (color) => ({
    padding: "4px 8px",
    backgroundColor: "white",
    color: color,
    border: `1px solid ${color}`,
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
  });

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //  استدعاء بيانات الموظفين مرة واحدة فقط عند تحميل الصفحة
  useEffect(() => {
    showAllEmployees();
  }, []);

  //  تحديث الفلترة والتخزين عند تغيّر employees
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
    setFilteredEmployees(employees);
  }, [employees]);

  const showAllEmployees = async () => {
    console.log("showAllEmployees req");
    setIsLoading(true);

    const res = await apiRequest("/api/showAllEmplyee", {
      method: "GET",
    });

    console.log(res);

    if (res.status === true && res.result?.employees) {
      console.log("showAllEmployees success");
      setEmployees(res.result.employees);
    } else {
      setMessage({ text: res.result || "فشل في جلب البيانات", type: "error" });
    }

    setIsLoading(false);
  };
  const handleViewEmployee = (id) => navigate(`/profile/${id}`);
  const handleEditEmployee = (id) => navigate(`/edit-employee/${id}`);

  const confirmDeleteEmployee = async () => {
    if (selectedEmployeeId !== null) {
      console.log(" Selected employee ID to delete:", selectedEmployeeId);

      try {
        const url = `/api/deletemployees/${selectedEmployeeId}`;
        const res = await apiRequest(url, {
          method: "POST",
        });

        console.log(" Server response:", res);

        if (res.status === true) {
          const updated = employees.filter(
            (emp) => emp.id !== selectedEmployeeId
          );
          console.log(" Updated employee list:", updated);
          setEmployees(updated);
          setMessage({ text: "تم حذف الموظف بنجاح", type: "success" });
        } else {
          setMessage({
            text: res.result || "فشل في حذف الموظف",
            type: "error",
          });
        }
      } catch (error) {
        console.error(" Error occurred during deletion:", error);
        setMessage({ text: "حدث خطأ أثناء الحذف", type: "error" });
      }

      setShowConfirm(false);
      setSelectedEmployeeId(null);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}
    >
      {/* زر الإضافة */}
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
          onClick={() => navigate("/add-employee")}
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
            border: "none",
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
          Add Employee
        </button>
      </div>

      {/* رأس الجدول */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "14px",
        }}
      >
        <thead style={{ backgroundColor: "#e5e7eb" }}>
          <tr>
            <th style={thStyle}>Avatar</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>role_display_name</th>
            <th style={thStyle}>Job Title</th>
            <th style={thStyle}>Permissions</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr
              key={employee.id}
              style={{
                backgroundColor: "#fff",
              }}
            >
              <td style={tdStyle}>
                <img
                  src={employee.avatar_url}
                  alt={employee.name}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </td>

              <td 
  style={{ ...tdStyle, cursor: "pointer", color: "#070708ff", textDecoration: "underline" }}
  onClick={() => navigate(`/Dashboard/AttendanceRecords/${employee.id}`)}
>
  {employee.name}
</td>

              <td style={tdStyle}>{employee.email}</td>
              <td style={tdStyle}>{employee.date}</td>
              <td style={tdStyle}>{employee.role_display_name}</td>
              <td style={tdStyle}>{employee.job_title}</td>

              <td style={tdStyle}>
                <select
                  value={employee.permissions || ""}
                  onChange={(e) => {
                    const updated = [...filteredEmployees];
                    const index = updated.findIndex(
                      (emp) => emp.id === employee.id
                    );
                    if (index !== -1) {
                      updated[index].permissions = e.target.value;
                      setFilteredEmployees(updated);
                      const original = [...employees];
                      const originalIndex = original.findIndex(
                        (emp) => emp.id === employee.id
                      );
                      if (originalIndex !== -1) {
                        original[originalIndex].permissions = e.target.value;
                        setEmployees(original);
                        localStorage.setItem(
                          "employees",
                          JSON.stringify(original)
                        );
                      }
                    }
                  }}
                  style={{
                    padding: "4px 6px",
                    fontSize: "13px",
                    borderRadius: "4px",
                    border: "1px solid #d1d5db",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
              </td>
              <td
                style={{
                  ...tdStyle,
                  display: "flex",
                  gap: "6px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => handleViewEmployee(employee.id)}
                  style={btnStyle("#0c0f0eff")}
                >
                  View
                </button>
                <button
                  onClick={() => handleEditEmployee(employee.id)}
                  style={btnStyle("#3B82F6")}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(true);
                    setSelectedEmployeeId(employee.id);
                  }}
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
                {showConfirm && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        width: "300px",
                        textAlign: "center",
                      }}
                    >
                      <p>Are you sure you want to delete this employee?</p>
                      <div
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <button
                          onClick={confirmDeleteEmployee}
                          style={{
                            backgroundColor: "#EF4444",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          yes
                        </button>
                        <button
                          onClick={() => setShowConfirm(false)}
                          style={{
                            backgroundColor: "#ccc",
                            color: "black",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;
