const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  PeopleCode: { type: String, maxlength: 50 },
  Password: { type: String, required: true, maxlength: 50 },
  PeopleName: { type: String, required: true, maxlength: 250 },
  Email: { type: String, required: true, maxlength: 150 },
  MobileNo: { type: String, required: true, maxlength: 50 },
  Description: { type: String, maxlength: 500 },
  IsActive: { type: Boolean, default: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { 
  timestamps: { createdAt: 'Created', updatedAt: 'Modified' } 
});

module.exports = mongoose.model('People', peopleSchema);
