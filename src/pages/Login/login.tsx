import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { TextField } from "@mui/material";
function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [labels, setLabels] = useState({
    emailLabel: "Email",
    passwordLabel: "Password",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    passwordHelperText: "",
    emailHelperText: "",
  });
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-overlay bg-[rgb(0,0,0,0.6)] h-screen w-full p-6">
        <h1 className="logo">
          S<span className="text-5xl">HEDFLI</span>X
        </h1>
        <div className="login-form left-[calc(70%-400px)] bg-black p-9">
          <h2 className="text-white text-4xl">Sign In</h2>
          <div className="mb-10 flex flex-col gap-5">
            <TextField
              value={formData.userName}
              type="email"
              label={labels.emailLabel}
              className="rounded-sm !transition-all"
              color="warning"
              variant="standard"
              // helperText={labels.emailHelperText}
              FormHelperTextProps={{ color: "warning" }}
              fullWidth
              autoComplete="false"
              onChange={(e) => {
                setFormData({ ...formData, userName: e.target.value.trim() });
              }}
              onBlur={(e) => {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                  e.target.value
                );
                if (!isValid) {
                  setLabels({
                    ...labels,
                    emailHelperText:
                      "Please enter a valid email or phone number.",
                  });
                } else {
                  setLabels({
                    ...labels,
                    emailHelperText: "",
                  });
                }
              }}
            />
            <TextField
              type="password"
              label={labels.passwordLabel}
              helperText={labels.passwordHelperText}
              color="warning"
              variant="standard"
              fullWidth
              className="!rounded-sm"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              onBlur={(e) => {
                const isValid = /^.{8,}$/.test(e.target.value);
                if (!isValid) {
                  setLabels({
                    ...labels,
                    passwordHelperText:
                      "Your password must contain between 8 and 60 characters..",
                  });
                } else {
                  setLabels({
                    ...labels,
                    passwordHelperText: "",
                  });
                }
              }}
            />
          </div>
          <button
            className="bg-red-600 p-4 rounded-md text-white"
            type="submit"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:8081/api/login",
                formData
              );
              console.log(response);
              localStorage.setItem(
                "accessToken",
                `Bearer ${response.data.accessToken}`
              );
              navigate("/");
            }}
          >
            Sign In
          </button>
          <p className="text-gray-500">
            New to Shedflix?{"   "}
            <Link to="/signup" className="text-white">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
