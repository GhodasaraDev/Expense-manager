const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  ExpenseDate: { type: Date, required: true },
  CategoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  SubCategoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  PeopleID: { type: mongoose.Schema.Types.ObjectId, ref: 'People', required: true },
  ProjectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  Amount: { type: Number, required: true },
  ExpenseDetail: { type: String, maxlength: 500 },
  AttachmentPath: { type: String, maxlength: 250 },
  Description: { type: String, maxlength: 500 },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { 
  timestamps: { createdAt: 'Created', updatedAt: 'Modified' } 
});

module.exports = mongoose.model('Expense', expenseSchema);
