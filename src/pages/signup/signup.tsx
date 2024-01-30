import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import { TextField } from "@mui/material";
import { snackBarStore } from "../../context/states";
export type formDataType = {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
};
function Signup() {
  const [formData, setFormData] = useState<formDataType>({
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [labels, setLabels] = useState({
    emailLabel: "Email",
    passwordLabel: "",
    passwordPlaceholder: "Password",
    passwordHelperText: "",
    emailHelperText: "",
    firstNameHelperText: "",
    lastNameHelperText: "",
  });
  const navigate = useNavigate();
  const openSnackBar = snackBarStore((store) => store.openSnackBar);
  return (
    <div className="login-container">
      <div className="login-overlay bg-[rgb(0,0,0,0.6)] h-screen w-full p-6">
        <h1 className="logo">
          S<span className="text-5xl">HEDFLI</span>X
        </h1>
        <div className="login-form bg-black p-9 h-fit">
          <h2 className="text-white text-4xl">Sign Up</h2>
          <div className="mb-10 flex flex-col gap-5">
            <div className="flex gap-3">
              <TextField
                label="First Name"
                variant="standard"
                color="warning"
                required
                helperText={labels.firstNameHelperText}
                className="!rounded-sm"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                }}
                onBlur={(e) => {
                  const isValid = /^.{1,}$/.test(e.target.value);
                  if (!isValid) {
                    setLabels({
                      ...labels,
                      firstNameHelperText: "This field is required",
                    });
                  } else {
                    setLabels({
                      ...labels,
                      firstNameHelperText: "",
                    });
                  }
                }}
              />
              <TextField
                label="Last Name"
                variant="standard"
                color="warning"
                required
                helperText={labels.lastNameHelperText}
                className="!rounded-sm"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                }}
                onBlur={(e) => {
                  const isValid = /^.{1,}$/.test(e.target.value);
                  if (!isValid) {
                    setLabels({
                      ...labels,
                      lastNameHelperText: "This field is required",
                    });
                  } else {
                    setLabels({
                      ...labels,
                      lastNameHelperText: "",
                    });
                  }
                }}
              />
            </div>
            <TextField
              value={formData.userName}
              type="email"
              label={"Email"}
              className="rounded-sm !transition-all"
              color="warning"
              variant="standard"
              helperText={labels.emailHelperText}
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
                    emailHelperText: "Please enter a valid email.",
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
              label={"Password"}
              // placeholder={labels.passwordPlaceholder}
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
              try {
                const response = await axios.post(
                  "http://localhost:8081/api/signup",
                  formData
                );
                console.log(response);
                if (response.data.auth) {
                  console.log(response.data.user);
                  navigate("/login");
                  openSnackBar("Please Login with details", "success");
                }
              } catch (error) {
                console.log(error);
                openSnackBar(error.response.data.message, "error");
              }
            }}
          >
            Sign Up
          </button>
          <p className="text-gray-500">
            Already have an account?{"   "}
            <Link to="/login" className="text-white">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
