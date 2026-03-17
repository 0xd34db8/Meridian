import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import LoginBtn from "../ui/LoginBtn";

const NAV_LINKS = [
  { label: "TechStack", href: "#tech" },
  { label: "Ingestion", href: "#" },
  // { label: "Community", href: "#" },
  // { label: "Resources", href: "#" },
  // { label: "Pricing", href: "#" },
];

// Hamburger / X icon for mobile
function MenuIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <style>{`
        .bar { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); transform-origin: center; }
      `}</style>
      {open ? (
        <>
          <line
            className="bar"
            x1="3"
            y1="3"
            x2="17"
            y2="17"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <line
            className="bar"
            x1="17"
            y1="3"
            x2="3"
            y2="17"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <line
            className="bar"
            x1="3"
            y1="6"
            x2="17"
            y2="6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <line
            className="bar"
            x1="3"
            y1="10"
            x2="17"
            y2="10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <line
            className="bar"
            x1="3"
            y1="14"
            x2="17"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  // Elevate navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main bar ── */}
      <div className="pb-12 md:pb-0">
        <nav
          className={`figma-nav${scrolled ? " figma-nav--scrolled" : ""}`}
          style={{
            background: "rgba(255,255,255,0.88)",

            WebkitBackdropFilter: "blur(16px)",
          }}
          role="navigation"
          aria-label="Main"
        >
          <div className="figma-nav__inner">
            {/* Left: logo + links */}
            <div className="figma-nav__left">
              <a
                href="/"
                className="w-10 h-7 md:w-14 md:h-10 transition-transform duration-200 hover:scale-105"
                aria-label="home"
              >
                <Logo />
              </a>

              <ul className="figma-nav__links" role="list">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className={`figma-nav__link${activeLink === label ? " figma-nav__link--active" : ""}`}
                      onClick={() => setActiveLink(label)}
                      aria-current={activeLink === label ? "page" : undefined}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA buttons */}
            <div className="figma-nav__right">
              <LoginBtn />
              <button className="figma-btn figma-btn--outline">
                Try Temporary Chat
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="figma-nav__hamburger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        <div
          id="mobile-drawer"
          className={`figma-nav__drawer${mobileOpen ? " figma-nav__drawer--open" : ""}`}
          aria-hidden={!mobileOpen}
          role="dialog"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="figma-nav__drawer-link"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}

          <div className="figma-nav__drawer-actions">
            <button>Contact sales</button>
            <LoginBtn />
          </div>
        </div>
      </div>
    </>
  );
}
