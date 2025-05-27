import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token di fetchNotes:", token);
      if (!token) {
        console.log("Token tidak ditemukan, redirect ke login");
        navigate("/login");
        return;
      }
      const response = await axios.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Gagal mengambil data notes:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", color: "white" }}>
      <h1>Dashboard Notes</h1>
      <button
        onClick={() => navigate("/add-note")}

        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Add New
      </button>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Logout
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <th style={{ padding: "10px" }}>No</th>
            <th style={{ padding: "10px" }}>Tanggal</th>
            <th style={{ padding: "10px" }}>Judul</th>
            <th style={{ padding: "10px" }}>Kategori</th>
            <th style={{ padding: "10px" }}>Isi Catatan</th>
          </tr>
        </thead>
        <tbody>
          {notes.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                Tidak ada catatan.
              </td>
            </tr>
          ) : (
            notes.map((note, index) => (
              <tr key={note.id || index} style={{ borderBottom: "1px solid #444" }}>
                <td style={{ padding: "10px" }}>{index + 1}</td>
                <td style={{ padding: "10px" }}>{note.date}</td>
                <td style={{ padding: "10px" }}>{note.title}</td>
                <td style={{ padding: "10px" }}>{note.category}</td>
                <td style={{ padding: "10px" }}>{note.content}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
