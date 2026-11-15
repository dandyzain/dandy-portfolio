import { useMemo } from 'react';
import { portfolioData } from '../data/portfolioData';
import { enrichProjects } from '../data/projectMeta';

const enriched = enrichProjects(portfolioData.projects);

/** All projects with slug/featured/logo. Stable reference. */
export function useProjects() {
  return useMemo(() => enriched, []);
}

export const allProjects = enriched;
