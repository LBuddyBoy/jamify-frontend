import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import "../style/loginForm.css";
import { useState } from "react";

export default function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const credentials = { email, password };

    try {
      await login(credentials);
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };

  return (
    <form action={handleSubmit} id="loginForm">
      <h1>Login</h1>
      <input type="text" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      {error && <p className="errorText">{error}</p>}
      <p>
        {"Don't have an account?"} <Link to={"/register"}>Register here!</Link>
      </p>
      <button>Login</button>
    </form>
  );
}
