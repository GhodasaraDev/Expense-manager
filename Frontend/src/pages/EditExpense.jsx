import { useState, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { useSettings } from "../context/SettingsContext";
import { useProjects } from "../context/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

const EditExpense = () => {
  const { id } = useParams();
  const { getExpenseById, updateExpense } = useExpenses();
  const { getCurrencySymbol } = useSettings();
  const { projects } = useProjects();
  const currencySymbol = getCurrencySymbol();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [projectId, setProjectId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const expense = getExpenseById(id);
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
      setProjectId(expense.projectId || "");
      setDate(expense.date);
    } else {
      navigate("/expenses");
    }
  }, [id, getExpenseById, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense({
        id,
        title,
        amount: Number(amount),
        category,
        date,
        projectId: projectId || null
      });
      navigate("/expenses");
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen -m-4 lg:-m-8 p-4 lg:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 rounded-2xl transition-all active:scale-90"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Expense</h1>
            <p className="text-slate-500 font-medium">Update the details of your expenditure</p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Select Project</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Choose a Project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Expense Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">What did you spend on?</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="e.g. AWS Infrastructure Monthly Bill"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Amount ({currencySymbol})</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currencySymbol}</span>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-black text-xl focus:ring-2 focus:ring-rose-500 transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all active:scale-[0.98] text-lg tracking-tight flex items-center justify-center gap-3 group"
              >
                Update Expense
                <Check size={20} strokeWidth={3} className="group-hover:scale-125 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
