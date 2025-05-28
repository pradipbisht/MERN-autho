import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../store/user/userSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: (newUser) =>
      axios
        .post(`http://localhost:6001/api/auth/login`, newUser)
        .then((res) => res.data),

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(data.user));
      console.log("Login successful. User data:", data);

      const userRole = data.user.role;
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "user") {
        navigate("manager");
      } else {
        navigate("/user");
      }
    },

    onError: (error) => {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      dispatch(signInFailure(error.response?.data?.message || error.message));
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (mutation.isError || mutation.isSuccess || mutation.isLoading) {
      mutation.reset();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInStart()); // <-- Dispatch loading state before request
    mutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 justify-center items-center bg-red-200 rounded shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <div className="flex gap-2">
        <label className="font-semibold text-lg" htmlFor="username">
          Username:
        </label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2"
          id="username"
          autoComplete="username"
          autoFocus
        />
      </div>

      <div>
        <label className="font-semibold text-lg" htmlFor="password">
          Password:
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2"
          id="password"
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isLoading}
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors duration-200">
        {mutation.isLoading ? "Signing in..." : "Sign In"}
      </button>

      {mutation.isError && (
        <div style={{ color: "red" }}>
          {mutation.error?.response?.data?.message || "Sign In failed"}
        </div>
      )}
      {mutation.isSuccess && (
        <div style={{ color: "green" }}>Sign In successful!</div>
      )}
    </form>
  );
}

export default SignIn;
