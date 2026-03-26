import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react'
import { SITE } from '../../data/site'

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold">
                WeMake<span className="text-secondary">Drivers</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              For many years, we have been helping people of all ages learn to drive safely and confidently on London roads.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contacts</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {SITE.address}
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <Phone size={16} className="shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <Mail size={16} className="shrink-0" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about-us" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-secondary transition-colors">Our Courses</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link></li>
              <li><Link to="/contact-us" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Subscribe</h4>
            <p className="text-gray-400 text-sm mb-4">Get latest updates and offers.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-l-full bg-white/10 border border-white/20 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
              />
              <button
                type="submit"
                className="bg-secondary px-5 py-3 rounded-r-full font-semibold text-sm hover:bg-secondary/90 transition-colors"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} WeMake Drivers. All Rights Reserved</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-secondary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-secondary transition-colors">Privacy</a>
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
