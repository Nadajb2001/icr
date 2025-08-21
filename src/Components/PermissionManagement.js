import React, { useState, useEffect } from "react";
import { CiSearch, CiCirclePlus } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { AiOutlineLock } from "react-icons/ai"; // تغيير الأيقونة

const PermissionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [permissions, setPermissions] = useState(() => {
    const savedPermissions = localStorage.getItem("permissions");
    if (savedPermissions) {
      return JSON.parse(savedPermissions); // استخدام القيم المخزنة
    } else {
      const defaultPermissions = [
        {
          id: 1,
          name: "إدارة المستخدمين",
          description: "السماح بإدارة المستخدمين في النظام.",
        },
        {
          id: 2,
          name: "إدارة الفواتير",
          description: "السماح بإدارة الفواتير والمصروفات.",
        },
        {
          id: 3,
          name: "إدارة التقارير",
          description: "السماح بإنشاء تقارير مفصلة.",
        },
        {
          id: 4,
          name: "إدارة الإعدادات",
          description: "السماح بتغيير إعدادات النظام.",
        },
        {
          id: 5,
          name: "إدارة الأذونات",
          description: "السماح بتعديل أذونات المستخدمين.",
        },
      ];
      return defaultPermissions; // قم بإرجاع البيانات الافتراضية
    }
  });

  useEffect(() => {
    localStorage.setItem("permissions", JSON.stringify(permissions));
  }, [permissions]);

  const [filteredPermissions, setFilteredPermissions] = useState(permissions);

  const handleViewPermission = (id) => {
    const permission = permissions.find(perm => perm.id === id);
    if (permission) {
      alert(`\nاسم الإذن: ${permission.name}\nالوصف: ${permission.description}`);
    } else {
      console.log(`لم يتم العثور على إذن برقم: ${id}`);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = permissions.filter(permission => 
        permission.name.includes(term) // البحث عن الاسم
      );
      setFilteredPermissions(filtered);
    } else {
      setFilteredPermissions(permissions); // إذا كان الحقل فارغًا، عرض جميع الأذونات
    }
  };

  const handleDeletePermission = (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا الإذن؟");
    if (confirmDelete) {
      const updatedPermissions = permissions.filter(perm => perm.id !== id);
      setPermissions(updatedPermissions);
      setFilteredPermissions(updatedPermissions); // تحديث القائمة المصفاة أيضاً
      console.log(`حذف إذن برقم: ${id}`);
    } else {
      console.log(`تم إلغاء حذف الإذن برقم: ${id}`);
    }
  };

  const addPermission = () => {
    const permissionName = prompt("أدخل اسم الإذن:");
    const description = prompt("أدخل الوصف:");

    if (permissionName && description) {
      const newPermission = {
        id: permissions.length + 1,
        name: permissionName,
        description: description,
      };

      setPermissions([...permissions, newPermission]);
      setFilteredPermissions([...permissions, newPermission]); // تحديث القائمة المصفاة أيضاً
      console.log("تم إضافة إذن جديد:", newPermission);
    } else {
      console.log("يرجى إدخال جميع المعلومات المطلوبة.");
    }
  };

  const filterData = () => {
    const filterCriteria = prompt("أدخل معايير الفلترة (مثل اسم الإذن):");
    if (filterCriteria) {
      const filtered = permissions.filter(permission => 
        (permission.name && permission.name.includes(filterCriteria))
      );
      setFilteredPermissions(filtered); // تحديث قائمة الأذونات المصفاة
      console.log("تم تصفية البيانات:", filtered);
    } else {
      console.log("لم يتم إدخال معايير الفلترة.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }} // رفع المكونات لأعلى
    >
      <div
        style={{
          position: "relative",
          flex: "1",
          display: "flex",
          alignItems: "center"
        }}
      >
        <CiSearch
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
          onClick={addPermission}
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
          <CiCirclePlus
            style={{ 
              width: "20px",
              height: "20px", 
              marginLeft: "16px"
            }}
          />
          إضافة إذن جديد
        </button>
        <button
          onClick={filterData}
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
          <FiFilter style={{ 
            fontSize: "1.2rem",
            marginLeft: "20px",
            marginTop: "1px"
          }} />
          <span style={{ marginTop: "3.9px" }}>فلتر</span>
        </button>
      </div>

      <div style={{
        width: "120%",
        marginTop: "10px",
        display: "grid",
        gridTemplateColumns: "50px 1fr 1fr 120px", // إضافة عمود للأزرار
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
        <div> <AiOutlineLock style={{ marginLeft: "5px", fontSize: "25px", color: "#6B7280" }} /></div>
        <div>اسم الإذن</div>
        <div>الوصف</div>
        <div>الإجراءات</div> {/* عنوان عمود الإجراءات */}
      </div>

      <div style={{
        width: "120%",
        border: "1px solid #e0e0e0",
        borderTop: "none",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        {filteredPermissions.map((permission) => (
          <div 
            key={permission.id}
            style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr 1fr 120px", // إضافة عمود للأزرار
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
              <AiOutlineLock style={{ fontSize: "30px", color: "#10B981" }} />
            </div>
            <div style={{ minWidth: "140px", padding: "0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{permission.name}</div>
            <div style={{ flex: 10, minWidth: "140px", padding: "0 4px" }}>{permission.description}</div>

            <div style={{ 
              display: "flex", 
              gap: "6px",
              justifyContent: "center",
              padding: "0 4px"
            }}>
              <button
                onClick={() => handleViewPermission(permission.id)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  color: "#10B981",
                  border: "1px solid #10B981",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0FDF4";
                  e.currentTarget.style.color = "#059669";
                  e.currentTarget.style.borderColor = "#059669";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#10B981";
                  e.currentTarget.style.borderColor = "#10B981";
                }}
              >
                عرض
              </button>
              <button
                onClick={() => handleDeletePermission(permission.id)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  color: "#EF4444",
                  border: "1px solid #EF4444",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FEF2F2";
                  e.currentTarget.style.color = "#DC2626";
                  e.currentTarget.style.borderColor = "#DC2626";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#EF4444";
                  e.currentTarget.style.borderColor = "#EF4444";
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

export default PermissionManagement;