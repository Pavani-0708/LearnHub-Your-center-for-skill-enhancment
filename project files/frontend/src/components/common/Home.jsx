import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import AllCourses from './AllCourses';

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" style={{ background: 'linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)' }} variant="dark" className="py-3 shadow-lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-2 text-white">🌟 Study App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto gap-4">
              <Nav.Link as={Link} to="/" className="text-light fw-semibold">🏠 Home</Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-light fw-semibold">🔐 Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-light fw-semibold">📝 Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="hero-section text-center text-shadow" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 50, 0.5), rgba(0, 0, 50, 0.6)), url(https://images.unsplash.com/photo-1603570423448-ec8b1bdc1f8d?auto=format&fit=crop&w=1500&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        color: 'white',
      }}>
        <div className="overlay d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-3 fw-bold text-warning text-glow">📚 Learn Smart, Grow Fast</h1>
          <p className="lead fs-4 text-light">Empower Your Mind with <span className="text-primary fw-bold">Next-Gen Learning</span></p>
          <Link to="/register">
            <Button variant="primary" size="lg" className="mt-3 fw-bold text-white px-4 py-2 shadow">🌈 Get Started</Button>
          </Link>
        </div>
      </div>

      {/* Trending Courses */}
      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold text-success">🚀 Top Trending Courses</h2>
        <AllCourses />
      </Container>
    </>
  );
};

export default Home;