// Maps each skill in portfolioData.skills to the projects that use it, by
// matching project tags (or a predicate). `null` = practice/tooling that isn't
// tagged on projects, so no count is shown (rather than a misleading number).
const tag = (re) => (p) => p.tags.some((t) => re.test(t));

export const skillMatchers = {
  'React.js': tag(/^React( 19|\.js)?$/i),
  'Next.js': tag(/^Next\.js/i),
  'Vue.js / Nuxt.js': tag(/^(Vue|Nuxt)/i),
  'Tailwind CSS': tag(/^Tailwind/i),
  'JavaScript / TypeScript': tag(/^(TypeScript|JavaScript)/i),
  'React Flow (@xyflow)': tag(/xyflow|React Flow/i),
  'Leaflet GIS Mapping': tag(/Leaflet|KML/i),
  'Laravel (PHP)': tag(/^Laravel/i),
  'Express.js / Node.js': tag(/^(Express|Node)/i),
  'PHP (7.x - 8.x)': tag(/^(PHP|Laravel|CodeIgniter)/i),
  'PostgreSQL & Prisma ORM': tag(/PostgreSQL|Prisma|pgvector/i),
  'BullMQ & Redis Queue': tag(/BullMQ/i),
  'RESTful APIs': tag(/REST/i),
  'MySQL / Oracle DB': tag(/^(MySQL|Oracle)/i),
  Redis: tag(/Redis/i),
  'React Native (Expo SDK)': tag(/React Native|Expo/i),
  'Flutter (Dart)': tag(/Flutter/i),
  Kotlin: tag(/Kotlin/i),
  'Firebase Services': tag(/Firebase/i),
  'Mobile UI/UX': (p) => p.category === 'Mobile',
  'RAG & Vector Search': tag(/RAG|pgvector|BM25|Vector/i),
  "Kahn's DAG Orchestration": tag(/DAG|Kahn/i),
  'Docker & Kubernetes': tag(/Docker|Kubernetes/i),
  'AI Integration & Prompting': tag(/Gemini|OpenAI|Vision AI|AI SDK/i),
  'Git & GitLab CI/CD': null,
  'Data Analytics': null,
  'Systems Thinking': null,
  'Postman / API Testing': null,
};

/** Project ids using a skill, or null if the skill isn't tracked on projects. */
export function projectsForSkill(name, projects) {
  const match = skillMatchers[name];
  if (!match) return null;
  return projects.filter(match).map((p) => p.id);
}
