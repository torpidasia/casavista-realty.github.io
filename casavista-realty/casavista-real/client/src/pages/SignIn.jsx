import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?house,real-estate')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 p-6 max-w-lg w-full bg-gray-900 bg-opacity-90 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold mb-7 text-white">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 text-white"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 text-white"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-orange-500 text-white p-3 rounded-lg uppercase hover:bg-orange-600 disabled:opacity-50 w-full"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="text-center mt-4">
          <p className="text-white">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-orange-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
