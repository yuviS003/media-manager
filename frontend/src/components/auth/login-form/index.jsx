import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { login } from "@/api/auth";
import { enqueueSnackbar } from "notistack";
import { useGlobalContext } from "@/context/GlobalContext";
import CustomButton from "@/components/custom/custom-button";

const LoginForm = ({ switchAuthForms }) => {
  const { setToken } = useGlobalContext();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (event) => {
    if (event) event.preventDefault();
    if (!loginForm?.email?.length || !loginForm?.password?.length) return;

    try {
      setLoading(true);

      const { email, password } = loginForm;
      const response = await login(email, password);
      if (response?.success) {
        if (loginForm?.rememberMe) {
          localStorage.setItem("user_token", response?.token);
        } else {
          sessionStorage.setItem("user_token", response?.token);
        }
        setToken(response?.token);
        enqueueSnackbar(response?.message || "Login successful", {
          variant: "success",
        });
        window.location.href = "/dashboard/media";
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message ||
          error?.message ||
          "Internal Server Error",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="w-full flex flex-col gap-4 mt-5"
      onSubmit={handleFormSubmit}
    >
      <TextField
        label="User Email"
        required
        placeholder="Enter your email"
        fullWidth
        type="email"
        size="small"
        color="success"
        autoFocus
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={loginForm.email}
        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
      />
      <FormControl
        fullWidth
        size="small"
        variant="outlined"
        required
        color="success"
      >
        <InputLabel htmlFor="login-password">Password</InputLabel>
        <OutlinedInput
          id="login-password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                size="small"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox size="small" />}
        label="Remember me"
        checked={loginForm.rememberMe}
        onChange={(e) =>
          setLoginForm({ ...loginForm, rememberMe: e.target.checked })
        }
        sx={{ my: -1.5 }}
      />
      <CustomButton
        type="submit"
        variant="contained"
        color="success"
        text="Login"
        endIcon={loading ? <></> : <LoginIcon />}
        isLoading={loading}
      />
      <Button
        type="button"
        variant="outlined"
        color="success"
        onClick={switchAuthForms}
      >
        New user? Register
      </Button>
    </form>
  );
};

export default LoginForm;
