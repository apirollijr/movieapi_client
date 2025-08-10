import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export const NavigationBar = ({
  user,
  onLogout,
  onShowLogin,
  onShowSignup,
  onShowHome,
  onShowProfile
}) => {
  const username = user?.Username || user?.username;

  return (
    <Navbar bg="light" expand="md" className="mb-3 shadow-sm">
      <Container>
        <Navbar.Brand role="button" onClick={onShowHome}>myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav" className="justify-content-end">
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small">Hello, {username}</span>
              <Button type="button" variant="outline-primary" size="sm" onClick={onShowHome}>
                Home
              </Button>
              <Button type="button" variant="outline-secondary" size="sm" onClick={onShowProfile}>
                Profile
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Button type="button" variant="primary" size="sm" onClick={onShowLogin}>
                Login
              </Button>
              <Button type="button" variant="outline-secondary" size="sm" onClick={onShowSignup}>
                Sign up
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
