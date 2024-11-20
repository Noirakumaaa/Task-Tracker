"use client";
import React, { useState } from "react";
import Cookies from "js-cookie"; 
import { redirect } from 'next/navigation';
import TopNav from "../components/TopNav";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok && data.role === "User") {
      Cookies.set('token', data.token, { expires: 1, path: '/'});
      Cookies.set('role', data.role, { expires: 1, path: '/'});
      console.log('Token Set:', Cookies.get('token'));
      

      redirect('/v1/home');
    } else {
      setErrorMessage("Login failed");
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <>
    <TopNav />
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col space-y-4 border w-1/3 h-2/3 rounded-2xl"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="w-full max-w-xs">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleFormChange}
            placeholder="Type here"
            value={formData.email}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="w-full max-w-xs ">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type here"
            onChange={handleFormChange}
            value={formData.password}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button className="btn btn-outline" type="submit">
          Login
        </button>
        {errorMessage}
      </form>
    </div>
    </>
  );
};

export default LoginPage;
