import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const proj = savedProjects.find(p => String(p.id) === String(id));
    setProject(proj);

    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(savedEmployees);
  }, [id]);

  if (!project) return <div>Loading...</div>;

  const getEmployeeName = (empId) => {
    const emp = employees.find(e => String(e.id) === String(empId));
    return emp ? `${emp.name} (${emp.position})` : "Unknown Member";
  };

  return (
    <div style={{ padding: "30px", textAlign: "center", direction: "ltr" }}>
      <h2>Project Details</h2>

      <div style={{ margin: "20px auto", maxWidth: "600px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h3 style={{ color: "#4F46E5" }}>{project.name}</h3>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Start Date:</strong> {project.startDate}</p>
        <p><strong>Deliver Date:</strong> {project.deliverDate}</p>
        <p><strong>Status:</strong> {project.status}</p>

        
          <strong>Team Members:</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyleType: "none" }}>

            {(project.teamwork || []).map(id => (
              <li key={id}>{getEmployeeName(id)}</li>
            ))}
          </ul>
      
      </div>
    </div>
  );
};

export default ViewProject;
