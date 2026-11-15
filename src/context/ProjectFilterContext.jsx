import React, { createContext, useContext, useMemo, useState } from 'react';

/**
 * Shared filter state so other sections (Skills, Experience) can send the
 * visitor to Projects already filtered by a skill/tag.
 */
const ProjectFilterContext = createContext(null);

export function ProjectFilterProvider({ children }) {
  const [skill, setSkill] = useState(null); // { label, match: string[] } | null
  const value = useMemo(() => ({ skill, setSkill }), [skill]);
  return <ProjectFilterContext.Provider value={value}>{children}</ProjectFilterContext.Provider>;
}

export function useProjectFilter() {
  const ctx = useContext(ProjectFilterContext);
  if (!ctx) throw new Error('useProjectFilter must be used within ProjectFilterProvider');
  return ctx;
}
