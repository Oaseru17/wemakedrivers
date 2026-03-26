import { Phone, Users, MessageCircle, HeadphonesIcon, Send } from 'lucide-react'
import PageBanner from '../components/shared/PageBanner'
import SectionHeading from '../components/shared/SectionHeading'
import { SITE, TEAM } from '../data/site'
import SEO from '../components/shared/SEO'

const contactMethods = [
  {
    icon: Phone,
    color: 'bg-secondary',
    title: 'Call on Phone',
    description: 'Give us a ring and speak directly with our friendly booking team.',
  },
  {
    icon: Users,
    color: 'bg-accent',
    title: 'Follow Social',
    description: 'Stay connected with us on social media for tips and updates.',
  },
  {
    icon: MessageCircle,
    color: 'bg-gold',
    title: 'Chat with Us',
    description: 'Start a live chat and get instant answers to your questions.',
  },
  {
    icon: HeadphonesIcon,
    color: 'bg-primary',
    title: 'Helpful Support',
    description: 'Our support team is available 7 days a week to assist you.',
  },
]

function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with WeMake Drivers. Call, email, or use our contact form to book driving lessons in London. We cover all London zones."
        path="/contact-us"
      />
      <PageBanner title="Contact Us" />

      {/* Contact Methods */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-5`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <SectionHeading
                subtitle="Get in Touch"
                title="Talk to us?"
                description="You have questions and we have answers!"
              />
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Submit Message
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden min-h-[400px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-dark" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1">London Coverage Area</h3>
                <p className="text-gray-300 text-sm">{SITE.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Contacts */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            subtitle="Our Team"
            title="Meet the Instructors"
            description="Book a lesson with one of our experienced, DVSA-approved instructors."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent mx-auto mb-5" />
                <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-secondary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">
                  Use our online booking system to schedule lessons with {member.name.split(' ')[0]} at a time that suits you.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
