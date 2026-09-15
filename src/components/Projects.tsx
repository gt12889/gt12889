const projects = [
  {
    name: 'Alethia',
    event: 'HackIllinois, UIUC',
    award: 'Best Use of OpenAI API',
    description:
      'A neighborhood intelligence platform that ran Qwen3-8B on H100s via vLLM and Modal serverless, with retrieval through Supermemory and Actian VectorAI using HNSW indexing.',
    tags: ['Qwen3-8B', 'vLLM', 'Modal', 'Supermemory', 'Actian VectorAI'],
    accent: 'emerald',
  },
  {
    name: 'RxGuard',
    event: 'Hacklytics, Georgia Tech',
    award: '2nd Overall + Actian Sponsor Challenge',
    description:
      'A semantic drug safety search engine over FDA FAERS data, built with FastAPI, React 19, Gemini, and Actian VectorAI with citation-grounded generation.',
    tags: ['FastAPI', 'React 19', 'Gemini', 'Actian VectorAI'],
    accent: 'sky',
  },
  {
    name: 'MegalodonMD',
    event: 'Harvard X Lotus',
    award: 'TinyFish Enterprise Track',
    description:
      'A Vietnamese pharmaceutical price intelligence platform using a four-tier scout-spawn agent architecture with SSE streaming, FastAPI, and TinyFish web agents targeting authenticated government portals.',
    tags: ['FastAPI', 'SSE Streaming', 'TinyFish', 'Multi-Agent'],
    accent: 'teal',
  },
  {
    name: 'Toyotron',
    event: 'HackUTD',
    award: '1st Place — NVIDIA Track & Toyota Track',
    description:
      'A GPU-accelerated automotive project that satisfied both technical depth and automotive practicality, winning first place on two tracks simultaneously.',
    tags: ['GPU', 'NVIDIA', 'Automotive', 'Toyota'],
    accent: 'amber',
  },
  {
    name: 'Roly Poly',
    event: 'NexHacks, SMU',
    award: '3rd Overall',
    description:
      'A polished, fully-scoped end-to-end project shipped in a compressed sprint window, demonstrating strong execution and product thinking under time pressure.',
    tags: ['Full-Stack', 'Rapid Prototyping'],
    accent: 'violet',
  },
]

const accentColors: Record<string, string> = {
  emerald: '#34d399',
  sky: '#38bdf8',
  teal: '#2dd4bf',
  amber: '#fbbf24',
  violet: '#a78bfa',
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-label">03 / Projects</p>
        <h2 className="section-title">AI &amp; Hackathon Projects</h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.name} className="project-card" style={{ '--card-accent': accentColors[project.accent] } as React.CSSProperties}>
              <div className="project-card__top">
                <div className="project-card__name-row">
                  <h3 className="project-card__name">{project.name}</h3>
                  <span className="project-card__event">{project.event}</span>
                </div>
                <span className="project-card__award">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z" />
                  </svg>
                  {project.award}
                </span>
              </div>
              <p className="project-card__description">{project.description}</p>
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
