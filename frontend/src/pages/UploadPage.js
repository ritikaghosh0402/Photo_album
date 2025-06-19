import React from 'react';
import UploadForm from '../components/UploadForm';
import { Link } from 'react-router-dom';

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-md shadow-xl border border-white/40 rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6"> Upload Your Photo</h1>
        <UploadForm />
        <div className="text-center mt-6">
          <Link to="/all-photos" className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
            📸 See All Photos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
