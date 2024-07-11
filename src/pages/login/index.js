import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoginPage from '@/components/LoginPage';
import { Box, Typography, Button } from '@mui/material';
import { ClockLoader, PacmanLoader, PulseLoader } from "react-spinners";
import MainApi from '@/api-manage/MainApi';
import { login } from '../../../api-manage/ApiRoutes';
import { usePermissions } from '@/contexts/PermissionsContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { fetchPermissions, permissionsData } = usePermissions();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await MainApi.post(`${login}`, { username, password });
      const { key } = response.data;


      console.log("key", key);


      localStorage.setItem('crew_token', key);
      document.cookie = `token=${key};path=/`;
      await fetchPermissions(key);

      console.log("Permission Data", permissionsData);
      
      router.push("/dashboard");

    } catch (error) {
      console.error('Login failed', error);
      setLoading(false);
      setError(error.response?.data?.non_field_errors);
    } finally {
      setLoading(false);
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
          disabled={loading}
        >
          {loading ? <ClockLoader size={18} color="white" /> : "Login"}
        </Button>
        <Typography
          variant='body1'
          color="red"
          mt={2}>
          {error}
        </Typography>
      </form>
    </LoginPage>
  );
}
