// src/components/signup-view/signup-view.jsx
import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";

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
    <Card className="p-4 shadow-sm">
      <h2 className="mb-3 text-center">Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="birthday" className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
    </Card>
  );
};
