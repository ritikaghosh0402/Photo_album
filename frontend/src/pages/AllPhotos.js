import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllPhotos = () => {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    const res = await axios.get('http://localhost:5000/api/photos');
    setPhotos(res.data.reverse());
  };

  const handleLike = async (id) => {
    await axios.put(`http://localhost:5000/api/photos/${id}/like`);
    fetchPhotos();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this photo?")) {
      await axios.delete(`http://localhost:5000/api/photos/${id}`);
      fetchPhotos();
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-100 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">📸 All Photos</h1>
          <Link to="/" className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition">
            ⬅️ Back to Upload
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <img
                src={`http://localhost:5000${photo.imageUrl}`}
                alt={photo.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-slate-800 truncate">{photo.title}</h3>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleLike(photo.id)}
                    className="flex items-center gap-1 text-pink-600 hover:scale-110 transition"
                  >
                    <Heart size={20} className="fill-pink-300/30" />
                    <span>{photo.likes}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="text-center text-slate-600 mt-10">No photos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default AllPhotos;
