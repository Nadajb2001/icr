import React, { useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { VscCodeOss } from "react-icons/vsc";
import { PiUsersThreeLight } from "react-icons/pi";
import { GrAtm, GrDeploy, GrProjects } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbPoint } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { FaTasks } from "react-icons/fa";
import { apiRequest } from "../lib/apiClient";
// ✅ الأيقونات الجديدة
import { FaRegCalendarCheck } from "react-icons/fa";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("DashboardControlPanel");
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false); // ✅ فتح/غلق القائمة الفرعية
  const navigate = useNavigate();

  const handleLinkClick = (section) => {
    setActiveSection(section);
  };

  const [setMessage] = useState({ text: "", type: "" });

  const confirmLogout = async () => {
    try {
      console.log(" Logging out...");

      const res = await apiRequest("/api/admin/logout", {
        method: "POST",
      });

      console.log(" Server response:", res);
      const message = res?.result?.message || "تم تسجيل الخروج بنجاح";
      console.log("Logout message from API:", message);

      localStorage.removeItem("token");
      setMessage({ text: message, type: "success" });
      navigate("/");
    } catch (error) {
      console.error(" Error during logout:", error);
      setMessage({ text: "حدث خطأ أثناء تسجيل الخروج", type: "error" });
    }

    setShowConfirmLogout(false);
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3 className="brand">
          <span className="blue">.</span>
          <span className="blue">R</span>
          <span className="white">C</span>
          <span className="purple">I</span>
        </h3>
      </div>

      <ul className="nav-links">
        <li>
          <Link
            to="/Dashboard/AddAdmin"
            className={`nav-item ${activeSection === "AddAdmin" ? "active" : ""}`}
            onClick={() => handleLinkClick("AddAdmin")}
          >
            <span className="nav-icon">
              <MdOutlineAdminPanelSettings size={20} className="logo-icon" />
            </span>
            <span>Add Admin</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/DashboardControlPanel"
            className={`nav-item ${activeSection === "DashboardControlPanel" ? "active" : ""}`}
            onClick={() => handleLinkClick("DashboardControlPanel")}
          >
            <span className="nav-icon">
              <VscCodeOss size={20} className="logo-icon" />
            </span>
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/EmployeeManagement"
            className={`nav-item ${activeSection === "EmployeeManagement" ? "active" : ""}`}
            onClick={() => handleLinkClick("EmployeeManagement")}
          >
            <span className="nav-icon">
              <PiUsersThreeLight size={20} className="user-icon" />
            </span>
            <span>EmployeeManagement</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/ProjectManagement"
            className={`nav-item ${activeSection === "ProjectManagement" ? "active" : ""}`}
            onClick={() => handleLinkClick("ProjectManagement")}
          >
            <span className="nav-icon">
              <GrProjects size={20} className="task-icon" />
            </span>
            <span>ProjectManagement</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/TaskManagement"
            className={`nav-item ${activeSection === "TaskManagement" ? "active" : ""}`}
            onClick={() => handleLinkClick("TaskManagement")}
          >
            <span className="nav-icon">
              <FaTasks size={20} className="task-icon" />
            </span>
            <span>TaskManagement</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/SalaryManagement"
            className={`nav-item ${activeSection === "SalaryManagement" ? "active" : ""}`}
            onClick={() => handleLinkClick("SalaryManagement")}
          >
            <span className="nav-icon">
              <LiaMoneyCheckAltSolid size={20} className="task-icon" />
            </span>
            <span>SalaryManagement</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/ExpenseManagement"
            className={`nav-item ${activeSection === "ExpenseManagement" ? "active" : ""}`}
            onClick={() => handleLinkClick("ExpenseManagement")}
          >
            <span className="nav-icon">
              <GrAtm size={20} className="task-icon" />
            </span>
            <span>ExpenseManagement</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/IncentivesManagement"
            className={`nav-item ${activeSection === "IncentivesManagement" ? "active" : ""}`}
            onClick={() => handleLinkClick("IncentivesManagement")}
          >
            <span className="nav-icon">
              <FaRegStar size={20} className="shield-icon" />
            </span>
            <span>IncentivesManagement</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/PointsManagement"
            className={`nav-item ${activeSection === "PointsManagement" ? "active" : ""}`}
            onClick={() => handleLinkClick("PointsManagement")}
          >
            <span className="nav-icon">
              <TbPoint size={25} className="shield-icon" />
            </span>
            <span>PointsManagement</span>
          </Link>
        </li>

        <li>
          <Link
            to="/Dashboard/NotificationManagement"
            className={`nav-item ${activeSection === "NotificationManagement" ? "active" : ""}`}
            onClick={() => handleLinkClick("NotificationManagement")}
          >
            <span className="nav-icon">
              <IoIosNotificationsOutline size={25} className="shield-icon" />
            </span>
            <span>Notification</span>
          </Link>
        </li>

        {/* ✅ Attendance Section */}
        <li>
          <div
            className="nav-item"
            onClick={() => setAttendanceOpen(!attendanceOpen)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="nav-icon">
                <FaRegCalendarCheck size={20} />
              </span>
              <span>Attendance</span>
            </div>
            <span>{attendanceOpen ? <BsChevronUp /> : <BsChevronDown />}</span>
          </div>

          {attendanceOpen && (
            <ul className="submenu">
              <li>
                <Link
                  to="/Dashboard/AttendanceRecords"
                  className={`nav-item ${activeSection === "AttendanceRecords" ? "active" : ""}`}
                  onClick={() => handleLinkClick("AttendanceRecords")}
                >
                  Attendance Records
                </Link>
              </li>
              <li>
                <Link
                  to="/Dashboard/AttendanceRequests"
                  className={`nav-item ${activeSection === "AttendanceRequests" ? "active" : ""}`}
                  onClick={() => handleLinkClick("AttendanceRequests")}
                >
                  Attendance Requests
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* زر تسجيل الخروج */}
        <li>
          <button
            onClick={() => setShowConfirmLogout(true)}
            className="nav-item logout-button"
            style={{
              background: "none",
              border: "none",
              color: "white",
              padding: "10px",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <span className="nav-icon">
              <GrDeploy size={20} className="task-icon" />
            </span>
            <span>Logout</span>
          </button>
        </li>
      </ul>

      {/* نافذة التأكيد */}
      {showConfirmLogout && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <p>هل أنت متأكد أنك تريد تسجيل الخروج؟</p>
            <div style={{ marginTop: "10px" }}>
              <button onClick={confirmLogout} style={popupButtonStyle}>
                نعم، تسجيل الخروج
              </button>
              <button
                onClick={cancelLogout}
                style={{ ...popupButtonStyle, backgroundColor: "#ccc", color: "#000" }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ أنماط نافذة التأكيد
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const popupStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
  maxWidth: "300px",
  width: "100%",
  color: "black",
};

const popupButtonStyle = {
  padding: "8px 15px",
  margin: "5px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#9333EA",
  color: "white",
};

export default Sidebar;
