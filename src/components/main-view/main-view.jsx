// src/components/signup-view/signup-view.jsx
import React, { useState } from "react";

const API_URL =
  import.meta?.env?.VITE_API_URL ||
  process.env.API_URL ||
  "https://apirolli-movieapi-7215bc5accc0.herokuapp.com";

export const SignupView = ({ onBackToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(""); // "YYYY-MM-DD"
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday ? new Date(birthday).toISOString().slice(0, 10) : undefined
        })
      });

      if (res.status === 201 || res.status === 200) {
        // ✅ Successfully registered — return to Login view (state-driven)
        if (typeof onBackToLogin === "function") onBackToLogin();
        return;
      }

      // Show backend validation messages
      const text = await res.text();
      if (res.status === 409 || /exists/i.test(text)) {
        setError("Username already exists. Try a different one.");
      } else if (res.status === 400) {
        setError(text || "Invalid input. Check username, email, and password.");
      } else {
        setError(text || `Sign up failed (status ${res.status}).`);
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <div className="alert alert-danger">{error}</div>}

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

            <button type="submit" className="btn btn-success w-100" disabled={submitting}>
              {submitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => typeof onBackToLogin === "function" && onBackToLogin()}
            >
              Already have an account? Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
