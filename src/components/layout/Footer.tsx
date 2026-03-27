import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowUp, Globe, MessageCircle, Camera, Briefcase } from 'lucide-react'
import { SITE } from '../../data/site'

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-dark text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + Social */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold">
                WeMake<span className="text-secondary">Drivers</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              For many years, we have been helping people of all ages learn to drive safely and confidently on London roads.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-secondary hover:border-secondary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Globe size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-secondary hover:border-secondary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-secondary hover:border-secondary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Camera size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-secondary hover:border-secondary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Briefcase size={15} />
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-lg font-semibold mb-5 uppercase tracking-wide">Contacts</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>{SITE.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 hover:text-secondary transition-colors"
                >
                  <Phone size={16} className="shrink-0 text-secondary" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 hover:text-secondary transition-colors"
                >
                  <Mail size={16} className="shrink-0 text-secondary" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Courses / Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 uppercase tracking-wide">Courses</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link to="/blog" className="hover:text-secondary transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Press Centre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-lg font-semibold mb-5 uppercase tracking-wide">Subscribe</h4>
            <p className="text-gray-400 text-sm mb-5">
              Get latest updates and offers.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-l-md bg-white/10 border border-white/20 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
              />
              <button
                type="submit"
                className="bg-secondary px-5 py-3 rounded-r-md font-semibold text-sm hover:bg-secondary/90 transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            &copy; Copyright {new Date().getFullYear()} WeMake Drivers. All Rights Reserved
          </p>
          <div className="flex items-center gap-5 text-gray-500 text-sm">
            <a href="#" className="hover:text-secondary transition-colors">Terms of use</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-secondary transition-colors">Privacy</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-secondary transition-colors">Environmental</a>
            <span className="text-gray-600">|</span>
            <Link to="/contact-us" className="hover:text-secondary transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-secondary/90 transition-colors z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}

export { Footer as default }
