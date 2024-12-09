import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LoginPage from "@/components/LoginPage";
import { ClockLoader } from "react-spinners";
import MainApi from "@/api-manage/MainApi";
import { login } from "@/api-manage/ApiRoutes";
import { usePermissions } from "@/contexts/PermissionsContext";
import { getToken } from "@/utils/getToken";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { fetchPermissions } = usePermissions();
  const token = getToken();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await MainApi.post(`${login}`, { username, password });
      const { key } = response.data;
      localStorage.setItem("crew_token", key);
      document.cookie = `token=${key};path=/`;
      if (rememberMe) {
        localStorage.setItem("remember_me", "true");
      } else {
        localStorage.removeItem("remember_me");
      }
      await fetchPermissions(key);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
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
          <Typography variant="body1" component="label" htmlFor="username">
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
          <Typography variant="body1" component="label" htmlFor="password">
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
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ marginTop: 0 , color:"#9c9c9c"}}
            />
          }
          label={<span style={{ fontSize: "14px" }}>Remember Me</span>}
          sx={{ marginTop: 1 }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, backgroundColor: "#0ab39c" }}
          disabled={loading}
        >
          {loading ? <ClockLoader size={18} color="white" /> : "Sign In"}
        </Button>
        <Typography mt={2} align="center" gutterBottom>
          <Box component="span" sx={{ color: "lightgray", marginRight: "8px" }}>
            --------------------
          </Box>
          <Box component="span" sx={{ color: "gray" }}>
            Sign In with
          </Box>
          <Box component="span" sx={{ color: "lightgray", marginLeft: "8px" }}>
            -------------------
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <GoogleIcon sx={{ cursor: "pointer", color: "#DB4437" }} />
          <FacebookIcon sx={{ cursor: "pointer", color: "#4267B2" }} />
          <TwitterIcon sx={{ cursor: "pointer", color: "#1DA1F2" }} />
          <InstagramIcon sx={{ cursor: "pointer", color: "#C13584" }} />
        </Box>
        <Typography variant="body1" color="red" mt={2}>
          {error}
        </Typography>
      </form>
    </LoginPage>
  );
}
