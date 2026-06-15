import { useIncome } from "../context/IncomeContext";
import { useExpenses } from "../context/ExpenseContext";
import { useSettings } from "../context/SettingsContext";
import { useProjects } from "../context/ProjectContext";
import { DollarSign, TrendingUp, TrendingDown, Building, Briefcase } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard = () => {
  const { incomes } = useIncome();
  const { expenses } = useExpenses();
  const { getCurrencySymbol, companyName } = useSettings();
  const { currentProject, projects, selectProject } = useProjects();
  const currencySymbol = getCurrencySymbol();

  // Filter by current project
  const projectIncomes = incomes.filter(i => !currentProject || i.projectId === currentProject.id);
  const projectExpenses = expenses.filter(e => !currentProject || e.projectId === currentProject.id);

  const totalIncome = projectIncomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = projectExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = totalIncome - totalExpense;

  // Prepare data for charts
  const data = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expense', amount: totalExpense },
  ];

  const COLORS = ['#10B981', '#EF4444'];

  const recentTransactions = [
    ...projectIncomes.map(i => ({ ...i, type: 'income' })),
    ...projectExpenses.map(e => ({ ...e, type: 'expense' }))
  ].sort((a, b) => new Date(b.date || b.id) - new Date(a.date || a.id)).slice(0, 5);

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Building size={160} />
        </div>
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 text-white">
              <Building size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{companyName}</h1>
              <p className="text-slate-500 font-medium mt-1">Real-time Financial Overview</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Active Project</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Briefcase size={18} />
              </div>
              <select
                value={currentProject?.id || ""}
                onChange={(e) => selectProject(e.target.value)}
                className="w-full md:w-72 pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
              <DollarSign size={26} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Balance</span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">
              {currencySymbol}{balance.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">SAFE</span>
            </div>
          </div>
        </div>

        <div className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
              <TrendingUp size={26} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Income</span>
          </div>
          <div>
            <p className="text-3xl font-black text-emerald-600 tracking-tighter">
              +{currencySymbol}{totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
            <p className="mt-2 text-[11px] font-semibold text-emerald-500/80 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
              Growth this month
            </p>
          </div>
        </div>

        <div className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 group-hover:scale-110 transition-transform">
              <TrendingDown size={26} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Expenses</span>
          </div>
          <div>
            <p className="text-3xl font-black text-rose-600 tracking-tighter">
              -{currencySymbol}{totalExpense.toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
            <p className="mt-2 text-[11px] font-semibold text-rose-500/80 bg-rose-50 w-fit px-2 py-0.5 rounded-full">
              Controlled spending
            </p>
          </div>
        </div>
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Chart */}
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Analytics Overview</h2>
              <p className="text-sm text-slate-500 font-medium">Monthly cashflow distribution</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">Expense</span>
              </div>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                  formatter={(value) => [`${currencySymbol}${value.toLocaleString()}`, 'Amount']}
                />
                <Bar dataKey="amount" radius={[10, 10, 10, 10]} barSize={60}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <button className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4 flex-1">
            {recentTransactions.map((item) => (
              <div key={`${item.type}-${item.id}`} className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-white hover:shadow-md hover:ring-1 hover:ring-slate-100 rounded-2xl transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl shadow-sm ${
                    item.type === 'income' 
                      ? 'bg-emerald-500 text-white shadow-emerald-200' 
                      : 'bg-rose-500 text-white shadow-rose-200'
                  }`}>
                    {item.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">{item.title}</p>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight mt-0.5">
                      {item.category} • {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <span className={`text-lg font-black tracking-tighter ${
                  item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {item.type === 'income' ? '+' : '-'}{currencySymbol}{Number(item.amount).toLocaleString()}
                </span>
              </div>
            ))}
            {recentTransactions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                  <TrendingUp size={32} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No activity found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
