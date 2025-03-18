import Doctor from './Doctor.js';
import Patient from './Patient.js';

// Define relationships here to prevent circular dependencies
Doctor.hasMany(Patient, { foreignKey: 'doc_id', onDelete: 'SET NULL' });
Patient.belongsTo(Doctor, { foreignKey: 'doc_id', onDelete: 'SET NULL' });

export { Doctor, Patient };
