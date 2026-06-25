import { create } from 'zustand';

export const useStore = create((set) => ({
  // Hover state for Skill Plants (contains string or null)
  hoveredSkill: null,
  setHoveredSkill: (skill) => set({ hoveredSkill: skill }),

  // Active Project state for Modals (contains object or null)
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
}));
