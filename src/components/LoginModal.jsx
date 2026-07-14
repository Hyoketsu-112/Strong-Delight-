// components/LoginModal.jsx
import React, { useState } from "react";

const LoginModal = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(password)) {
      setPassword("");
      setError("");
    } else {
      setError("Invalid password. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <div className="modal-header">
          <h2>
            <i className="fas fa-user-shield"></i> Owner Access
          </h2>
          <button onClick={onClose} className="close-modal">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="login-icon">
            <i className="fas fa-lock"></i>
          </div>

          <p className="login-description">
            Enter the owner password to access the admin portal
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="password">
                <i className="fas fa-key"></i> Password
              </label>
              <div className="input-with-toggle">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter owner password"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <button type="submit" className="login-btn">
              <i className="fas fa-sign-in-alt"></i>
              Access Admin Portal
            </button>
          </form>

          <div className="login-note">
            <i className="fas fa-info-circle"></i>
            <p>
              This area is restricted to authorized personnel only. Please
              ensure you have proper authorization before proceeding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
