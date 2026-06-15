import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";
import { useProjects } from "../context/ProjectContext";
import { useState } from "react";
import { Building, Briefcase, Plus, Trash2, User, Mail, Globe, Palette, ShieldCheck } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { currency, setCurrency, theme, setTheme, companyName, setCompanyName } = useSettings();
  const { projects, addProject, deleteProject } = useProjects();
  const [newProjectName, setNewProjectName] = useState("");

  return (
    <div className="max-w-4xl space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 font-medium">Configure your workspace and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Information */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
            <User size={18} className="text-indigo-600" />
            Account
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Manage your profile details and account security.
          </p>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Name</p>
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                  <User size={16} className="text-slate-400" />
                  <p className="font-bold text-slate-900">{user?.name || "Guest"}</p>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Address</p>
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Mail size={16} className="text-slate-400" />
                  <p className="font-bold text-slate-900 truncate">{user?.email || "guest@example.com"}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl w-fit">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Verified Account</span>
            </div>
          </div>
        </div>

        {/* Workspace Preferences */}
        <div className="md:col-span-1 pt-8 md:pt-0">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Building size={18} className="text-indigo-600" />
            Workspace
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Customize how your business data is displayed.
          </p>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Company Branding</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-indigo-50 rounded-lg text-indigo-600 group-focus-within:bg-indigo-600 group-focus-within:text-white transition-all">
                  <Building size={18} />
                </div>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  placeholder="Your Company Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Currency</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-emerald-50 rounded-lg text-emerald-600 group-focus-within:bg-emerald-600 group-focus-within:text-white transition-all">
                    <Globe size={18} />
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                  >
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                    <option value="INR">Indian Rupee (₹)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visual Theme</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-rose-50 rounded-lg text-rose-600 group-focus-within:bg-rose-600 group-focus-within:text-white transition-all">
                    <Palette size={18} />
                  </div>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                  >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Management */}
        <div className="md:col-span-1 pt-8 md:pt-0">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Briefcase size={18} className="text-indigo-600" />
            Projects
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Organize your finances by department or project.
          </p>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Add New Project</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-100 rounded-lg text-slate-400">
                    <Briefcase size={18} />
                  </div>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newProjectName.trim()) {
                        addProject(newProjectName.trim());
                        setNewProjectName("");
                      }
                    }}
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                    placeholder="Project Name (e.g. Marketing)"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  if (newProjectName.trim()) {
                    addProject(newProjectName.trim());
                    setNewProjectName("");
                  }
                }}
                disabled={!newProjectName.trim()}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl flex items-center gap-2 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 font-black uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed h-[60px]"
              >
                <Plus size={18} strokeWidth={3} />
                Create
              </button>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Projects</label>
              <div className="grid grid-cols-1 gap-3">
                {projects.map((p) => (
                  <div 
                    key={p.id} 
                    className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                        <Briefcase size={20} />
                      </div>
                      <span className="font-bold text-slate-900">{p.name}</span>
                    </div>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      title="Remove Project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="py-12 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-4 shadow-sm">
                      <Briefcase size={32} />
                    </div>
                    <p className="text-slate-400 font-bold">No projects created yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
