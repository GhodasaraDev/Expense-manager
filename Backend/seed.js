const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Expense = require('./models/Expense');
const Income = require('./models/Income');
const Category = require('./models/Category');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Expense.deleteMany({});
    await Income.deleteMany({});
    await Category.deleteMany({});

    console.log('Cleared existing data...');

    // Create User
    const user = new User({
      UserName: "Demo User",
      EmailAddress: "demo@example.com",
      Password: "password123", // Plain text for demo
      MobileNo: "1234567890"
    });
    const savedUser = await user.save();
    console.log('User created:', savedUser.UserName);

    // Create Projects
    const project1 = new Project({
      ProjectName: "Website Redesign",
      Description: "Revamping the corporate website",
      UserID: savedUser._id
    });
    const savedProject1 = await project1.save();

    const project2 = new Project({
      ProjectName: "Mobile App",
      Description: "Flutter based mobile application",
      UserID: savedUser._id
    });
    const savedProject2 = await project2.save();
    console.log('Projects created');

    // Create Categories
    const cat1 = new Category({
        CategoryName: "Office Supplies",
        IsExpense: true,
        UserID: savedUser._id
    });
    const savedCat1 = await cat1.save();
    
    const cat2 = new Category({
        CategoryName: "Consulting",
        IsIncome: true,
        UserID: savedUser._id
    });
    const savedCat2 = await cat2.save();
    console.log('Categories created');

    // Create Expenses
    await Expense.create({
      ExpenseDate: new Date(),
      CategoryID: savedCat1._id,
      PeopleID: savedUser._id, // Using user as people for simplicity
      ProjectID: savedProject1._id,
      Amount: 150.00,
      Description: "Purchased new keyboard",
      UserID: savedUser._id
    });
    
    await Expense.create({
      ExpenseDate: new Date(),
      CategoryID: savedCat1._id,
      PeopleID: savedUser._id,
      ProjectID: savedProject2._id,
      Amount: 50.00,
      Description: "Server hosting fee",
      UserID: savedUser._id
    });
    console.log('Expenses created');

    // Create Incomes
    await Income.create({
      IncomeDate: new Date(),
      CategoryID: savedCat2._id,
      PeopleID: savedUser._id,
      ProjectID: savedProject1._id,
      Amount: 2000.00,
      Description: "Milestone payment",
      UserID: savedUser._id
    });
    console.log('Incomes created');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
