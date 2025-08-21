import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import Login from "./Auth/login";
import Dashboard from "./Dashboard";
import EmployeeProfile from "./EmployeeProfile";
import EditEmployee from "./EditEmployee";
import AddEmployee from "./AddEmployee";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import ViewProject from "./ViewProject";
import AddSalary from "./AddSalary";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import AddIncentive from "./AddIncentive";
import EditIncentive from "./EditIncentive";
import EditPoints from "./EditPoints";
import AddPoints from "./AddPoints";
import AddTask from "./AddTask";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* <Route path="register" element={<Register />} /> */}
        <Route path="login" element={<Login />} />
       
        <Route path="Dashboard/*" element={<Dashboard />} />
        <Route path="/profile/:id" element={<EmployeeProfile />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/add-points" element={<AddPoints />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/edit-points/:id" element={<EditPoints />} />
        <Route path="/view-project/:id" element={<ViewProject />} />
        <Route path="/add-salary" element={<AddSalary />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />
        <Route path="/add-incentive" element={<AddIncentive />} />
        {/* <Route path="/edit-incentive/:id" element={<EditIncentive />} /> */}
        
      </Routes>
    </div>
  );
}
