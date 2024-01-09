import csvModel from '../models/csv.model.js';
import fs from 'fs';
import path from 'path';

async function getAllCSVFiles(req, res) {
  const uploadsDirectory = './uploads';

  try {
    // Read the contents of the uploads directory
    const files = await fs.promises.readdir(uploadsDirectory);
    // Filter only CSV files
    const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');

    res.status(200).json({success:true,files:csvFiles}); // Render the EJS view with the list of CSV files
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

  async function getCSVData(req, res) {
    const filePath = `./uploads/${req.params.filename}`;
    
    try {
      const data = await csvModel.readCSV(filePath);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  export { getAllCSVFiles, getCSVData };
