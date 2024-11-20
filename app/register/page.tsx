"use client";
import React, { useState } from "react";
import TopNav from "../components/TopNav";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [initialForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  })
  const [formData, setFormData] = useState<FormData>(initialForm);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialForm);
  
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), 
    });
  
    const data = await res.json();
    console.log(data);
  };
  
  return (
    <>
    <TopNav />
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col space-y-4 border w-1/3 h-2/3 rounded-2xl">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        <div className="w-full max-w-xs">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleFormChange}
            placeholder="Type here"
            value={formData.name}
            className="input input-bordered w-full"
            required
          />
        </div>
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
        <div className="w-full max-w-xs">
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
        <button className="btn btn-outline " type="submit">
          Register
        </button>
      </form>
    </div>
    </>
  );
};

export default RegisterPage;
