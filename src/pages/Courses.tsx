import { Link } from 'react-router-dom'
import {
  UserCheck,
  Car,
  Settings,
  ClipboardCheck,
  Route,
  RefreshCw,
  Award,
  Zap,
  ArrowRight,
} from 'lucide-react'
import PageBanner from '../components/shared/PageBanner'
import { COURSES } from '../data/site'
import SEO from '../components/shared/SEO'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'user-check': UserCheck,
  car: Car,
  settings: Settings,
  'clipboard-check': ClipboardCheck,
  route: Route,
  'refresh-cw': RefreshCw,
  award: Award,
  zap: Zap,
}

const ACCENT_STYLES = [
  { bar: 'bg-secondary', circle: 'bg-secondary/10', icon: 'text-secondary' },
  { bar: 'bg-accent', circle: 'bg-accent/10', icon: 'text-accent' },
  { bar: 'bg-gold', circle: 'bg-gold/10', icon: 'text-gold' },
]

function Courses() {
  return (
    <>
      <SEO
        title="Driving Courses"
        description="Explore our driving courses: automatic, manual, intensive crash courses, test preparation, Pass Plus, motorway lessons and more. Book your London driving lessons today."
        path="/courses"
      />
      <PageBanner title="Courses" />

      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COURSES.map((course, index) => {
              const Icon = ICON_MAP[course.icon]
              const style = ACCENT_STYLES[index % ACCENT_STYLES.length]

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`h-1.5 ${style.bar}`} />
                  <div className="p-8 text-center">
                    <div
                      className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${style.circle}`}
                    >
                      {Icon && <Icon size={32} className={style.icon} />}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3">{course.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{course.description}</p>
                    <Link
                      to="/contact-us"
                      className="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm hover:gap-3 transition-all duration-300"
                    >
                      Book Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Not sure which course is right for you? Let's talk.
          </h2>
          <Link
            to="/contact-us"
            className="inline-block bg-secondary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-secondary/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}

export { Courses as default }
