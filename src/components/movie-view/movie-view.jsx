import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <p className="text-center mt-5">Movie not found.</p>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={movie.ImagePath}
              alt={movie.Title}
              style={{ maxHeight: "450px", objectFit: "cover" }}
            />
            <Card.Body className="text-center">
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Card.Text>
                <strong>Genre:</strong> {movie.Genre?.Name}
              </Card.Text>
              <Card.Text>
                <strong>Director:</strong> {movie.Director?.Name}
              </Card.Text>
              <Button as={Link} to="/" variant="secondary">
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
