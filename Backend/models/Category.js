const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  CategoryName: { type: String, required: true, maxlength: 250 },
  LogoPath: { type: String, maxlength: 250 },
  IsExpense: { type: Boolean, required: true, default: false },
  IsIncome: { type: Boolean, required: true, default: false },
  IsActive: { type: Boolean, required: true, default: true },
  Description: { type: String, maxlength: 500 },
  Sequence: { type: Number },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { 
  timestamps: { createdAt: 'Created', updatedAt: 'Modified' } 
});

module.exports = mongoose.model('Category', categorySchema);
