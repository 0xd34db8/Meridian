import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const [showIngestionModal, setShowIngestionModal] = useState(false);
  const [ingestUrl, setIngestUrl] = useState("");
  const [isIngesting, setIsIngesting] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTemp = searchParams.get("temp") === "true";
  const isChatPage = location.pathname.startsWith("/chat");

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
          <div className="figma-nav__inner" style={isChatPage ? { maxWidth: "100%", padding: "0 16px" } : {}}>
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
                  <li key={label} className="relative">
                    <a
                      href={href}
                      className={`figma-nav__link${activeLink === label ? " figma-nav__link--active" : ""}`}
                      onClick={(e) => {
                        if (label === "Ingestion") {
                          e.preventDefault();
                          setShowIngestionModal(!showIngestionModal);
                        }
                        setActiveLink(label);
                      }}
                      aria-current={activeLink === label ? "page" : undefined}
                    >
                      {label}
                    </a>
                    {label === "Ingestion" && showIngestionModal && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 p-5 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl border border-gray-100 z-50 text-gray-800 transition-all">
                        <h4 className="text-sm font-semibold mb-3 text-gray-900">Ingest Data</h4>
                        <input
                          type="url"
                          placeholder="https://example.com/data"
                          className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-xl mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-400"
                          value={ingestUrl}
                          onChange={(e) => setIngestUrl(e.target.value)}
                        />
                        <button
                          className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-50"
                          disabled={isIngesting || !ingestUrl.trim()}
                          onClick={async () => {
                            setIsIngesting(true);
                            try {
                              const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
                              const res = await fetch(`${baseUrl}/ingest`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ url: ingestUrl })
                              });
                              if (!res.ok) throw new Error("Ingestion failed");
                              const data = await res.json();
                              alert(data.message);
                              setShowIngestionModal(false);
                              setIngestUrl("");
                            } catch (e) {
                              console.error(e);
                              alert("Failed to ingest URL: " + e.message);
                            } finally {
                              setIsIngesting(false);
                            }
                          }}
                        >
                          {isIngesting ? "Ingesting..." : "Ingest"}
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA buttons */}
            <div className="figma-nav__right">
              <LoginBtn />
              <button 
                className={`figma-btn figma-btn--outline ${isTemp ? 'bg-orange-50 text-orange-600 border-orange-200 cursor-default hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200' : ''}`}
                onClick={() => !isTemp && navigate("/chat?temp=true")}
              >
                {isTemp ? "Temp Chat On" : "Try Temporary Chat"}
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
            <div key={label} className="w-full">
              <a
                href={href}
                className="figma-nav__drawer-link"
                onClick={(e) => {
                  if (label === "Ingestion") {
                    e.preventDefault();
                    setShowIngestionModal(!showIngestionModal);
                  } else {
                    setMobileOpen(false);
                  }
                }}
              >
                {label}
              </a>
              {label === "Ingestion" && showIngestionModal && (
                <div className="px-6 pb-4 pt-2">
                  <input
                    type="url"
                    placeholder="https://example.com/data"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    value={ingestUrl}
                    onChange={(e) => setIngestUrl(e.target.value)}
                  />
                  <button
                    className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                    disabled={isIngesting || !ingestUrl.trim()}
                    onClick={async () => {
                      setIsIngesting(true);
                      try {
                        const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
                        const res = await fetch(`${baseUrl}/ingest`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ url: ingestUrl })
                        });
                        if (!res.ok) throw new Error("Ingestion failed");
                        const data = await res.json();
                        alert(data.message);
                        setShowIngestionModal(false);
                        setIngestUrl("");
                      } catch (e) {
                        console.error(e);
                        alert("Failed to ingest URL: " + e.message);
                      } finally {
                        setIsIngesting(false);
                      }
                    }}
                  >
                    {isIngesting ? "Ingesting..." : "Ingest"}
                  </button>
                </div>
              )}
            </div>
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
