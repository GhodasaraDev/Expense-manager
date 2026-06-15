const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  ProjectName: { type: String, required: true, maxlength: 250 },
  ProjectLogo: { type: String, maxlength: 250 },
  ProjectStartDate: { type: Date },
  ProjectEndDate: { type: Date },
  ProjectDetail: { type: String, maxlength: 500 },
  Description: { type: String, maxlength: 500 },
  IsActive: { type: Boolean, default: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { 
  timestamps: { createdAt: 'Created', updatedAt: 'Modified' } 
});

module.exports = mongoose.model('Project', projectSchema);
