import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import axiosInstance from "../api/axiosInstance";

const AddNote = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Set tanggal otomatis saat komponen pertama kali dimuat
  useEffect(() => {
    setDate(getTodayDate());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim POST request ke backend
      const response = await axiosInstance.post("/notes", {
        date,
        title,
        category,
        content,
      });

      if (response.status === 201 || response.status === 200) {
        alert("Catatan berhasil ditambahkan!");
        navigate("/dashboard"); // arahkan ke halaman dashboard atau list notes
      }
    } catch (error) {
      if (error.response) {
        // Server merespon dengan status error
        alert(`Request failed: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request dibuat tapi tidak ada respon
        alert("Request failed: No response from server.");
      } else {
        // Error lain
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-half">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label has-text-weight-semibold">Tanggal</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label has-text-weight-semibold">Judul</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul Anda..."
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label has-text-weight-semibold">Kategori</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Masukkan kategori..."
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label has-text-weight-semibold">Isi Catatan</label>
            <div className="control">
              <textarea
                className="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis catatan Anda di sini..."
                required
              />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                type="button"
                className="button is-light"
                onClick={() => navigate("/dashboard")}
              >
                Kembali
              </button>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">
                Tambah Catatan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
