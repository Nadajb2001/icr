import React, { useState, useEffect } from "react";
import { CiSearch, CiCirclePlus } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

const PerformanceMonitor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("performance");
    if (saved) {
      return JSON.parse(saved);
    } else {
      const defaultData = [
        {
          id: 1,
          name: "محمد أحمد",
          image: "https://c.animaapp.com/m9qy3i7kalcEpy/img/retrato-corporativo.png",
          projects: ["نظام الموارد البشرية"],
          taskName: "تحديث قاعدة البيانات",
          taskStatus: "قيد التنفيذ",
        },
        {
          id: 2,
          name: "ريم علي",
          image: "https://c.animaapp.com/m9qy3i7kalcEpy/img/1f9bb61e-c6b5-44dd-adb9-3600d65c8bf5.png",
          projects: ["نظام المحاسبة"],
          taskName: "تصميم الواجهة",
          taskStatus: "منتهية",
        },
      ];
      return defaultData;
    }
  });

  const [filtered, setFiltered] = useState(employees);

  useEffect(() => {
    localStorage.setItem("performance", JSON.stringify(employees));
  }, [employees]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filteredData = employees.filter((emp) =>
        emp.name.includes(term)
      );
      setFiltered(filteredData);
    } else {
      setFiltered(employees);
    }
  };

  const addEntry = () => {
    const name = prompt("اسم الموظف:");
    const image = prompt("رابط صورة الموظف:");
    const project = prompt("اسم المشروع:");
    const taskName = prompt("اسم المهمة:");
    const taskStatus = prompt("حالة المهمة (منتهية / قيد التنفيذ / مؤجلة):");

    if (name && image && project && taskName && taskStatus) {
      const newEntry = {
        id: employees.length + 1,
        name,
        image,
        projects: [project],
        taskName,
        taskStatus,
      };
      const updated = [...employees, newEntry];
      setEmployees(updated);
      setFiltered(updated);
    }
  };

  const deleteEntry = (id) => {
    const confirmDelete = window.confirm("هل تريد حذف هذا السجل؟");
    if (confirmDelete) {
      const updated = employees.filter((emp) => emp.id !== id);
      setEmployees(updated);
      setFiltered(updated);
    }
  };

  return (
    <div className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10" style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}>
      {/* شريط البحث */}
      <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
        <CiSearch style={{ position: "absolute", left: "44.5rem", top: "0.2rem", width: "1.5rem", height: "1.5rem", color: "#6B7280" }} />
        <input
          type="text"
          placeholder=" البحث"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "60%",
            padding: "0.375rem 2rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.5rem",
            outline: "none",
            backgroundColor: "#E5E7EB",
           
            fontSize: "1rem",
            textAlign: "right",
             color: "#4A5568",
          }}
        />
      </div>

      {/* الأزرار */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px", marginTop: "15px" }}>
        <button
          onClick={addEntry}
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
            border: "none", // إزالة الإطار الأسود
          }}
        >
          <CiCirclePlus style={{ width: "20px", height: "20px", marginLeft: "16px" }} />
          إضافة سجل أداء
        </button>
      </div>

      {/* رأس الجدول */}
      <div style={{
        width: "120%",
        marginTop: "10px",
        display: "grid",
        gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 1fr",
        backgroundColor: "#f5f5f5",
        padding: "8px 10px",
        fontWeight: "bold",
        border: "1px solid #e0e0e0",
        borderRadius: "8px 8px 0 0",
        background: '#E5E7EB',
        textAlign: "center",
        alignItems: "center",
        fontSize: "14px",
      }}>
        <div><AiOutlineUser style={{ fontSize: "25px", color: "#6B7280" }} /></div>
        <div>اسم الموظف</div>
        <div>اسم المشروع</div>
        <div>اسم المهمة</div>
        <div>حالة المهمة</div>
        <div>إجراءات</div>
      </div>

      {/* محتوى الجدول */}
      <div style={{
        width: "120%",
        border: "1px solid #e0e0e0",
        borderTop: "none",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        {filtered.map((emp) => (
          <div
            key={emp.id}
            style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 1fr",
              padding: "8px 10px",
              textAlign: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={emp.image}
                alt={emp.name}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            </div>
            
            <div>{emp.name}</div>
            <div>{emp.projects.join(", ")}</div>
            <div>{emp.taskName}</div>
            <div>{emp.taskStatus}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
              <button
                onClick={() => alert(`الموظف: ${emp.name}\nالمشروع: ${emp.projects.join(", ")}\nالمهمة: ${emp.taskName}\nالحالة: ${emp.taskStatus}`)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  color: "#10B981",
                  border: "1px solid #10B981",
                  borderRadius: "6px",
                  fontSize: "12px"
                }}
              >
                عرض
              </button>
              <button
                onClick={() => deleteEntry(emp.id)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  color: "#EF4444",
                  border: "1px solid #EF4444",
                  borderRadius: "6px",
                  fontSize: "12px"
                }}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMonitor;