import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  return (
    <div className="flex flex-col gap-4 w-1/2 mx-auto my-auto">
      <input
        type="email"
        placeholder="email"
        className="p-2"
        autoComplete="false"
        value={formData.userName}
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
      <input
        type="text"
        placeholder="First Name"
        className="p-2"
        value={formData.firstName}
        onChange={(e) => {
          setFormData({ ...formData, firstName: e.target.value.trim() });
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="p-2"
        value={formData.lastName}
        onChange={(e) => {
          setFormData({ ...formData, lastName: e.target.value.trim() });
        }}
      />

      <button
        className="text-red-500 p-4 border rounded-md"
        type="submit"
        onClick={async () => {
          const response = await axios.post(
            "http://localhost:8081/api/signup",
            formData
          );
          console.log(response);
        }}
      >
        Signup
      </button>
      <Link to="/login" className="text-green-400">
        Login
      </Link>
    </div>
  );
}

export default Signup;
