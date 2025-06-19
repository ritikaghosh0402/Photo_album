import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import AllPhotos from './pages/AllPhotos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/all-photos" element={<AllPhotos />} />
      </Routes>
    </Router>
  );
}

export default App;
