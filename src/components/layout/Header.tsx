import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import { NAV_LINKS } from '../../data/site'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const transparent = isHome && !scrolled

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent shadow-none'
          : 'bg-white shadow-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0.5 shrink-0">
          <span className={`text-2xl font-bold tracking-tight transition-colors ${transparent ? 'text-white' : 'text-dark'}`}>
            WeMake
          </span>
          <span className={`text-2xl font-bold tracking-tight relative transition-colors ${transparent ? 'text-white' : 'text-dark'}`}>
            Dri
            <span className="relative inline-block">
              v
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-secondary text-[10px] leading-none font-black">
                &#x2715;
              </span>
            </span>
            ers
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path)
            const hasChildren = !!link.children

            return (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => hasChildren && setDropdownOpen(true)}
                onMouseLeave={() => hasChildren && setDropdownOpen(false)}
              >
                {/* Active indicator — green line ABOVE */}
                {active && (
                  <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-secondary" />
                )}

                {hasChildren ? (
                  <>
                    <button
                      className={`flex items-center gap-1 uppercase text-[13px] font-medium tracking-[0.08em] py-6 transition-colors ${
                        active
                          ? 'text-secondary'
                          : transparent ? 'text-white/90 hover:text-secondary' : 'text-dark hover:text-secondary'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} strokeWidth={2.5} />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 pt-0 transition-all duration-200 ${
                        dropdownOpen
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <ul className="bg-white shadow-lg rounded-md py-2 min-w-[200px] border border-gray-100">
                        {link.children!.map((child) => (
                          <li key={child.path}>
                            <Link
                              to={child.path}
                              className="block px-5 py-2.5 text-[13px] uppercase tracking-[0.05em] font-medium text-dark hover:text-secondary hover:bg-light transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`block uppercase text-[13px] font-medium tracking-[0.08em] py-6 transition-colors ${
                      active
                        ? 'text-secondary'
                        : transparent ? 'text-white/90 hover:text-secondary' : 'text-dark hover:text-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        {/* Right side icons */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Search icon */}
          <button
            className={`hidden lg:flex items-center justify-center w-10 h-10 hover:text-secondary transition-colors ${transparent ? 'text-white' : 'text-dark'}`}
            aria-label="Search"
          >
            <Search size={20} strokeWidth={2} />
          </button>

          {/* Hamburger icon — dark rounded square */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${transparent ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-dark text-white hover:bg-dark/90'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={20} strokeWidth={2.5} />
            ) : (
              <Menu size={20} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu — slides down */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link
                to={link.path}
                className={`block py-3.5 uppercase text-[13px] font-medium tracking-[0.08em] border-b border-gray-100 transition-colors ${
                  isActive(link.path)
                    ? 'text-secondary'
                    : 'text-dark hover:text-secondary'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="flex items-center justify-between">
                  {link.label}
                  {link.children && <ChevronDown size={14} strokeWidth={2.5} />}
                </span>
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  className="block py-2.5 pl-4 uppercase text-[12px] font-medium tracking-[0.05em] text-gray-text hover:text-secondary border-b border-gray-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export { Header as default }
