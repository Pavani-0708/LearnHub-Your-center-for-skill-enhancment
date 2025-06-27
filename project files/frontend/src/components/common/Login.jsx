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

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    }

    axiosInstance.post('/api/user/login', data)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.userData));
          navigate('/dashboard');
          setTimeout(() => window.location.reload(), 1000);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("User doesn't exist");
        }
        navigate("/login");
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
              <Link to="/" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Home</Link>
              <Link to="/login" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 💖 Login Box */}
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '90vh', paddingTop: '30px' }}>
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
            <Avatar sx={{ bgcolor: '#8360c3', mb: 2 }} />
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
              Sign In
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                value={data.password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: '#2ebf91',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#8360c3',
                  },
                }}
              >
                Sign In
              </Button>

              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#2ebf91', textDecoration: 'none', fontWeight: 600 }}>
                      Sign Up
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

export default Login;