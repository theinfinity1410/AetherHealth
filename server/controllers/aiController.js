import LlamaAI from 'llamaai';
import dotenv from 'dotenv';
import {Patient} from '../models/assc.js';
import fs from "fs";
import path from "path";

dotenv.config();

const apiToken = process.env.LLAMA_API_TOKEN;
const llamaAPI = new LlamaAI(apiToken);
/**
 * Process medical reports (PDF/Image) and extract structured data
 */
export const processMedicalReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(req.file.path);
    const fileBuffer = fs.readFileSync(filePath);

    // LLaMA API Request
    const apiRequestJson = {
      messages: [{ role: "user", content: "Extract medical data from this document and format it into structured JSON." }],
      files: [{ name: req.file.originalname, data: fileBuffer.toString("base64") }],
      functions: [
        {
          name: "extract_medical_info",
          description: "Extracts structured medical information from the document",
          parameters: {
            type: "object",
            properties: {
              patient_name: { type: "string", description: "Full name of the patient" },
              age: { type: "integer", description: "Age of the patient" },
              gender: { type: "string", description: "Gender of the patient" },
              report_date: { type: "string", description: "Date of the medical report (YYYY-MM-DD)" },
              doctor_name: { type: "string", description: "Name of the doctor who issued the report" },
              hospital_name: { type: "string", description: "Name of the hospital" },
              diagnosis: { type: "array", items: { type: "string" }, description: "List of diagnosed conditions" },
              symptoms: { type: "array", items: { type: "string" }, description: "List of reported symptoms" },
              medications: { type: "array", items: { type: "string" }, description: "Prescribed medications" },
              test_results: {
                type: "object",
                properties: {
                  heart_rate: { type: "integer", description: "Heart rate in bpm" },
                  blood_pressure: { type: "string", description: "Blood pressure reading (e.g., 120/80 mmHg)" },
                  cholesterol_level: { type: "integer", description: "Cholesterol level in mg/dL" },
                  ecg_findings: { type: "string", description: "Summary of ECG findings" },
                  other_tests: { type: "array", items: { type: "string" }, description: "List of other test results" }
                }
              },
              additional_notes: { type: "string", description: "Any additional notes from the doctor" }
            },
            required: ["patient_name", "age", "gender", "report_date"]
          }
        }
      ],
      stream: false,
      function_call: "extract_medical_info"
    };

    // Call LLaMA API
    const response = await llamaAPI.run(apiRequestJson);
    const structuredData = response.data || { error: "Failed to extract data" };

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    // Send back structured JSON
    return res.json({ success: true, extracted_data: structuredData });

  } catch (error) {
    console.error("Error processing report:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};