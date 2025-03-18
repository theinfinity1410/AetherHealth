const { Prescription } = require('../models');

// ✅ Create Prescription
const createPrescription = async (req, res) => {
    try {
        const { doctorId, patientId, prescriptionText } = req.body;

        if (!doctorId || !patientId || !prescriptionText) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const prescription = await Prescription.create({
            doctorId,
            patientId,
            prescriptionText
        });

        res.status(201).json(prescription);
    } catch (error) {
        console.error('Error creating prescription:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Get Prescription for a Patient
const getPrescriptionsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        const prescriptions = await Prescription.findAll({
            where: { patientId }
        });

        res.status(200).json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createPrescription,
    getPrescriptionsByPatient
};
