import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const IncomeContext = createContext({
  incomes: [],
  addIncome: () => {},
  updateIncome: () => {},
  deleteIncome: () => {},
  getIncomeById: () => {},
});

export const IncomeProvider = ({ children }) => {
  const { user } = useAuth();
  const [incomes, setIncomes] = useState([]);

  // Fetch incomes
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await api.get('/incomes');
        const mappedIncomes = response.data.map(i => ({
            id: i._id,
            title: i.Description,
            amount: i.Amount,
            category: i.IncomeDetail, // Map to category
            date: i.IncomeDate ? i.IncomeDate.split('T')[0] : '',
            projectId: i.ProjectID
        }));
        setIncomes(mappedIncomes);
      } catch (err) {
        console.error("Failed to fetch incomes", err);
      }
    };
    fetchIncomes();
  }, [user]);

  const addIncome = async (income) => {
    if (!user) return;
    try {
        const payload = {
            IncomeDate: income.date,
            Amount: income.amount,
            Description: income.title,
            IncomeDetail: income.category,
            ProjectID: income.projectId,
            PeopleID: user.id,
            UserID: user.id
        };
        const response = await api.post('/incomes', payload);
        const newIncome = {
            id: response.data._id,
            title: response.data.Description,
            amount: response.data.Amount,
            category: response.data.IncomeDetail,
            date: response.data.IncomeDate.split('T')[0],
            projectId: response.data.ProjectID
        };
        setIncomes((prev) => [...prev, newIncome]);
    } catch (err) {
        console.error("Failed to add income", err);
    }
  };

  const updateIncome = async (updatedIncome) => {
    try {
        const payload = {
            IncomeDate: updatedIncome.date,
            Amount: updatedIncome.amount,
            Description: updatedIncome.title,
            IncomeDetail: updatedIncome.category,
            ProjectID: updatedIncome.projectId
        };
        const response = await api.put(`/incomes/${updatedIncome.id}`, payload);
        const mapped = {
            id: response.data._id,
            title: response.data.Description,
            amount: response.data.Amount,
            category: response.data.IncomeDetail,
            date: response.data.IncomeDate.split('T')[0],
            projectId: response.data.ProjectID
        };
        setIncomes((prev) =>
          prev.map((inc) =>
            inc.id === mapped.id ? mapped : inc
          )
        );
    } catch (err) {
        console.error("Failed to update income", err);
    }
  };

  const deleteIncome = async (id) => {
    try {
        await api.delete(`/incomes/${id}`);
        setIncomes((prev) => prev.filter((inc) => inc.id !== id));
    } catch (err) {
        console.error("Failed to delete income", err);
    }
  };

  const getIncomeById = (id) => {
    return incomes.find(e => e.id === id || e.id === String(id));
  }

  return (
    <IncomeContext.Provider value={{ incomes, addIncome, updateIncome, deleteIncome, getIncomeById }}>
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => useContext(IncomeContext);
