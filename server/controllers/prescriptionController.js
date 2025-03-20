//import Prescription  from '../models/Prescription.js';
import {Doctor, Patient,Prescription} from '../models/assc.js';
// export const createPrescription = async (req, res) => {
//     try {
//         const { doctorId, patientId, medication, dosage, instructions } = req.body;

//         // Check if doctor and patient exist
//         const doctor = await Doctor.findByPk(doctorId);
//         const patient = await Patient.findByPk(patientId);

//         if (!doctor || !patient) {
//             return res.status(404).json({ message: 'Doctor or Patient not found' });
//         }

//         // Create prescription
//         const prescription = await Prescription.create({
//             doctorId,
//             patientId,
//             medication,
//             dosage,
//             instructions,
//         });

//         res.status(201).json(prescription);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getPrescriptionsByPatient = async (req, res) => {
//     try {
//         const { patientId } = req.params;
//         const prescriptions = await Prescription.findAll({
//             where: { patientId },
//             include: [
//                 { model: Doctor, attributes: ['id', 'name', 'email'] }
//             ]
//         });
//         res.status(200).json(prescriptions);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const updatePrescription = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { medication, dosage, instructions } = req.body;

//         const prescription = await Prescription.findByPk(id);
//         if (!prescription) {
//             return res.status(404).json({ message: 'Prescription not found' });
//         }

//         prescription.medication = medication || prescription.medication;
//         prescription.dosage = dosage || prescription.dosage;
//         prescription.instructions = instructions || prescription.instructions;

//         await prescription.save();

//         res.status(200).json(prescription);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const deletePrescription = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const prescription = await Prescription.findByPk(id);
//         if (!prescription) {
//             return res.status(404).json({ message: 'Prescription not found' });
//         }

//         await prescription.destroy();

//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // export { 
// //     createPrescription,
// //     getPrescriptionsByPatient,
// //     updatePrescription,
// //     deletePrescription
// // };

export const createPrescription = async (req, res) => {
    try {
        const { doctor_id, patient_id, medication, dosage, instructions } = req.body;

        const doctor = await Doctor.findByPk(doctor_id);
        if (!doctor) return res.status(400).json({ message: "Invalid doctor ID" });

        const patient = await Patient.findByPk(patient_id);
        if (!patient) return res.status(400).json({ message: "Invalid patient ID" });

        const prescription = await Prescription.create({
            doctor_id,
            patient_id,
            medication,
            dosage,
            instructions
        });

        res.status(201).json({ message: "Prescription created successfully", prescription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getPrescriptionsByPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;

        const prescriptions = await Prescription.findAll({
            where: { patient_id },
            include: [{ model: Doctor, attributes: ["name", "email"] }],
            order: [["createdAt", "DESC"]]
        });

        if (prescriptions.length === 0) {
            return res.status(404).json({ message: "No prescriptions found for this patient" });
        }

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getPrescriptionsForPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;

        const prescriptions = await Prescription.findAll({
            where: { patient_id },
            include: [{ model: Doctor, attributes: ["doctor_id", "name"] }],
            order: [["createdAt", "DESC"]]
        });

        if (prescriptions.length === 0) {
            return res.status(404).json({ message: "No prescriptions found" });
        }

        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updatePrescription = async (req, res) => {
    try {
        const { prescription_id } = req.params;
        const { medication, dosage, instructions } = req.body;

        const prescription = await Prescription.findByPk(prescription_id);
        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        if (req.user.role !== "doctor" || req.user.id !== prescription.doctor_id) {
            return res.status(403).json({ message: "Unauthorized to update this prescription" });
        }

        prescription.medication = medication || prescription.medication;
        prescription.dosage = dosage || prescription.dosage;
        prescription.instructions = instructions || prescription.instructions;

        await prescription.save();

        res.status(200).json({ message: "Prescription updated successfully", prescription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deletePrescription = async (req, res) => {
    try {
        const { prescription_id } = req.params;

        const prescription = await Prescription.findByPk(prescription_id);
        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        if (req.user.role !== "doctor" || req.user.id !== prescription.doctor_id) {
            return res.status(403).json({ message: "Unauthorized to delete this prescription" });
        }

        await prescription.destroy();

        res.status(200).json({ message: "Prescription deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
