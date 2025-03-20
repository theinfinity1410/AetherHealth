// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const {
//   uploadReport,
//   saveMedicalInfo,
//   getMedicalInfo
// } = require('../controllers/patientController');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/'); // Save to 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // Upload Report (PDF or Excel)
// router.post('/upload-report', upload.single('report'), uploadReport);

// // Save Manually Inputted Data
// router.post('/save-medical-info', saveMedicalInfo);

// // Get Medical Info
// router.get('/get-medical-info/:patientId', getMedicalInfo);

// module.exports = router;
