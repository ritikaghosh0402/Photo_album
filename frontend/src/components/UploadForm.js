import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (onUpload) onUpload(res.data);
      setTitle('');
      setImage(null);
    } catch (err) {
      alert('Upload failed. See console.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Photo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-3 rounded-xl bg-white/40 backdrop-blur-md placeholder-slate-600 text-slate-800 focus:outline-none border border-white/50"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
        className="p-3 rounded-xl bg-white/40 backdrop-blur-md text-slate-700 file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 rounded-xl hover:opacity-90 transition"
      >
         Upload Photo
      </button>
    </form>
  );
};

export default UploadForm;
