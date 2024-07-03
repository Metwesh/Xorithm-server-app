"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Link from "next/link";
import ErrorWrapper from "@/components/errorWrapper";

export default function Login() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  function validateForm() {
    // Initialize an object to keep track of form errors
    let errorObject = {
      name: "",
      email: "",
      password: "",
    };

    let isValid = true;

    // Check if email, and password are not empty
    if (!formValues.email) {
      errorObject.email = "Email is required";
      isValid = false;
    }
    if (!formValues.password) {
      errorObject.password = "Password is required";
      isValid = false;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formValues.email && !emailRegex.test(formValues.email)) {
      errorObject.email = "Please enter a valid email address";
      isValid = false;
    }

    // Check if password is at least 6 characters long
    if (formValues.password && formValues.password.length < 6) {
      errorObject.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setFormErrors({ ...errorObject });

    // Return both the validation status and the errors object
    return isValid;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    sessionStorage.setItem("token", "your_token_here");
    router.push("/"); // Redirect to home page
    // Submit data to server
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-cyan-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <ErrorWrapper error={formErrors.email} />
            </div>

            {/* Add password input field with onChange handler */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
                value={formValues.password}
                onChange={handleInputChange}
              />
              <ErrorWrapper error={formErrors.password} />
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                Don&apos;t have an account yet?&nbsp;
                <Link
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register now
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
