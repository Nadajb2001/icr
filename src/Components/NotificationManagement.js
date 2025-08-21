import React, { useState, useEffect } from "react";
import { CiSearch, CiCirclePlus } from "react-icons/ci";
import { AiOutlineBell } from "react-icons/ai";

const NotificationManagement = () => {
  // بدون بيانات افتراضية
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });
  const [filteredNotifications, setFilteredNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // حفظ أي تغيير إلى localStorage + مزامنة التصفية
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    setFilteredNotifications(notifications);
  }, [notifications]);

  // حالة المودال للحذف
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  // إضافة إشعار (بنفس أسلوبك عبر prompt)
  const addNotification = () => {
    const title = prompt("أدخل عنوان الإشعار:");
    const description = prompt("أدخل وصف الإشعار:");
    const date = prompt("أدخل تاريخ الإشعار (YYYY-MM-DD):");
    const recipients = prompt("أدخل المرسل (مفصولين بفواصل):");

    if (title && description && date && recipients) {
      const newNotification = {
        id: Date.now(),
        title,
        description,
        date,
        recipients,
      };
      setNotifications((prev) => [...prev, newNotification]);
    }
  };

  // تعديل إشعار
  const handleEditNotification = (id) => {
    const note = notifications.find((n) => n.id === id);
    if (!note) return;

    const title = prompt("تعديل عنوان الإشعار:", note.title);
    const description = prompt("تعديل وصف الإشعار:", note.description);
    const date = prompt("تعديل تاريخ الإشعار (YYYY-MM-DD):", note.date);
    const recipients = prompt("تعديل المرسل:", note.recipients);

    if (title && description && date && recipients) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, title, description, date, recipients } : n
        )
      );
    }
  };

  // تأكيد الحذف
  const confirmDeleteNotification = () => {
    if (selectedNotificationId == null) return;
    setNotifications((prev) =>
      prev.filter((n) => n.id !== selectedNotificationId)
    );
    setShowConfirm(false);
    setSelectedNotificationId(null);
  };

  return (
    <div
      className="flex flex-col items-center justify-end mb-4 mt-2 pr-4 relative z-10"
      style={{ marginLeft: "30px", marginRight: "250px", marginTop: "-30px" }}
    >
      {/* شريط البحث (كما هو) */}
      <div style={{ position: "relative", flex: "1", display: "flex", alignItems: "center" }}>
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
        <style>
          {`
            input::placeholder {
              color: #4B5563;
            }
          `}
        </style>
      </div>

      {/* زر إضافة إشعار (نفس الستايل) */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        marginTop: "15px",
      }}>
        <button
          onClick={addNotification}
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
            cursor: "pointer",
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
          <CiCirclePlus style={{ width: "20px", height: "20px", marginLeft: "16px" }} />
          Add Notification
        </button>
      </div>

      {/* الهيدر (أضفت عمود Actions فقط وحافظت على التصميم) */}
      <div style={{
        width: "120%",
        marginTop: "10px",
        display: "grid",
        gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 140px", // زدت عمود الأكشن
        backgroundColor: "#f5f5f5",
        padding: "8px 5px",
        fontWeight: "bold",
        border: "1px solid #e0e0e0",
        borderRadius: "8px 8px 0 0",
        background: "#E5E7EB",
        textAlign: "center",
        alignItems: "center",
        fontSize: "14px",
      }}>
        <div><AiOutlineBell style={{ marginLeft: "5px", fontSize: "25px", color: "#6B7280" }} /></div>
        <div>Title</div>
        <div>Description</div>
        <div>Date</div>
        <div>Sender</div>
        <div>Actions</div>
      </div>

      {/* المحتوى (نفس الشبكة بالضبط + عمود الأكشن) */}
      <div style={{
        width: "120%",
        border: "1px solid #e0e0e0",
        borderTop: "none",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                display: "grid",
                gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 140px",
                padding: "4px 5px",
                textAlign: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderBottom: "1px solid #f0f0f0",
                transition: "background-color 0.2s",
                fontSize: "14px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AiOutlineBell style={{ fontSize: "30px", color: "#6B7280" }} />
              </div>

              <div style={{ minWidth: "140px", padding: "0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {notification.title}
              </div>
              <div style={{ minWidth: "140px", padding: "0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {notification.description}
              </div>
              <div style={{ minWidth: "140px", padding: "0 4px" }}>
                {notification.date}
              </div>
              <div style={{ minWidth: "140px", padding: "0 4px" }}>
                {notification.recipients}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "6px", justifyContent: "center", padding: "0 4px" }}>
                <button
                  onClick={() => handleEditNotification(notification.id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "white",
                    color: "#3B82F6",
                    border: "1px solid #3B82F6",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(true);
                    setSelectedNotificationId(notification.id);
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
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "12px", textAlign: "center", color: "#6B7280" }}>
            لا توجد إشعارات
          </div>
        )}
      </div>

      {/* مودال تأكيد الحذف (بنفس روح تصميمك) */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.1)",
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
            <p>Are you sure you want to delete this notification?</p>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={confirmDeleteNotification}
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
    </div>
  );
};

export default NotificationManagement;
