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
  Star,
  Quote,
  Shield,
  BookOpen,
  Users,
  Target,
  Map,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import SectionHeading from '../components/shared/SectionHeading'
import SEO from '../components/shared/SEO'
import { SITE, COURSES, TESTIMONIALS, BLOG_POSTS, HOW_IT_WORKS, FEATURES } from '../data/site'

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
  <Calendar size={32} className="text-secondary" />,
  <Shield size={32} className="text-secondary" />,
  <Users size={32} className="text-secondary" />,
  <BookOpen size={32} className="text-secondary" />,
  <Target size={32} className="text-secondary" />,
  <Map size={32} className="text-secondary" />,
]

const QUOTES = [
  { text: "I never thought I'd pass first time — but here I am, driving to work every day", color: 'bg-teal' },
  { text: "The best part? My instructor believed in me before I believed in myself", color: 'bg-purple' },
  { text: "I went from being scared of roundabouts to loving the open road", color: 'bg-orange' },
]

const COURSE_CARD_IMAGES = [
  '/images/course-1.jpg',
  '/images/course-2.jpg',
  '/images/course-3.jpg',
  '/images/course-4.jpg',
]

function Home() {
  return (
    <main>
      <SEO
        description="London's top-rated driving school. DVSA-approved instructors, 98% pass rate, flexible scheduling. Automatic & manual lessons across all London zones. Book today!"
        path="/"
      />
      {/* Section 1 — Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-28 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-end">
            {/* Left — Hero text */}
            <div className="lg:col-span-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-2xl">
                Pass First Time.<br />Drive For Life.
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                98% of our learners pass on their first attempt. We don't just teach you to pass a test — we build confident, safe drivers for London's roads.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#how-it-works"
                  className="inline-block border-2 border-secondary text-secondary px-8 py-3 rounded-full font-semibold uppercase tracking-wider text-sm hover:bg-secondary hover:text-white transition-colors"
                >
                  How We Help
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 font-semibold text-sm rounded-full hover:bg-[#1ebe57] transition-colors"
                >
                  <MessageCircle size={18} />
                  Talk to us on WhatsApp
                </a>
              </div>
            </div>

            {/* Right — Apply form (overlapping hero) */}
            <div className="lg:col-span-2 lg:translate-y-32">
              <div className="bg-white rounded-lg p-8 shadow-xl">
                <h3 className="text-xl font-bold text-primary mb-6">Start Your Journey</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name*"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="hello@drivingschool.com"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number*"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                  <select
                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors text-gray-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Select your area*</option>
                    <option value="N">North London</option>
                    <option value="S">South London</option>
                    <option value="E">East London</option>
                    <option value="W">West London</option>
                    <option value="C">Central London</option>
                    <option value="CR">Croydon</option>
                    <option value="EN">Enfield</option>
                    <option value="BR">Bromley</option>
                    <option value="SE">Greenwich / Lewisham</option>
                    <option value="N1">Islington / Camden</option>
                    <option value="SW">Wandsworth</option>
                    <option value="HA">Barnet / Harrow</option>
                    <option value="other">Other (enter postcode below)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Or enter your postcode (e.g. SW1A 1AA)"
                    className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3.5 rounded font-semibold uppercase tracking-wider text-sm hover:bg-accent transition-colors"
                  >
                    Get Started
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Courses */}
      <section className="bg-white pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:w-3/5">
          <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
            Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Lessons Built Around You
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10 max-w-lg">
            Whether you're a complete beginner or getting back behind the wheel,
            your lessons are shaped to fit your pace, your goals, and your schedule.
          </p>

          <div className="space-y-8">
            {COURSES.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-1">
                  {ICON_MAP[course.icon]}
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg">{course.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mt-1">
                    {course.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — CTA Banner */}
      <section className="bg-secondary py-14">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg">
              Your first step is a quick chat. No pressure, no commitment.
            </p>
          </div>
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-4 shrink-0"
          >
            <Phone size={28} className="text-white" />
            <span className="text-2xl md:text-3xl font-bold text-white">1-900-333-333</span>
          </a>
        </div>
      </section>

      {/* Section 4 — Popular Courses (4 photo cards) */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.slice(0, 4).map((course, idx) => (
              <div key={course.id} className="group cursor-pointer">
                <div className="h-64 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={COURSE_CARD_IMAGES[idx]}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="w-10 h-0.5 bg-secondary mb-3" />
                <h3 className="font-semibold text-primary text-center">{course.title}</h3>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-12 text-lg">
            Not sure which course is right for you? <Link to="/contact-us" className="text-secondary font-semibold hover:underline">Let's figure it out together.</Link>
          </p>
        </div>
      </section>

      {/* Section 5 — How it Works */}
      <section id="how-it-works" className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="HOW IT WORKS"
            title="Three Steps to Your Licence"
            description="Getting on the road is easier than you think. Here's how it works for you."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.title} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  {ICON_MAP[step.icon]}
                </div>
                <h3 className="font-bold text-primary text-xl mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — "A Different Drive Everyday!" (dark section) */}
      <section className="bg-accent py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
                What You Get
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                Everything You Need to Pass
              </h2>
            </div>
            <div className="flex items-center">
              <p className="text-gray-400 leading-relaxed">
                Whether you're 17 and just starting out, picking it back up after a break, or switching
                from automatic to manual — your lessons are tailored to you. No one-size-fits-all.
                Your instructor adapts to how you learn best.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.slice(0, 4).map((feature, idx) => (
              <div
                key={feature.title}
                className="border border-white/10 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-full border border-secondary/40 flex items-center justify-center mb-5">
                  {FEATURE_ICONS[idx]}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Motivational Quotes (3 colored cards) */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUOTES.map((q) => (
              <div
                key={q.text}
                className={`${q.color} rounded-lg p-10 flex items-center justify-center min-h-[200px]`}
              >
                <p className="text-white text-xl md:text-2xl font-medium text-center leading-relaxed">
                  "{q.text}"
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-12 text-lg">
            That could be you. <Link to="/contact-us" className="text-secondary font-semibold hover:underline">Start your journey today.</Link>
          </p>
        </div>
      </section>



      {/* Section 9 — Instructor Bio */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full h-96 rounded-2xl overflow-hidden">
              <img
                src="/images/instructor.jpg"
                alt="Learner driver swapping L plates for P plates with instructor"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
                A Message From Your Instructor
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-2">
                Hi, I'm David.
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                I'll be teaching you.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                I've been teaching people to drive for over 15 years, and I still love it.
                Whether you're nervous, excited, or somewhere in between — I'll meet you where
                you are. My job isn't just to get you through the test. It's to make sure you
                feel genuinely confident every time you sit behind the wheel. I cover all of
                London, so wherever you are, I'll come to you.
              </p>
              <div className="space-y-4">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10 — London Coverage */}
      <section className="bg-accent py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
                Areas We Cover
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                We'll Come to You
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                No need to travel — your instructor picks you up from home, work, or college.
                You'll learn on the same roads you'll be driving every day, so nothing feels
                unfamiliar when you're on your own.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {[
                  'North London', 'South London', 'East London',
                  'West London', 'Central London', 'Croydon',
                  'Barnet', 'Enfield', 'Bromley',
                  'Greenwich', 'Hackney', 'Lewisham',
                  'Islington', 'Camden', 'Wandsworth',
                ].map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 text-sm text-white/90"
                  >
                    <MapPin size={14} className="text-secondary shrink-0" />
                    {area}
                  </div>
                ))}
              </div>

              <p className="text-gray-400 text-sm">
                Don't see your area? <a href="/contact-us" className="text-secondary hover:underline">Drop us a message</a> — chances are we're already there.
              </p>
            </div>

            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto relative">
                {/* Stylized map visualization */}
                <div className="absolute inset-0 rounded-full border-2 border-secondary/30" />
                <div className="absolute inset-6 rounded-full border border-secondary/20" />
                <div className="absolute inset-12 rounded-full border border-secondary/15" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Map size={48} className="text-secondary mx-auto mb-3" />
                    <p className="text-white font-bold text-xl">London</p>
                    <p className="text-gray-400 text-sm">All Zones Covered</p>
                  </div>
                </div>
                {/* Pins around the circle */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2"><MapPin size={18} className="text-secondary" /></div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2"><MapPin size={18} className="text-secondary" /></div>
                <div className="absolute left-4 top-1/2 -translate-y-1/2"><MapPin size={18} className="text-secondary" /></div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2"><MapPin size={18} className="text-secondary" /></div>
                <div className="absolute top-16 left-16"><MapPin size={16} className="text-secondary/70" /></div>
                <div className="absolute top-16 right-16"><MapPin size={16} className="text-secondary/70" /></div>
                <div className="absolute bottom-16 left-16"><MapPin size={16} className="text-secondary/70" /></div>
                <div className="absolute bottom-16 right-16"><MapPin size={16} className="text-secondary/70" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11 — Testimonials */}
      <section className="bg-light py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="FROM PEOPLE LIKE YOU"
            title="They Passed. You're Next."
            description="Real stories from real learners who were exactly where you are right now."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
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

      {/* Section 11 — Blog */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="TIPS & GUIDES"
            title="Helpful Reads Before Your Test"
            description="Honest advice to help you feel prepared — written by people who've taught thousands to pass."
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
                  <div
                    className={`h-48 bg-gradient-to-br ${gradients[idx]} flex items-center justify-center`}
                  >
                    <Car
                      size={48}
                      className="text-white/50 group-hover:scale-110 transition-transform"
                    />
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
