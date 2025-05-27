import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../utils";


const EditNote = () => {
const [date, setDate] = useState("");
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [category, setCategory] = useState("");
const navigate = useNavigate();
const{id} = useParams();

const updateNote = async(e) => {
    e.preventDefault();
    try {
        await axios.patch(`${BASE_URL}/notes/${id}`,{
            date,
            title,
            content,
            category
        });
        navigate("/");
    } catch (error) {
        console.log(error);
        
    }
};

const getNoteById = async() => {
    const response = await axios.get(`${BASE_URL}/notes/${id}`);
    setDate(response.data.date);
    setTitle(response.data.title);
    setContent(response.data.content);
    setCategory(response.data.category);
}
  return (
    <div className="columns is-centered mt-6">
        <div className="column is-half">
        <form onSubmit={updateNote}>
                        <div className="field">
                            <label className="label has-text-weight-semibold">Tanggal</label>
                            <div className="control">
                                <input
                                    type="date"
                                    className="input "
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-weight-semibold">Kategori</label>
                            <div className="control">
                                <div className="select is-fullwidth ">
                                <input
                                    type="text"
                                    className="input "
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Masukkan judul Anda..."
                                />
                                </div>
                            </div>
                        </div>
                        

                        <div className="field">
                            <label className="label has-text-weight-semibold">Isi Catatan</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input "
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Masukkan catatan Anda..."
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-weight-semibold">Isi Catatan</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input "
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Masukkan catatan Anda..."
                                />
                            </div>
                        </div>

                        <div className="field mt-4 is-flex is-justify-content-space-between">
                            <button
                                type="button"
                                className="button is-light  has-text-weight-semibold is-flex-grow-1 mx-1"
                                onClick={() => navigate(-1)}
                            >
                                Kembali
                            </button>
                            <button
                                type="submit"
                                className="button is-primary  has-text-weight-semibold is-flex-grow-1 mx-1"
                            >
                                Update Catatan
                            </button>
                        </div>

                    </form>
        </div>
    </div>
  );
};

export default EditNote
