import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoginPage from '@/components/LoginPage';
import { Box, Typography, Button } from '@mui/material';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('crew_token');
    if (token) {
      validateToken(token);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const permissionsResponse = await axios.get('http://127.0.0.1:8000/api/user-permissions', {
        headers: { Authorization: `Token ${token}` },
      });

      const { role, modules } = permissionsResponse.data;

      localStorage.setItem('role', role);
      // localStorage.setItem('modules', JSON.stringify(modules));

      if (role === 'superadmin') {
        router.push('/dashboard/superadmin');
      } else if (role === 'admin') {
        router.push('/dashboard/admin');
      } else if (role === 'agent') {
        router.push('/dashboard/agent');
      }
    } catch (error) {
      console.error('Token validation failed', error);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('modules');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/dj-rest-auth/login/', { username, password });
      const { key } = response.data;

      console.log("key", key);
      debugger;

      localStorage.setItem('crew_token', key);
      document.cookie = `token=${key};path=/`;

      validateToken(key);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <LoginPage>
      <form onSubmit={handleLogin}>
        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="body1"
            component="label"
            htmlFor="username"
          >
            Username
          </Typography>
          <Box
            component="input"
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{
              width: "100%",
              marginTop: 1,
              padding: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
            }}
          />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="body1"
            component="label"
            htmlFor="password"
          >
            Password
          </Typography>
          <Box
            component="input"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{
              width: "100%",
              marginTop: 1,
              padding: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
            }}
          />
        </Box>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
    </LoginPage>
  );
}
