import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses');
        // Map backend to frontend
        const mappedExpenses = response.data.map(e => ({
            id: e._id,
            title: e.Description, // Map Description to title
            amount: e.Amount,
            category: e.ExpenseDetail, // Map ExpenseDetail to category (temp)
            date: e.ExpenseDate ? e.ExpenseDate.split('T')[0] : '',
            projectId: e.ProjectID
        }));
        setExpenses(mappedExpenses);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      }
    };
    fetchExpenses();
  }, [user]);

  // ADD
  const addExpense = async (expense) => {
    if (!user) return;
    try {
        const payload = {
            ExpenseDate: expense.date,
            Amount: expense.amount,
            Description: expense.title,
            ExpenseDetail: expense.category, // Storing category name here for now
            ProjectID: expense.projectId,
            PeopleID: user.id, // Required by schema
            UserID: user.id
        };
        const response = await api.post('/expenses', payload);
        const newExpense = {
            id: response.data._id,
            title: response.data.Description,
            amount: response.data.Amount,
            category: response.data.ExpenseDetail,
            date: response.data.ExpenseDate.split('T')[0],
            projectId: response.data.ProjectID
        };
        setExpenses((prev) => [...prev, newExpense]);
    } catch (err) {
        console.error("Failed to add expense", err);
    }
  };

  // UPDATE
  const updateExpense = async (updatedExpense) => {
    try {
        const payload = {
            ExpenseDate: updatedExpense.date,
            Amount: updatedExpense.amount,
            Description: updatedExpense.title,
            ExpenseDetail: updatedExpense.category,
            ProjectID: updatedExpense.projectId
        };
        const response = await api.put(`/expenses/${updatedExpense.id}`, payload);
        const mapped = {
            id: response.data._id,
            title: response.data.Description,
            amount: response.data.Amount,
            category: response.data.ExpenseDetail,
            date: response.data.ExpenseDate.split('T')[0],
            projectId: response.data.ProjectID
        };

        setExpenses((prev) =>
          prev.map((exp) =>
            exp.id === mapped.id ? mapped : exp
          )
        );
    } catch (err) {
        console.error("Failed to update expense", err);
    }
  };

  // DELETE
  const deleteExpense = async (id) => {
    try {
        await api.delete(`/expenses/${id}`);
        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
        console.error("Failed to delete expense", err);
    }
  };

  const getExpenseById = (id) => {
      return expenses.find(e => e.id === id || e.id === String(id));
  }

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense, getExpenseById }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
