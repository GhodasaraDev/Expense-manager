import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";
import { useSettings } from "../context/SettingsContext";
import { useProjects } from "../context/ProjectContext";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState } from "react";

const Reports = () => {
  const { expenses } = useExpenses();
  const { incomes } = useIncome();
  const { getCurrencySymbol } = useSettings();
  const { currentProject } = useProjects();
  const [filter, setFilter] = useState("all");
  const currencySymbol = getCurrencySymbol();

  const datePassesFilter = (dateStr) => {
    if (filter === "all") return true;
    if (!dateStr) return false;
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const now = new Date();
    if (filter === "month") {
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
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
  };

  const projectExpenses = expenses.filter(e => (!currentProject || e.projectId === currentProject.id) && datePassesFilter(e.date));
  const projectIncomes = incomes.filter(i => (!currentProject || i.projectId === currentProject.id) && datePassesFilter(i.date));

  const totalExpense = projectExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalIncome = projectIncomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = totalIncome - totalExpense;

  // Aggregate expenses by category
  const categoryData = projectExpenses.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
      existing.value += Number(curr.amount);
    } else {
      acc.push({ name: curr.category, value: Number(curr.amount) });
    }
    return acc;
  }, []);

  // Income vs Expense bar chart
  const overviewData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense }
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Reports</h1>
          <p className="text-slate-500 mt-1 font-medium">Deep dive into your financial analytics</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          {['all', 'month', 'quarter', 'year'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
              <DollarSign size={26} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Balance</span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">
            {currencySymbol}{balance.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </p>
        </div>

        <div className="group relative bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
              <TrendingUp size={26} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</span>
          </div>
          <p className="text-3xl font-black text-emerald-600 tracking-tighter">
            +{currencySymbol}{totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </p>
        </div>

        <div className="group relative bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 group-hover:scale-110 transition-transform">
              <TrendingDown size={26} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Spent</span>
          </div>
          <p className="text-3xl font-black text-rose-600 tracking-tighter">
            -{currencySymbol}{totalExpense.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Category Distribution</h2>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <TrendingDown size={20} />
            </div>
          </div>
          <div className="h-[400px]">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`${currencySymbol}${value.toLocaleString()}`, 'Amount']}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-300">
                <TrendingDown size={48} strokeWidth={1} />
                <p className="font-bold text-slate-400">No category data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Financial Overview</h2>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  tickFormatter={(value) => `${currencySymbol}${value}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${currencySymbol}${value.toLocaleString()}`, 'Total']}
                />
                <Bar dataKey="amount" radius={[12, 12, 0, 0]} barSize={60}>
                  {overviewData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
