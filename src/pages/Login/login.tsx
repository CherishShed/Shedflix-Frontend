import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 w-1/2 mx-auto my-auto">
      <input
        value={formData.userName}
        type="email"
        placeholder="email"
        className="p-2"
        autoComplete="false"
        onChange={(e) => {
          setFormData({ ...formData, userName: e.target.value.trim() });
        }}
      />
      <input
        type="password"
        placeholder="password"
        className="p-2"
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
      />
      <button
        className="text-red-500 p-4 border rounded-md"
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
        Login
      </button>
      <Link to="/signup" className="text-green-400">
        Register
      </Link>
    </div>
  );
}

export default Login;
