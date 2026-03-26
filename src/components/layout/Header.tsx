import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mail, Phone, Star, Menu, X, ChevronDown } from 'lucide-react'
import { SITE, NAV_LINKS } from '../../data/site'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="w-full z-50 relative">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail size={14} />
              <span className="hidden sm:inline">{SITE.email}</span>
            </a>
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone size={14} />
              <span>Call Us: {SITE.phone}</span>
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-gold fill-gold" />
            <span className="font-semibold">{SITE.rating}/5</span>
            <span className="hidden sm:inline ml-1">Happy Reviews</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-primary">
              WeMake<span className="text-secondary">Drivers</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setDropdownOpen(true)}
                onMouseLeave={() => link.children && setDropdownOpen(false)}
              >
                {link.children ? (
                  <>
                    <button className={`flex items-center gap-1 font-medium transition-colors py-2 ${
                      isActive(link.path) ? 'text-secondary' : 'text-primary hover:text-secondary'
                    }`}>
                      {link.label}
                      <ChevronDown size={16} />
                    </button>
                    {dropdownOpen && (
                      <ul className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50">
                        {link.children.map((child) => (
                          <li key={child.path}>
                            <Link
                              to={child.path}
                              className="block px-4 py-2 text-sm text-primary hover:bg-light hover:text-secondary transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium transition-colors ${
                      isActive(link.path) ? 'text-secondary' : 'text-primary hover:text-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link
            to="/contact-us"
            className="hidden lg:inline-block bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary/90 transition-colors"
          >
            Book Now
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t px-4 pb-4">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.path}
                  className={`block py-3 font-medium border-b border-gray-100 ${
                    isActive(link.path) ? 'text-secondary' : 'text-primary'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    className="block py-2 pl-4 text-sm text-gray-600 border-b border-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              to="/contact-us"
              className="block mt-4 text-center bg-secondary text-white px-6 py-3 rounded-full font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export { Header as default }
