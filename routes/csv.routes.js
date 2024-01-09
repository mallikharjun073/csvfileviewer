import express from "express"
import {getAllCSVFiles, getCSVData}  from '../controllers/csv.controller.js';
const router = express.Router();
import multer from "multer";

// Configure multer storage with custom filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the destination folder
    },
    filename: function (req, file, cb) {
      const customFilename = `${Date.now()}_${file.originalname}`;
      cb(null, customFilename); // Set the custom filename
    }
  });
  
  const upload = multer({ storage: storage });
  

router.get('/files', getAllCSVFiles);
router.get('/data/:filename', getCSVData);
router.post('/upload', upload.single('csvfile'), (req, res) => {
  return res.status(200).json({ success: true, message: 'File uploaded successfully.' });
});

export default router;
