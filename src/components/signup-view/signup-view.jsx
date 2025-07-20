// src/components/signup-view/signup-view.jsx
import React, { useState } from "react";

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password || !email) {
      setError("Please fill in all required fields.");
      return;
    }

    fetch("https://apirolli-movieapi-7215bc5accc0.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Username) {
          onSignedUp(); // callback to parent
        } else {
          setError(data.message || "Signup failed. Try again.");
        }
      })
      .catch(() => setError("Something went wrong. Please try again."));
  };

  return (
    <form className="signup-view" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <input
        className="form-control"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-control"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="form-control"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control"
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <button className="btn" type="submit">Sign Up</button>
    </form>
  );
};
