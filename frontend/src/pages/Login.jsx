import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate()

  const dispatch= useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    console.log("Login Data:", formData);
  };
const getData= async()=>{
   const res = await axios.get("http://localhost:3000/api/v1/user/check-working")
   console.log(res)
}
  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-[#f02e65]">Login</h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="w-full bg-[#f02e65] text-white py-2 rounded-lg hover:bg-[#d02857] transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#f02e65] font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
