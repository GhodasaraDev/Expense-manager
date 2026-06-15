import { useState, useEffect } from "react";
import { useIncome } from "../context/IncomeContext";
import { useSettings } from "../context/SettingsContext";
import { useProjects } from "../context/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

const EditIncome = () => {
  const { id } = useParams();
  const { getIncomeById, updateIncome } = useIncome();
  const { getCurrencySymbol } = useSettings();
  const { projects } = useProjects();
  const currencySymbol = getCurrencySymbol();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
  const [projectId, setProjectId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const income = getIncomeById(id);
    if (income) {
      setTitle(income.title);
      setAmount(income.amount);
      setCategory(income.category);
      setProjectId(income.projectId || (projects[0]?.id || ""));
      setDate(income.date);
    } else {
        navigate("/income");
    }
  }, [id, getIncomeById, navigate, projects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateIncome({ 
        id, 
        title, 
        amount: Number(amount), 
        category, 
        projectId: projectId || null, 
        date 
      });
      navigate("/income");
    } catch (error) {
      console.error("Failed to update income:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 rounded-2xl transition-all active:scale-90"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Income</h1>
          <p className="text-slate-500 font-medium">Update the details of your revenue stream</p>
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
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Income Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Income Source / Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g. Client Project Payment"
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
                  className="w-full pl-10 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-black text-xl focus:ring-2 focus:ring-emerald-500 transition-all"
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
                <option value="Salary">Salary</option>
                <option value="Business">Business</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all active:scale-[0.98] text-lg tracking-tight flex items-center justify-center gap-3 group"
            >
              Update Income
              <Check size={20} strokeWidth={3} className="group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIncome;
