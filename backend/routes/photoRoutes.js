const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Photo = require('../models/photo');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('File not uploaded');
      return res.status(400).json({ error: 'Image file is required' });
    }

    const { title } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const photo = await Photo.create({ title, imageUrl });
    res.status(201).json(photo);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});

router.get('/', async (req, res) => {
  try {
    const photos = await Photo.findAll();
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

// Like a photo
router.put('/:id/like', async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    photo.likes += 1;
    await photo.save();
    res.json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error liking photo' });
  }
});

// Delete a photo
router.delete('/:id', async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    await photo.destroy();
    res.json({ message: 'Photo deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting photo' });
  }
});

module.exports = router;
