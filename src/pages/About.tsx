import { Link } from 'react-router-dom'
import {
  Car,
  Shield,
  CreditCard,
  Clock,
  Award,
  Users,
  BookOpen,
  MapPin,
  CheckCircle,
  ExternalLink,
  Mail,
} from 'lucide-react'
import PageBanner from '../components/shared/PageBanner'
import SectionHeading from '../components/shared/SectionHeading'
import { STATS, FEATURES, TEAM } from '../data/site'
import SEO from '../components/shared/SEO'

const SERVICES = [
  {
    icon: CreditCard,
    title: 'No Down Payment',
    description:
      'Pick any car from our wide selection and start your lessons immediately with zero upfront costs.',
  },
  {
    icon: Car,
    title: 'Drive a Collection',
    description:
      'Choose from our best selection of modern, dual-controlled vehicles for a comfortable learning experience.',
  },
  {
    icon: Shield,
    title: 'Protect Your Drive',
    description:
      'Every lesson is fully insured so you can focus on learning without worrying about anything else.',
  },
]

const AWARDS = [
  {
    year: '2021',
    title: 'Best Driving School in London',
    description:
      'Recognised by the Driving Instructors Association for outstanding pass rates and student satisfaction across all London boroughs.',
  },
  {
    year: '2020',
    title: 'Virtual Reality Driving Instructor',
    description:
      'Pioneered the use of VR simulators in driving education, giving nervous learners a safe space to build confidence before hitting the road.',
  },
  {
    year: '2019',
    title: 'Excellence in Road Safety Education',
    description:
      'Awarded by Transport for London for our commitment to road safety awareness and community outreach programmes.',
  },
  {
    year: '2018',
    title: 'Innovation in Driver Training',
    description:
      'Honoured for introducing adaptive learning techniques that personalise lesson plans to each student\'s pace and style.',
  },
]

const FEATURE_ICONS = [Clock, CheckCircle, Users, BookOpen, Award, MapPin]

function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Meet the WeMake Drivers team. 15+ years of experience, 5,000+ happy drivers, and DVSA-approved instructors teaching across all London zones."
        path="/about-us"
      />
      <PageBanner title="About Us" />

      {/* Section 1 — About Intro + Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                We are really excited about our training course.
              </h2>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                At WeMake Drivers, we believe everyone deserves access to
                high-quality driving instruction. Our mission is to make
                instructor training efficient, affordable, and genuinely
                effective. Whether you are a complete beginner or looking to
                sharpen your skills, our DVSA-approved instructors tailor every
                lesson to your needs.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                With over 15 years of experience on London roads, we have helped
                thousands of learners gain the confidence and skills they need to
                pass their test and become safe, independent drivers.
              </p>
              <Link
                to="/courses"
                className="mt-8 inline-block bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                View Our Courses
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-light rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl md:text-5xl font-bold text-secondary">
                    {stat.value}
                  </span>
                  <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Services */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="WHAT WE OFFER"
            title="Services We Provide"
            description="Everything you need for a smooth, stress-free journey from learner to licensed driver."
            center
          />

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <Icon className="w-7 h-7 text-secondary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mt-6">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 3 — Awards Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="OUR ACHIEVEMENTS"
            title="Awards that we have."
            center
          />

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

            {AWARDS.map((award, index) => {
              const isLeft = index % 2 === 0
              return (
                <div
                  key={award.year}
                  className={`relative flex flex-col md:flex-row items-center mb-12 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                    }`}
                  >
                    <div className="bg-light rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
                        {award.year}
                      </span>
                      <h3 className="text-lg font-bold text-primary mt-1">
                        {award.title}
                      </h3>
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex w-2/12 justify-center relative z-10">
                    <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold shadow-lg">
                      {award.year}
                    </div>
                  </div>

                  <div className="hidden md:block w-5/12" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 4 — We Work Around You (Features) */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="WHY CHOOSE US"
            title="We Work Around You"
            description="Flexible, personalised driving lessons designed to fit your life."
            center
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length]
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 group"
                >
                  <div className="shrink-0 w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <Icon className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — Meet Our Instructors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="HELPING CLIENTS"
            title="Meet Our Instructors"
            description="Our team of experienced, DVSA-approved instructors are here to guide you every step of the way."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-light rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="h-64 bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white/60" />
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-primary">
                    {member.name}
                  </h3>
                  <p className="text-secondary text-sm font-medium mt-1">
                    {member.role}
                  </p>

                  <div className="flex items-center justify-center gap-3 mt-4">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors text-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors text-primary"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors text-primary"
                    >
                      <Users className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export { About as default }
