import React, { useState, useEffect } from "react";
import { CiTimer } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

const TimeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      return JSON.parse(savedEmployees);
    } else {
      const defaultEmployees = [
        {
          id: 1,
          name: "محمد محمود",
          email: "mhd@gmail.com",
          date: "7/8/2023",
          hoursWorked: 40,
          image: "https://c.animaapp.com/m9qy3i7kalcEpy/img/fashion-men-pictures---freepik.png",
        },
        {
          id: 2,
          name: "ريم الريم",
          email: "rim@gmail.com",
          date: "7/8/2023",
          hoursWorked: 35,
          image: "https://c.animaapp.com/m9qy3i7kalcEpy/img/retrato-corporativo.png",
        },
        // إضافة بيانات افتراضية أخرى حسب الحاجة
      ];
      return defaultEmployees;
    }
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleViewEmployee = (id) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      alert(`\nاسم الموظف: ${employee.name}\nالبريد الإلكتروني: ${employee.email}\nتاريخ التوظيف: ${employee.date}\nعدد الساعات: ${employee.hoursWorked}`);
    } else {
      console.log(`لم يتم العثور على موظف برقم: ${id}`);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = employees.filter(employee => 
        employee.name.includes(term)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  };

  const handleDeleteEmployee = (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا الموظف؟");
    if (confirmDelete) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
      console.log(`حذف موظف برقم: ${id}`);
    } else {
      console.log(`تم إلغاء حذف الموظف برقم: ${id}`);
    }
  }

  const addEmployee = () => {
    const employeeName = prompt("أدخل اسم الموظف:");
    const email = prompt("أدخل البريد الإلكتروني:");
    const hireDate = prompt("أدخل تاريخ التوظيف (YYYY-MM-DD):");
    const hoursWorked = prompt("أدخل عدد الساعات التي عملها:");
    const image = prompt("ادخل رابط الصورة ");
    if (employeeName && email && hireDate && hoursWorked) {
      const newEmployee = {
        id: employees.length + 1,
        name: employeeName,
        email: email,
        date: hireDate,
        hoursWorked: hoursWorked,
        image: image,
      };

      setEmployees([...employees, newEmployee]);
      setFilteredEmployees([...employees, newEmployee]);
      console.log("تم إضافة موظف جديد:", newEmployee);
    } else {
      console.log("يرجى إدخال جميع المعلومات المطلوبة.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}
    >
      <div style={{ position: "relative", flex: "1", display: "flex", alignItems: "center" }}>
        <CiTimer
          style={{
            position: "absolute",
            left: "44.5rem",
            top: "0.2rem",
            width: "1.5rem",
            height: "1.5rem",
            color: "#6B7280"
          }}
        />
        <input
          type="text"
          placeholder=" البحث"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            textEmphasisColor: "E5E7EB",
            width: "60%",
            padding: "0.375rem 2rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.5rem",
            outline: "none",
            boxShadow: "0 0 0 2px transparent",
            textAlign: "right",
            fontSize: "1rem",
            backgroundColor: "#E5E7EB",
            color: "#4A5568",
          }}
        />
        <style>
          {`
            input::placeholder {
              color: #4B5563;
            }
          `}
        </style>
      </div>

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px", marginTop: "15px" }}>
        <button
          onClick={addEmployee}
          style={{
            width: "200px",
            background: "#9333EA",
            color: "white",
            borderRadius: "8px",
            height: "40px",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            marginTop: "-9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
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
          <MdAdd style={{ width: "20px", height: "20px", marginLeft: "16px" }} />
          إضافة موظف جديد
        </button>
        <button
          onClick={() => alert("فلترة البيانات")} // يمكنك إضافة منطق الفلترة هنا
          style={{
            width: "110px",
            padding: "4px 16px",
            backgroundColor: "#1198AB",
            color: "white",
            borderRadius: "8px",
            transition: "background-color 0.2s",
            height: "40px",
            border: "none",
            outline: "none",
            fontSize: "1.2rem",
            marginTop: "-9px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            lineHeight: "0.8",
            paddingTop: "6px",
          }}
        >
          <FiFilter style={{ fontSize: "1.2rem", marginLeft: "20px", marginTop: "1px" }} />
          <span style={{ marginTop: "3.9px" }}>فلتر</span>
        </button>
      </div>

      <div style={{
        width: "120%",
        marginTop: "10px",
        display: "grid",
        gridTemplateColumns: "50px 1fr 1fr 1fr 1fr",
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
        <div><AiOutlineUser style={{ marginLeft: "5px", fontSize: "25px", color: "#6B7280" }} /></div>
        <div>اسم الموظف</div>
        <div>البريد الإلكتروني</div>
        <div>تاريخ التوظيف</div>
        <div>عدد الساعات</div>
      </div>

      <div style={{
        width: "120%",
        border: "1px solid #e0e0e0",
        borderTop: "none",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        {filteredEmployees.map((employee) => (
          <div 
            key={employee.id}
            style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr 1fr 1fr 1fr",
              padding: "8px 10px",
              textAlign: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderBottom: "1px solid #f0f0f0",
              transition: "background-color 0.2s",
              fontSize: "14px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img 
                src={employee.image} 
                alt={employee.name}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            </div>
            <div style={{ minWidth: "140px", padding: "0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{employee.name}</div>
            <div style={{ flex: 10, minWidth: "140px", padding: "0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{employee.email}</div>
            <div style={{ flex: -10, minWidth: "140px", padding: "0 4px" }}>{employee.date}</div>
            <div style={{ flex: -10, padding: "0 4px" }}>{employee.hoursWorked}</div>
            <div style={{ display: "flex", gap: "6px", justifyContent: "center", padding: "0 4px" }}>
           
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeManagement;