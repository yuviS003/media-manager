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
import { enqueueSnackbar } from "notistack";
import { signup } from "@/api/auth";
import CustomButton from "@/components/custom/custom-button";
import { useGlobalContext } from "@/context/GlobalContext";

const SignupForm = ({ switchAuthForms }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    username: "",
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
    if (
      !signupForm?.email?.length ||
      !signupForm?.password?.length ||
      !signupForm?.username
    )
      return;

    try {
      setLoading(true);
      const { email, password, username } = signupForm;
      const response = await signup(username, email, password);
      if (response?.success) {
        if (signupForm?.rememberMe) {
          localStorage.setItem("user_token", response?.token);
        } else {
          sessionStorage.setItem("user_token", response?.token);
        }
        setToken(response?.token);
        enqueueSnackbar(response?.message || "Register successful", {
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
        label="Username"
        required
        placeholder="Enter your username"
        fullWidth
        type="text"
        size="small"
        color="success"
        autoFocus
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={signupForm?.username}
        onChange={(e) =>
          setSignupForm({ ...signupForm, username: e.target.value })
        }
      />
      <TextField
        label="User Email"
        required
        placeholder="Enter your email"
        fullWidth
        type="email"
        size="small"
        color="success"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={signupForm?.email}
        onChange={(e) =>
          setSignupForm({ ...signupForm, email: e.target.value })
        }
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
          required
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
          value={signupForm?.password}
          onChange={(e) =>
            setSignupForm({ ...signupForm, password: e.target.value })
          }
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox size="small" />}
        label="Remember me"
        sx={{ my: -1.5 }}
        checked={signupForm?.rememberMe}
        onChange={(e) =>
          setSignupForm({ ...signupForm, rememberMe: e.target.checked })
        }
      />
      <CustomButton
        type="submit"
        variant="contained"
        color="success"
        text="Register"
        endIcon={loading ? <></> : <LoginIcon />}
        isLoading={loading}
      />
      <Button
        type="button"
        variant="outlined"
        color="success"
        onClick={switchAuthForms}
      >
        Already registered? Login
      </Button>
    </form>
  );
};

export default SignupForm;
