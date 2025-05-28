import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: (newUser) =>
      axios
        .post(`http://localhost:6001/api/auth/register`, newUser)
        .then((res) => res.data),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (mutation.isError) {
      mutation.reset(); // Reset the error state when the user starts typing again
    }
    if (mutation.isSuccess) {
      mutation.reset(); // Reset the success state when the user starts typing again
    }
    if (mutation.isLoading) {
      mutation.reset(); // Reset the loading state when the user starts typing again
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 justify-center items-center bg-red-200 rounded shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <div className="flex  gap-2">
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
        <label className="font-semibold text-lg" htmlFor="email">
          Email:
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded p-2"
          id="email"
          autoComplete="email"
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
          autoFocus
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors duration-200">
        {mutation.isLoading ? "Signing up..." : "Sign Up"}
      </button>
      {mutation.isError && (
        <div style={{ color: "red" }}>
          {mutation.error?.response?.data?.message || "Sign up failed"}
        </div>
      )}
      {mutation.isSuccess && (
        <div style={{ color: "green" }}>Sign up successful!</div>
      )}
    </form>
  );
}

export default SignUp;
