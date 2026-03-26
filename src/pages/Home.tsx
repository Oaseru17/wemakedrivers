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
  UserPlus,
  Calendar,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  Quote,
  Clock,
  Shield,
  BookOpen,
  Users,
  Target,
  Map,
} from 'lucide-react'
import SectionHeading from '../components/shared/SectionHeading'
import { SITE, COURSES, TESTIMONIALS, BLOG_POSTS, STATS, HOW_IT_WORKS, FEATURES } from '../data/site'

const ICON_MAP: Record<string, React.ReactNode> = {
  'user-check': <UserCheck size={28} />,
  'car': <Car size={28} />,
  'settings': <Settings size={28} />,
  'clipboard-check': <ClipboardCheck size={28} />,
  'route': <Route size={28} />,
  'refresh-cw': <RefreshCw size={28} />,
  'award': <Award size={28} />,
  'zap': <Zap size={28} />,
  'user-plus': <UserPlus size={28} />,
  'calendar': <Calendar size={28} />,
}

const FEATURE_ICONS = [
  <Clock size={32} />,
  <Shield size={32} />,
  <Users size={32} />,
  <BookOpen size={32} />,
  <Target size={32} />,
  <Map size={32} />,
]

const BORDER_COLORS = [
  'border-l-secondary',
  'border-l-accent',
  'border-l-gold',
  'border-l-secondary',
]

const QUOTES = [
  { text: 'The road to success is always under construction.', author: 'Lily Tomlin' },
  { text: 'Life is a journey, enjoy the drive.', author: 'Unknown' },
  { text: 'Four wheels move the body, confidence moves the soul.', author: 'WeMake Drivers' },
]

function Home() {
  return (
    <main>
      {/* Section 1 - Hero */}
      <section className="bg-gradient-to-r from-primary via-accent to-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white z-10">
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} className="text-gold fill-gold" />
              <span className="text-gold font-semibold">{SITE.rating}/5</span>
              <span className="text-gray-300">from {SITE.reviewCount}+ positive reviews</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Champion<br />
              <span className="text-secondary">Driving</span> Starts Here
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Stress-free driving lessons with London's most trusted instructors.
              From nervous beginners to test-ready learners, we help you succeed.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#how-it-works"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                How We Help
              </a>
              <Link
                to="/contact-us"
                className="bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary/90 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <div className="w-96 h-80 rounded-2xl bg-gradient-to-br from-secondary/30 via-accent/20 to-gold/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Car size={120} className="text-white/40" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Section 2 - Courses Grid */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="OUR COURSES"
            title="Driver Safety On The Road"
            description="We offer a wide range of driving courses tailored to your needs, whether you're a complete beginner or looking to sharpen your skills."
            center
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="bg-light rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  {ICON_MAP[course.icon]}
                </div>
                <h3 className="font-bold text-primary mb-2">{course.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Booking CTA */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Book your lessons now
          </h2>
          <p className="text-white/80 text-lg mb-8">
            It's Free and always will be.
          </p>
          <Link
            to="/contact-us"
            className="inline-block bg-white text-secondary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Section 4 - Call-to-Action Banner */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Start Learning to Drive Today
            </h2>
            <p className="text-gray-300 text-lg max-w-xl">
              Whether you're 17 or 70, it's never too late to learn. We help people of all ages
              become confident, safe drivers on London's roads.
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 text-white">
              <Phone size={24} className="text-secondary" />
              <span className="text-2xl md:text-3xl font-bold">{SITE.phone}</span>
            </a>
            <Link
              to="/contact-us"
              className="bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary/90 transition-colors"
            >
              Book a Lesson
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5 - Popular Courses */}
      <section className="bg-light py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="TOP PICKS"
            title="Popular Courses"
            description="Our most in-demand courses chosen by thousands of London learners."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COURSES.slice(0, 4).map((course, idx) => (
              <div
                key={course.id}
                className={`bg-white rounded-xl p-6 border-l-4 ${BORDER_COLORS[idx]} flex items-start gap-5 hover:shadow-lg transition-shadow`}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {ICON_MAP[course.icon]}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-lg mb-1">{course.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{course.description}</p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-1 text-secondary font-semibold text-sm hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 - How it Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="OUR SERVICES"
            title="How it Works"
            description="Getting on the road is easier than you think. Just three simple steps."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.title} className="text-center relative">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    {ICON_MAP[step.icon]}
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="font-bold text-primary text-xl mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 w-16 border-t-2 border-dashed border-secondary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 - Features */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="WHAT WE DO"
            title="A Different Drive Everyday!"
            description="From flexible scheduling to expert instruction, here's what makes WeMake Drivers the top choice in London."
            center
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={feature.title} className="flex items-start gap-4 group">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                  {FEATURE_ICONS[idx]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 - Stats / Quotes */}
      <section className="bg-light py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {QUOTES.map((q) => (
              <div key={q.author} className="bg-white rounded-xl p-8 shadow-sm">
                <Quote size={28} className="text-secondary/30 mb-4" />
                <p className="text-primary font-medium italic text-lg mb-4">"{q.text}"</p>
                <span className="text-gray-400 text-sm">-- {q.author}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center bg-white rounded-xl p-8 shadow-sm">
                <span className="block text-4xl md:text-5xl font-extrabold text-secondary mb-2">
                  {stat.value}
                </span>
                <span className="text-gray-500 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9 - Instructor Bio */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="WHERE CAN YOU FIND US"
            title="Meet David Apperson"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Hi, I'm David Apperson. I'm your instructor.
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                With over 15 years of experience teaching new drivers across London,
                I founded WeMake Drivers to provide a calm, supportive learning environment.
                We operate across all London zones, from the busy streets of Central London
                to the quieter roads of the suburbs. Our mission is to help every learner
                build genuine confidence behind the wheel.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you need automatic or manual lessons, intensive courses, or just a
                refresher, we tailor every lesson to your pace and goals. London driving
                doesn't have to be daunting -- let us show you.
              </p>
              <div className="space-y-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-secondary transition-colors"
                >
                  <Mail size={20} className="text-secondary" />
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-secondary transition-colors"
                >
                  <Phone size={20} className="text-secondary" />
                  {SITE.phone}
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={20} className="text-secondary" />
                  {SITE.address}
                </div>
              </div>
            </div>
            <div className="w-full h-80 lg:h-96 rounded-2xl bg-gradient-to-br from-accent/20 via-light to-secondary/10 border border-gray-200 flex flex-col items-center justify-center gap-4">
              <Map size={48} className="text-accent/40" />
              <span className="text-gray-400 font-medium">London Coverage Area</span>
              <span className="text-gray-300 text-sm">All London Zones Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10 - Testimonials */}
      <section className="bg-light py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="HAPPY DRIVERS"
            title="Testimonials"
            description="Don't just take our word for it. Hear what our learners have to say."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <Quote size={28} className="text-secondary/30 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-bold text-primary">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11 - Blog Posts */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="FROM OUR BLOG"
            title="What's on our mind"
            description="Tips, guides, and insights to help you on your driving journey."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, idx) => {
              const gradients = [
                'from-secondary/60 to-accent/60',
                'from-accent/60 to-primary/60',
                'from-gold/60 to-secondary/60',
              ]
              return (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-light rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`h-48 bg-gradient-to-br ${gradients[idx]} flex items-center justify-center`}>
                    <Car size={48} className="text-white/50 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-gray-400 text-sm">
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-secondary font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export { Home as default }
