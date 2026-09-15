const skillGroups = [
  {
    title: 'Programming Languages',
    icon: 'code',
    skills: ['Python', 'C', 'Java', 'Node.js'],
  },
  {
    title: 'Frontend',
    icon: 'layout',
    skills: ['React', 'CSS', 'Next.js'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['Django', 'FastAPI', 'Spring'],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'DevOps & Cloud',
    icon: 'cloud',
    skills: ['Docker', 'Linux', 'AWS', 'GCP', 'Azure', 'Cloudflare'],
  },
  {
    title: 'AI & ML',
    icon: 'cpu',
    skills: ['TensorFlow', 'NumPy', 'ML Models'],
  },
]

const icons: Record<string, string> = {
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  layout: 'M3 3h18v18H3zM3 9h18M9 21V9',
  server: 'M2 2h20v8H2zM2 14h20v8H2zM6 6h0M6 18h0',
  database: 'M12 2C7 2 3 3.8 3 6v12c0 2.2 4 4 9 4s9-1.8 9-4V6c0-2.2-4-4-9-4zM3 6c0 2.2 4 4 9 4s9-1.8 9-4M3 12c0 2.2 4 4 9 4s9-1.8 9-4',
  cloud: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z',
  cpu: 'M4 4h16v16H4zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3',
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-label">02 / Skills</p>
        <h2 className="section-title">Technical toolkit</h2>
        <div className="skills__grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="skills__card">
              <div className="skills__card-header">
                <div className="skills__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icons[group.icon]} />
                  </svg>
                </div>
                <h3>{group.title}</h3>
              </div>
              <div className="skills__tags">
                {group.skills.map((skill) => (
                  <span key={skill} className="skills__tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
