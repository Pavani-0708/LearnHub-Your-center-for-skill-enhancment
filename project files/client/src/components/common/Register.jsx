import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axiosInstance from './AxiosInstance';
import Dropdown from 'react-bootstrap/Dropdown';

const Register = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Select Role');
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setData({ ...data, type: eventKey });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data?.name || !data?.email || !data?.password || !data?.type) {
      return alert("Please fill all fields");
    } else if (!emailRegex.test(data.email)) {
      return alert("Invalid email format");
    }

    axiosInstance.post('/api/user/register', data)
      .then((response) => {
        if (response.data.success) {
          alert("Registration successful!");
          navigate('/login');
        } else {
          alert("Registration failed: " + response.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          alert("Registration failed: " + error.response.data.message);
        } else {
          alert("Registration failed. Please try again.");
        }
        console.log("Error:", error);
      });
  };

  return (
    <>
      {/* 🌈 Navbar */}
      <Navbar expand="lg" style={{ background: 'linear-gradient(to right, #8360c3, #2ebf91)', padding: '10px' }} variant="dark">
        <Container fluid>
          <Navbar.Brand><h2 style={{ color: 'white' }}>Study App</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Link to={'/'} style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Home</Link>
              <Link to={'/login'} style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Login</Link>
              <Link to={'/register'} style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 💖 Register Box */}
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '90vh', paddingTop: '30px' }}>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 500,
              width: '100%',
              padding: 4,
              background: '#ffffff',
              borderRadius: '15px',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ bgcolor: '#2ebf91', mb: 2 }} />
            <Typography component="h1" variant="h5" sx={{ color: '#333', fontWeight: 600 }}>
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                margin="normal"
                required
              />

              <Dropdown className="mt-3">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" style={{ width: '100%' }}>
                  {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: '100%' }}>
                  <Dropdown.Item onClick={() => handleSelect("Student")}>Student</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("Teacher")}>Teacher</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, bgcolor: '#8360c3', color: 'white', '&:hover': { bgcolor: '#2ebf91' } }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#2ebf91', textDecoration: 'none', fontWeight: 600 }}>
                      Sign In
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Register;