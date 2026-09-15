export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-label">01 / About</p>
        <h2 className="section-title">A bit about me</h2>
        <div className="about__grid">
          <div className="about__card">
            <div className="about__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3>Education</h3>
            <p>Bachelor of Science in Cybersecurity (CIS) from the University of Texas at Dallas.</p>
          </div>
          <div className="about__card">
            <div className="about__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h3>Work</h3>
            <p>Software Engineer at Bank of America building ETL pipelines, microservices, and CI/CD automation.</p>
          </div>
          <div className="about__card">
            <div className="about__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Learning</h3>
            <p>Currently diving into Rust, Django, TensorFlow, NumPy, and ML models.</p>
          </div>
          <div className="about__card">
            <div className="about__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3>Location</h3>
            <p>Based in Dallas, TX — open to remote and relocation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
