export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          &copy; {new Date().getFullYear()} Tuan Dinh. Built with React &amp; Vite.
        </p>
        <a href="#home" className="footer__back-top">
          Back to top
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
