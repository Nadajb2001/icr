import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "./lib/apiClient";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const showProfile = async () => {
  console.log("employee-profile req");
  setIsLoading(true);

  const res = await apiRequest(`/api/employee-profile/${id}`, {
    method: "GET",
  });

  console.log(res);
if (res && res.result && res.result.data && res.result.data.user && res.result.data.employee && res.result.data.role) {
  const { user, employee, role } = res.result.data;

    const fullProfile = {
      name: user.name,
      email: user.email,
      avatar_url: user.profile_picture_url,
      date: employee.hire_date,
      job_title: employee.job_title?.name || "N/A",
      role_display_name: role.name,
      salary: employee.salary,
      total_points: employee.total_points,
    };

    setEmployee(fullProfile);
    setMessage({ text: res.message, type: "success" });
  } else {
    setMessage({
      text: typeof res.message === "string" ? res.message : "فشل في جلب البيانات",
      type: "error",
    });
  }

  setIsLoading(false);
};

  useEffect(() => {
    console.log("employee-profile init");
    showProfile();
  }, []);

  return (
  <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
    <h2>Employee Profile</h2>

    {isLoading || !employee ? (
      <p>Loading...</p> 
    ) : (
      <>
        <img
          src={employee.profile_picture_url || "https://placehold.co/100"}
          alt={employee.name || "Avatar"}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <h3>{employee.name}</h3>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Hire Date:</strong> {employee.date}</p>
        <p><strong>Job Title:</strong> {employee.job_title}</p>
        <p><strong>Role:</strong> {employee.role_display_name}</p>
        <p><strong> Salary:</strong> {employee.salary}</p>
        <p><strong> Points:</strong> {employee.total_points}</p>
      </>
    )}

    {message.text && (
      <p style={{ color: message.type === "error" ? "red" : "green" }}>
        {message.text}
      </p>
    )}
  </div>
);

};

export default EmployeeProfile;
