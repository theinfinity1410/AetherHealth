// import Doctor from './Doctor.js';
// import Patient from './Patient.js';
// import Prescription from './Prescription.js';
// // Define relationships here to prevent circular dependencies
// Doctor.hasMany(Patient, { foreignKey: 'doc_id', onDelete: 'SET NULL' });
// Patient.belongsTo(Doctor, { foreignKey: 'doc_id', onDelete: 'SET NULL' });
// Doctor.hasMany(Prescription, { foreignKey: 'doctorId' });
// Prescription.belongsTo(Doctor, { foreignKey: 'doctorId' });

// Patient.hasMany(Prescription, { foreignKey: 'patientId' });
// Prescription.belongsTo(Patient, { foreignKey: 'patientId' });

// export { Doctor, Patient };
import Doctor from './Doctor.js';
import Patient from './Patient.js';
import Prescription from './Prescription.js';

// Define relationships here to prevent circular dependencies
// Doctor.hasMany(Patient, { foreignKey: 'doc_id', onDelete: 'SET NULL' });
// Patient.belongsTo(Doctor, { foreignKey: 'doc_id', onDelete: 'SET NULL' });
// Prescription.belongsTo(Doctor, { foreignKey: "doctor_id" });
// Prescription.belongsTo(Patient, { foreignKey: "patient_id" });
// export { Doctor, Patient };
// Doctor and Patient relationship
Doctor.hasMany(Patient, { foreignKey: 'doc_id', onDelete: 'SET NULL' });
Patient.belongsTo(Doctor, { foreignKey: 'doc_id', onDelete: 'SET NULL' });

// Prescription and Doctor relationship
Doctor.hasMany(Prescription, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });
Prescription.belongsTo(Doctor, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });

// Prescription and Patient relationship
Patient.hasMany(Prescription, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
Prescription.belongsTo(Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });

export { Doctor, Patient, Prescription };
