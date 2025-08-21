import Sidebar from "./Components/Sidebar";
import { Routes, Route } from "react-router-dom";
import DashboardControlPanel from "./Components/DashboardControlPanel";
import EmployeeManagement from "./Components/EmployeeManagement";
import ProjectManagement from "./Components/ProjectManagement";
import TaskManagement from "./Components/TaskManagement";
import SalaryManagement from "./Components/SalaryManagement";
import ExpenseManagement from "./Components/ExpenseManagement";
import PermissionManagement from "./Components/PermissionManagement";
import NotificationManagement from "./Components/NotificationManagement";
import PerformanceMonitoring from "./Components/PerformanceMonitoring";
import PointsManagement from "./Components/PointsManagement";
import TimeManagement from "./Components/TimeManagement";
import IncentivesManagement from "./Components/IncentivesManagement";
import AddAdmin from "./Components/AddAdmin";
import AttendanceDetails from "./Components/AttendanceDetails";
import AttendanceRequests from "./Components/AttendanceRequests";
export default function Dashboard() {
  return (
    <div className="app" dir="rtl">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route
            path="DashboardControlPanel"
            element={<DashboardControlPanel />}
          />
          <Route path="EmployeeManagement" element={<EmployeeManagement />} />
          <Route path="ProjectManagement" element={<ProjectManagement />} />
          <Route path="TaskManagement" element={<TaskManagement />} />
          <Route path="SalaryManagement" element={<SalaryManagement />} />
          <Route path="ExpenseManagement" element={<ExpenseManagement />} />
          <Route
            path="PermissionManagement"
            element={<PermissionManagement />}
          />
          <Route
            path="NotificationManagement"
            element={<NotificationManagement />}
          />
          <Route
            path="PerformanceMonitoring"
            element={<PerformanceMonitoring />}
          />
          <Route path="PointsManagement" element={<PointsManagement />} />
          <Route
            path="IncentivesManagement"
            element={<IncentivesManagement />}
          />
          <Route path="TimeManagement" element={<TimeManagement />} />
          <Route path="AddAdmin" element={<AddAdmin />} />
          {/* Attendance Routes */}
          <Route path="AttendanceRecords" element={<EmployeeManagement />} />
          <Route
            path="AttendanceRecords/:employeeId"
            element={<AttendanceDetails />}
          />
          <Route path="AttendanceRequests" element={<AttendanceRequests />} />  
        </Routes>
      </div>
    </div>
  );
}
