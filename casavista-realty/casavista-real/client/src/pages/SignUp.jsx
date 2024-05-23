import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <img
        src="https://source.unsplash.com/1600x900/?house,real-estate"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
      />
      <div className="relative z-10 p-6 max-w-lg w-full bg-gray-900 bg-opacity-90 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold mb-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            id="password"
            onChange={handleChange}
          />
          <button
            className="bg-orange-500 text-white p-3 rounded-lg uppercase hover:bg-orange-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-orange-500 hover:underline">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
