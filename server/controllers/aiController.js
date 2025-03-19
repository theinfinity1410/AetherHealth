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
export const processaiRecommend = async (req, res) => {
  try {
    const { patientId } = req.body;
    if(!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const patient = await Patient.findByPk(patient_id);
    if(!patient){
      return res.status(404).json({ error: "Patient not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(req.file.path);
    const fileBuffer = fs.readFileSync(filePath);

    // LLaMA API Request
    const apiRequestJson = {
      messages: [
        {
          role: "user",
          content: "You are an expert AI specialized in cardiology and heart-related diseases. You will receive a JSON-formatted medical report containing a patient's health details. Analyze the data and generate AI-driven recommendations in JSON format."
        },
        {
          role: "user",
          content: "Follow this strict JSON structure:",
        }
      ],
      functions: [
        {
          name: "generate_health_recommendations",
          description: "Analyzes a medical report and provides personalized health recommendations.",
          parameters: {
            type: "object",
            properties: {
              diet_recommendations: {
                type: "array",
                items: { type: "string" },
                description: "List of diet modifications based on the patient's condition."
              },
              exercise_recommendations: {
                type: "array",
                items: { type: "string" },
                description: "List of recommended physical activities for the patient."
              },
              medication_guidance: {
                type: "string",
                description: "General guidance on prescribed medications and any necessary precautions."
              },
              lifestyle_changes: {
                type: "array",
                items: { type: "string" },
                description: "Lifestyle modifications recommended for the patient."
              },
              follow_up_advice: {
                type: "string",
                description: "When the patient should visit a doctor for follow-up."
              },
              warning_signs: {
                type: "array",
                items: { type: "string" },
                description: "List of symptoms that require immediate medical attention."
              }
            },
            required: ["diet_recommendations", "exercise_recommendations", "medication_guidance", "lifestyle_changes", "follow_up_advice", "warning_signs"]
          }
        }
      ],
      function_call: "generate_health_recommendations",
      stream: false
    };

    // Call LLaMA API
    const response = await llamaAPI.run(apiRequestJson);
    const structuredData = response.data || { error: "Failed to extract data" };

    await patient.update({ ai_recommendations: structuredData.json });

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    // Send back structured JSON
    return res.json({ success: true, extracted_data: structuredData });

  } catch (error) {
    console.error("Error processing report:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};