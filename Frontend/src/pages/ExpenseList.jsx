import { useState } from "react";
import { Link } from "react-router-dom";
import { useExpenses } from "../context/ExpenseContext";
import { useSettings } from "../context/SettingsContext";
import { useProjects } from "../context/ProjectContext";
import { Plus, Trash2, Edit, Filter, TrendingDown, Briefcase } from "lucide-react";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();
  const { getCurrencySymbol } = useSettings();
  const { currentProject, projects } = useProjects();
  const currencySymbol = getCurrencySymbol();
  const [filter, setFilter] = useState("all");

  const filteredExpenses = expenses.filter((expense) => {
    if (currentProject && expense.projectId !== currentProject.id) {
      return false;
    }
    if (filter === "all") return true;
    
    if (!expense.date) return false;

    // Parse date as local time to avoid timezone shifts
    const [year, month, day] = expense.date.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const now = new Date();

    if (filter === "month") {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    if (filter === "quarter") {
      const q1 = Math.floor(date.getMonth() / 3);
      const q2 = Math.floor(now.getMonth() / 3);
      return q1 === q2 && date.getFullYear() === now.getFullYear();
    }

    if (filter === "year") {
      return date.getFullYear() === now.getFullYear();
    }

    return true;
  });

  const totalExpense = filteredExpenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div className="bg-white min-h-screen -m-4 lg:-m-8 p-4 lg:p-8 space-y-8 pb-10 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Expenses</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track your business spending</p>
        </div>
        <Link
          to="/expenses/add"
          className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold"
        >
          <Plus size={20} strokeWidth={2.5} />
          <span>New Expense</span>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
            <Filter className="text-slate-400" size={18} />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Filter by:</span>
          </div>
          <div className="flex gap-2">
            {['all', 'month', 'quarter', 'year'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === f
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600'
                }`}
              >
                {f === 'all' ? 'All Time' : `This ${f}`}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-rose-50 px-6 py-4 rounded-2xl border border-rose-100 flex items-center gap-6">
          <div className="p-2.5 bg-rose-500 rounded-xl text-white shadow-lg shadow-rose-200">
            <TrendingDown size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest leading-none mb-1">Total Period Expense</p>
            <p className="text-2xl font-black text-rose-600 tracking-tighter">
              -{currencySymbol}{totalExpense.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Expense Title</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Project</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                      <span className="font-bold text-slate-900">{expense.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-lg font-black text-rose-600 tracking-tighter">
                      -{currencySymbol}{Number(expense.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-200">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                      <Briefcase size={14} className="text-slate-300" />
                      {Array.isArray(projects) && projects.find(p => p.id === Number(expense.projectId))?.name || 'Main Project'}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                      {new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/expenses/edit/${expense.id}`} 
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        title="Edit Expense"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete Expense"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                        <TrendingDown size={40} />
                      </div>
                      <p className="text-lg font-bold text-slate-900 tracking-tight">No expenses found</p>
                      <p className="text-slate-400 font-medium text-sm mt-1">Try adjusting your filters or add a new expense.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
