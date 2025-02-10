import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../state/authSlice";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle submit is working");
    getData();

    // dispatch(RegisterUser(formData));
    // navigate("/");

    console.log("Register Data:", formData);
  };

  const getData = async () => {
    const { name, email, password, role } = formData;

    const res = await axios.post("http://localhost:3000/api/v1/user/register", {
      name,
      email,
      password,
      role,
    });
    console.log(res);
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-[#f02e65]">
          Register
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#f02e65] focus:border-transparent"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#f02e65] focus:border-transparent"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#f02e65] focus:border-transparent"
            required
          />

          {/* Role Selection */}
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="host"
                checked={formData.role === "host"}
                onChange={handleChange}
                className="text-[#f02e65] focus:ring-[#f02e65]"
              />
              <span className="ml-2">Organize</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
                className="text-[#f02e65] focus:ring-[#f02e65]"
              />
              <span className="ml-2">Attend</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f02e65] text-white py-2 rounded-lg hover:bg-[#d02857] transition-colors"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#f02e65] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
