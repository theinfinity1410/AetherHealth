import {Doctor, Patient} from '../models/assc.js';

/** ✅ Fetch Patients for a Doctor */
export const getPatients = async (req, res) => {
    try {
        const { doc_id } = req.params;

        // Find doctor and fetch associated patients
        const doctor = await Doctor.findOne({
            where: { doctor_id: doc_id },
            include: [{ model: Patient, as: 'patients' }]
        });

        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        res.status(200).json({ patients: doctor.patients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
