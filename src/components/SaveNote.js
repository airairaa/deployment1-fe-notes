import axios from "axios";
import { BASE_URL } from "../utils";

/**
 * Fungsi untuk menyimpan catatan ke backend dengan token Bearer.
 * @param {Object} noteData - Data catatan yang akan dikirim, misal { date, title, category, content }
 * @returns {Promise<Object>} - Data response dari backend
 * @throws {Error} - Jika token tidak ditemukan atau request gagal
 */
export const saveNote = async (noteData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token tidak ditemukan");
  
    const response = await axios.post(
      `${BASE_URL}/notes`,
      noteData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };
