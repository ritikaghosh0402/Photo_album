import React from 'react';
import UploadForm from '../components/UploadForm';

const Home = () => (
  <div className="p-6">
    <UploadForm onUpload={() => window.location.reload()} />
  </div>
);

export default Home;
