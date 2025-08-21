import { useState, useCallback } from "react";
import Header from "./Header";
import { apiRequest } from "../lib/apiClient";
import { MdEmail } from "react-icons/md";
export default function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const validateForm = useCallback(() => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (email.trim() === "") {
      newErrors.email = "Email is required";
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }
    if (password_confirmation.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // if (password.length > 0 && password.length < 8) {
    //   newErrors.password = "Password must be at least 8 characters long";
    // } else if (password.length > 72) {
    //   newErrors.password = "Password must be less than 72 characters";
    // } else if (password.length >= 8) {
    //   if (!/[A-Z]/.test(password)) {
    //     newErrors.password = "Must contain at least one uppercase letter";
    //   } else if (!/[a-z]/.test(password)) {
    //     newErrors.password = "Must contain at least one lowercase letter";
    //   } else if (!/[0-9]/.test(password)) {
    //     newErrors.password = "Must contain at least one number";
    //   } else if (!/[^A-Za-z0-9]/.test(password)) {
    //     newErrors.password = "Must contain at least one special character";
    //   }
    // }

    if (password_confirmation && password !== password_confirmation) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  }, [name, email, password, password_confirmation]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!validateForm()) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiRequest("/api/create-admin", {
        method: "POST",
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });

      console.log(res);

      if (res.status === true) {
        console.log("Added successfully");
        localStorage.setItem("access_token", res.result.data.access_token);
        setMessage({ text: "Admin added successfully", type: "success" });

        setName("");
        setEmail("");
        setPassword("");
        setpassword_confirmation("");
      } else {
        setMessage({
          text: res.result || "Failed to add admin",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: error.message || "An error occurred", type: "error" });
    } finally {
      // This will run in both success and failure cases
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl">
      <Header />
      <style>
        <style>
          {`
    /* Placeholder الأبيض الشفاف */
    .native-eye-white::placeholder {
      color: #ccc;
    }

    /* زر الإكمال التلقائي (Chrome) */
    .native-eye-white::-webkit-credentials-auto-fill-button,
    .native-eye-white::-webkit-credentials-auto-fill-button:hover {
      background-color: white;
    }

    /* زر إظهار كلمة المرور (Edge / IE) */
    input[type="password"]::-ms-reveal {
      display: none;
    }

    /* رسالة الخطأ */
    .form-error {
      color: #664ae2ff; /* أحمر من Tailwind - red-500 */
      font-size: 0.875rem;
    }

    /* رسالة التنبيه (نجاح أو فشل) */
    .form-message {
      color: #16a34a; /* أخضر - green-600 */
      font-weight: bold;
      font-size: 1rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  `}
        </style>
      </style>

      <div className="parent">
        <div className="register">
          <form
            onSubmit={handleSubmit}
            style={{
              width: "400px",
              padding: "20px",
              borderRadius: "10px",
              border: "2px solid #e2e8f0",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "right",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-65%, -50%)",

              backgroundColor: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(59, 130, 246, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            {message.text && <div className="form-message">{message.text}</div>}
            <div className="cen">
              <h2 className="text-2xl font-semibold text-center mb-2">
                Add Admin
              </h2>
            </div>
            <div className="ce">
              <p className="text-sm text-center text-gray-300 mb-6">
                Please enter the required information to add a new admin
              </p>
            </div>

            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateForm("name", e.target.value);
              }}
              className="form-input"
            />
            {errors.name && <div className="form-error">{errors.name}</div>}

            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateForm("email", e.target.value);
              }}
              className="form-input"
            />
            {errors.email && <div className="form-error">{errors.email}</div>}

            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateForm("password", e.target.value);
              }}
              className="form-input"
            />
            {errors.password && (
              <div className="form-error">{errors.password}</div>
            )}

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={password_confirmation}
              onChange={(e) => {
                setpassword_confirmation(e.target.value);
                validateForm("password_confirmation", e.target.value);
              }}
              className="form-input"
            />
            {errors.confirmPassword && (
              <div className="form-error">{errors.confirmPassword}</div>
            )}

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: isLoading ? "#ccc" : "white",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  color: "#2b2d42",
                  padding: "12px 28px",
                  fontSize: "18px",
                  borderRadius: "8px",
                  border: "2px solid #2b2d42",
                  transition: "all 0.3s ease",
                  transform: "scale(1)",
                  boxShadow: "none",
                  position: "relative",
                  overflow: "hidden",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
                className="native-eye-white"
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.borderColor = "#3b82f6";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "#2b2d42";
                }}
              >
                {isLoading ? "Adding Admin..." : "Add Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
