// src/components/signup-view/signup-view.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta?.env?.VITE_API_URL || process.env.API_URL || "https://apirolli-movieapi-7215bc5accc0.herokuapp.com";

export const SignupView = ({ onLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(""); // "YYYY-MM-DD" from input[type=date]
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();            // <- prevents double submit via form navigation
    if (submitting) return;        // guard
    setError("");
    setSubmitting(true);

    try {
      // Create user
      const signupRes = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday ? new Date(birthday).toISOString().slice(0, 10) : undefined
        })
      });

      if (signupRes.status === 201 || signupRes.status === 200) {
        // Auto-login after successful sign up
        const loginRes = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Username: username, Password: password })
        });

        if (!loginRes.ok) {
          const t = await loginRes.text();
          throw new Error(t || "Login failed after sign up.");
        }

        const { user, token } = await loginRes.json();
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        if (typeof onLoggedIn === "function") onLoggedIn(user, token);

        navigate("/", { replace: true });

        return;
      }

      // Handle known validation errors
      const text = await signupRes.text();
      if (signupRes.status === 409 || /exists/i.test(text)) {
        setError("Username already exists. Try a different one.");
      } else if (signupRes.status === 400) {
        setError(text || "Invalid input. Check username, email, and password.");
      } else {
        setError(text || `Sign up failed (status ${signupRes.status}).`);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={5}
                required
                autoComplete="username"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Birthday</label>
              <input
                type="date"
                className="form-control"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={submitting}
            >
              {submitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
