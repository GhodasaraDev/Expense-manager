const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // UserID is handled by _id, but we can add a custom field if needed. 
  // For now we'll rely on _id or map it if strictly required, but standard Mongo uses _id.
  UserName: { type: String, required: true, maxlength: 250 },
  EmailAddress: { type: String, required: true, maxlength: 500, unique: true },
  Password: { type: String, required: true, maxlength: 50 }, // In real app, hash this!
  MobileNo: { type: String, required: true, maxlength: 50 },
  ProfileImage: { type: String, maxlength: 500 },
}, { 
  timestamps: { createdAt: 'Created', updatedAt: 'Modified' } 
});

module.exports = mongoose.model('User', userSchema);
