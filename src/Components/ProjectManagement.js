import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/apiClient";

const ProjectManagement = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects && savedProjects !== "undefined"
      ? JSON.parse(savedProjects)
      : [];
  });

  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "1px solid #e5e7eb",
    border: "none",
  };

  useEffect(() => {
    showAllProjects();
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const showAllProjects = async () => {
    setIsLoading(true);
    const res = await apiRequest("/api/projects", { method: "GET" });

    if (res.status === true && res.result?.projects) {
      const storedEmployees = JSON.parse(
        localStorage.getItem("employees") || "[]"
      );

      const enrichedProjects = res.result.projects.map((project) => {
        const updatedTeam = (project.team_members || []).map((member) => {
          const fullInfo = storedEmployees.find(
            (emp) => emp.id === member.employee_id
          );
          return {
            ...member,
            job_title: fullInfo?.job_title || "غير معروف",
          };
        });

        return {
          ...project,
          team_members: updatedTeam,
        };
      });

      setProjects(enrichedProjects);
      setMessage({ text: "تم جلب المشاريع بنجاح", type: "success" });
    } else {
      setMessage({ text: res.result || "فشل في جلب المشاريع", type: "error" });
    }

    setShowConfirm(false);
    setDeleteProjectId(null);
  };

  const handleViewProject = (id) => navigate(`/view-project/${id}`);
  const handleEditProject = (id) => navigate(`/edit-project/${id}`);


  const confirmDeleteProject = async () => {
    if (deleteProjectId !== null) {
      try {
        const url = `/api/projects/${deleteProjectId}`;
        const res = await apiRequest(url, {
          method: "DELETE",
        });
        console.log(" Server response:", res);
        if (res.status === true) {
          const updated = projects.filter(
            (proj) => proj.id !== deleteProjectId
          );
          console.log(" Updated project list:", updated);
          setProjects(updated);
          setMessage({ text: "تم حذف المشروع بنجاح", type: "success" });
        } else {
          setMessage({
            text: res.result || "فشل في حذف المشروع",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage({ text: "حدث خطأ أثناء الحذف", type: "error" });
      }

      setDeleteProjectId(null);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}
    >
      <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
        <button
          onClick={() => navigate("/add-project")}
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
            padding: "0 10px 0 20px",
            border: "none",
            transition: "background-color 0.3s ease",
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
          Add Project
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "14px",
          
        }}
      >
        <thead>
          <tr
            style={{
              background: "#E5E7EB",
              fontWeight: "bold",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            <th style={{ padding: "8px 20px" }}>Name</th>
            <th style={{ padding: "8px 20px" }}>Description</th>
            <th style={{ padding: "8px 25px" }}>Start</th>
            <th style={{ padding: "8px 30px" }}>End</th>
            <th style={{ padding: "8px 20px" }}>Budget</th>
            <th style={{ padding: "8px 20px" }}>Client</th>
            <th style={{ padding: "8px 20px" }}>Project Manager</th>
            <th style={{ padding: "8px 20px" }}>Team</th>
            <th style={{ padding: "8px 20px" }}>Status</th>
            <th style={{ padding: "8px 20px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              style={{
                textAlign: "center",
                background: "white",
                fontSize: "14px",
              }}
            >
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.start_date}</td>
              <td>{project.end_date}</td>
              <td>{project.budget} $</td>
              <td>{project.client_name}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <span>{project.project_manager?.name}</span>
                </div>
              </td>
              <td style={tdStyle}>
                <select
                  style={{
                    padding: "4px 6px",
                    fontSize: "13px",
                    borderRadius: "4px",
                    border: "1px solid #d1d5db",
                    backgroundColor: "#f9fafb",
                    color: "#111827",
                    width: "130px",
                  }}
                >
                  {(project.team_members || []).map((member) => (
                    <option key={member.employee_id}>
                      {member.employee_name} - {member.job_title || "بدون مسمى"}
                    </option>
                  ))}
                </select>
              </td>
              <td>{project.status}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <button
                    onClick={() => handleViewProject(project.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "white",
                      color: "#10B981",
                      border: "1px solid #10B981",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditProject(project.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "white",
                      color: "#3B82F6",
                      border: "1px solid #3B82F6",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirm(true);
                      setDeleteProjectId(project.id);
                    }}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "white",
                      color: "#EF4444",
                      border: "1px solid #EF4444",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal تأكيد الحذف */}
      {deleteProjectId && (
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
            <p> Are you sure you want to delete this project?</p>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={confirmDeleteProject}
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
                onClick={setShowConfirm}
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
    </div>
  );
};

export default ProjectManagement;
