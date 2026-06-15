import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext({
  projects: [],
  currentProject: null,
  addProject: () => {},
  deleteProject: () => {},
  selectProject: () => {},
});

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(() => {
    try {
      const saved = localStorage.getItem("currentProject");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
       return null;
    }
  });

  // Fetch projects on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        // Filter projects by user if needed, or assume backend handles it.
        // For now, simple client-side filter or just all projects (demo mode)
        const mappedProjects = response.data.map(p => ({
            ...p,
            id: p._id, // Map _id to id for frontend compatibility
            name: p.ProjectName
        }));
        setProjects(mappedProjects);
        
        // If current project is not in the list (deleted?), reset it
        if (currentProject && !mappedProjects.find(p => p.id === currentProject.id)) {
            setCurrentProject(mappedProjects[0] || null);
        } else if (!currentProject && mappedProjects.length > 0) {
            setCurrentProject(mappedProjects[0]);
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, [user]); // Re-fetch when user changes

  useEffect(() => {
    if (currentProject) {
      localStorage.setItem("currentProject", JSON.stringify(currentProject));
    }
  }, [currentProject]);

  const addProject = async (name) => {
    if (!user) return;
    try {
        const response = await api.post('/projects', {
            ProjectName: name,
            UserID: user.id
        });
        const newProject = { 
            ...response.data, 
            id: response.data._id, 
            name: response.data.ProjectName 
        };
        setProjects(prev => [...prev, newProject]);
        if (!currentProject) {
            setCurrentProject(newProject);
        }
    } catch (err) {
        console.error("Failed to add project", err);
    }
  };

  const deleteProject = async (id) => {
    try {
        await api.delete(`/projects/${id}`);
        setProjects(prev => prev.filter(p => p.id !== id));
        if (currentProject && currentProject.id === id) {
            setCurrentProject(projects.find(p => p.id !== id) || null);
        }
    } catch (err) {
        console.error("Failed to delete project", err);
    }
  };

  const selectProject = (id) => {
    const project = projects.find(p => p.id === id || p.id === String(id));
    if (project) {
      setCurrentProject(project);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, currentProject, addProject, deleteProject, selectProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
