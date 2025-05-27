import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const containerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#28a745",
  border: "none",
  color: "white",
  fontSize: "18px",
  borderRadius: "4px",
  cursor: "pointer",
};

const messageStyle = {
  textAlign: "center",
  marginBottom: "15px",
  color: "red",
};

const switchAuthStyle = {
  textAlign: "center",
  marginTop: "10px",
  fontSize: "14px",
};

function Register() {
  // Gunakan satu state objek untuk semua input
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk handle perubahan input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Kirim semua field username, email, password
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setMessage(data.message || "Registrasi gagal");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan jaringan");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Register</h2>
      {message && <div style={messageStyle}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <button style={buttonStyle} type="submit">
          Register
        </button>
      </form>
      <div style={switchAuthStyle}>
        Sudah punya akun? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;
