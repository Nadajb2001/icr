import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import './login.css';
  import { apiRequest } from '../lib/apiClient';

export default function AuthForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    if (field === "email") {
      newErrors.email = value.trim() ? "" : "Email is required";
    }
    if (field === "password") {
      newErrors.password = value.trim() ? "" : "Password is required";
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    validateField("email", email);
    validateField("password", password);
    return email.trim() && password.trim();
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage({ text: "", type: "" });

  if (!validateForm()) {
    setMessage({ text: "Please fill in all fields", type: "error" });
    return;
  }

  setIsLoading(true);

  try {
    const res = await apiRequest('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    console.log(res);
    if (res.status === true) {
      localStorage.setItem('access_token', res.result.data.access_token);
      navigate('/Dashboard');
    } else {
      setMessage({ text: res.result || "Login failed", type: "error" });
    }
  } catch (error) {
    console.error("Login error:", error);
    setMessage({ text: "An error occurred during login", type: "error" });
  } finally {
    setIsLoading(false); 
  }
};


  return (
    <div dir="rtl">
      <Header />
      <style>
        {`
          .form-error {
            color: #3b82f6;
            font-size: 0.9em;
          }
          .message {
            color: #3b82f6;
            text-align: center;
            margin-bottom: 1rem;
          }
        `}
      </style>
      <div className="parent">
        <div className="register">
          <form onSubmit={handleSubmit} className="your-form-styling">
            {message.text && <div className="message">{message.text}</div>}

            <div className="cen">
              <h2 className="text-2xl font-semibold text-center mb-2">
                Account Access
              </h2>
            </div>
            <div className="ce">
              <p className="text-sm text-center text-gray-300 mb-6">
                Enter your Email and Password to login 
              </p>
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              className="form-input"
            />
            {errors.email && <div className="form-error">{errors.email}</div>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              className="form-input"
            />
            {errors.password && (
              <div className="form-error">{errors.password}</div>
            )}

            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "15px",
              }}
            >
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
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
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
                {isLoading ? "Processing..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
