"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import { useRouter } from "next/navigation";
import Notification from "../Notification";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

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
    setShowNotification(true);
    setLoading(true)

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok && data.role === "User") {
      Cookies.set('token', data.token );
      Cookies.set('role', data.role);
      Cookies.set('user_id', data.id);

      // Show notification after successful login
      setLoading(false);
    } else {
      setErrorMessage("Login failed");
    }

    setFormData({ email: "", password: "" });
  };

  useEffect(() => {
    if (showNotification) {
      // After showing the notification for 2 seconds, redirect
      setTimeout(() => {
        router.push(`/v1/${Cookies.get('user_id')}`);
      }, 2000); // 2 seconds timeout before redirect
    }
  }, [showNotification, router]);

  return (
    <>
    <div className="flex justify-center items-center h-[90%]">
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
      </form>
      {showNotification && (loading ? (
        <Notification 
        NotificationName="Loading" 
        NotificationLink="Close" 
        closeNotification={(e) => setShowNotification(e)} 
      />
      ): (
        <Notification 
          NotificationName="Login Successfully" 
          NotificationLink="Close" 
          closeNotification={(e) => setShowNotification(e)} 
        />
      ))}
    </div>
    </>
  );
};

export default LoginForm;
