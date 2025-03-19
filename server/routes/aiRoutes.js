import express from "express";
import multer from "multer";
import { processMedicalReport } from "../controllers/reportsController.js";
import { processaiRecommend } from "../controllers/aiController.js";
import {patMiddleware} from "../middlewares/authMiddleware.js";  

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/medical-report", patMiddleware, upload.single("file"), processMedicalReport);

router.post("/ai-recommend", patMiddleware, upload.single("file"), processaiRecommend);

export default router;
