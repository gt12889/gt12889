export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__badge fade-in">
          <span className="hero__badge-dot"></span>
          Available for opportunities
        </div>
        <h1 className="hero__title fade-in" style={{ animationDelay: '0.1s' }}>
          Tuan Dinh
        </h1>
        <p className="hero__subtitle fade-in" style={{ animationDelay: '0.2s' }}>
          Software Engineer <span className="hero__divider">/</span> Cybersecurity
        </p>
        <p className="hero__description fade-in" style={{ animationDelay: '0.3s' }}>
          Building ETL pipelines, microservices, and CI/CD automation at Bank of America.
          BS in Cybersecurity from UT Dallas. Based in Dallas, TX.
        </p>
        <div className="hero__actions fade-in" style={{ animationDelay: '0.4s' }}>
          <a href="#projects" className="hero__btn hero__btn--primary">
            View Projects
          </a>
          <a href="#contact" className="hero__btn hero__btn--secondary">
            Get in Touch
          </a>
        </div>
        <div className="hero__socials fade-in" style={{ animationDelay: '0.5s' }}>
          <a href="https://www.linkedin.com/in/tuan-dinh-/" target="_blank" rel="noreferrer" className="hero__social" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a href="https://tdinh.vercel.app/" target="_blank" rel="noreferrer" className="hero__social" aria-label="Website">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </a>
          <a href="mailto:t.dinh43204@gmail.com" className="hero__social" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
      <div className="hero__scroll">
        <span></span>
      </div>
    </section>
  )
}
