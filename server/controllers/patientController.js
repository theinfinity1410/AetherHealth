// const { Patient } = require('../models/Patient');
// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const xlsx = require('xlsx');

// // Upload Report
// const uploadReport = async (req, res) => {
//   try {
//     const { patientId } = req.body;
//     const filePath = req.file.path;

//     const patient = await Patient.findByPk(patientId);
//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     patient.reports = [...(patient.reports || []), filePath];
//     await patient.save();

//     res.status(200).json({ message: 'Report uploaded successfully', filePath });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Extract PDF Data
// const extractPDFData = async (filePath) => {
//   const dataBuffer = fs.readFileSync(filePath);
//   const data = await pdfParse(dataBuffer);
//   const jsonData = {
//     content: data.text,
//   };
//   return jsonData;
// };

// // Extract Excel Data
// const extractExcelData = (filePath) => {
//   const workbook = xlsx.readFile(filePath);
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];
//   const jsonData = xlsx.utils.sheet_to_json(sheet);
//   return jsonData;
// };

// // Save Manually Inputted Data
// const saveMedicalInfo = async (req, res) => {
//   try {
//     const { patientId, medicalInfo } = req.body;

//     const patient = await Patient.findByPk(patientId);
//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     patient.medicalInfo = medicalInfo;
//     await patient.save();

//     res.status(200).json({ message: 'Medical info saved successfully', data: patient.medicalInfo });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get Medical Info
// const getMedicalInfo = async (req, res) => {
//   try {
//     const { patientId } = req.params;

//     const patient = await Patient.findByPk(patientId);
//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     res.status(200).json({ medicalInfo: patient.medicalInfo, reports: patient.reports });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   uploadReport,
//   saveMedicalInfo,
//   getMedicalInfo,
// };
