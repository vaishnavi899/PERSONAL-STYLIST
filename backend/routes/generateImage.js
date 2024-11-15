const express = require('express');
const router = express.Router();
const { spawn } = require('child_process'); // To run Python scripts

// Route to trigger the virtual try-on model
router.post('/generate', (req, res) => {
  const { base_image, clothing_image } = req.body;

  if (!base_image || !clothing_image) {
    return res.status(400).json({ error: 'Both base image and clothing image are required' });
  }

  // Call Python script and pass the images to it
  const pythonProcess = spawn('python', ['../models/model.py', base_image, clothing_image]);

  pythonProcess.stdout.on('data', (data) => {
    // Handle output from Python script (e.g., output image path)
    console.log(`Python Output: ${data}`);
    res.status(200).json({ message: 'Image generated successfully', imagePath: data.toString() });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
    res.status(500).json({ error: 'Error generating image' });
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
  });
});

module.exports = router;
