export const SITE = {
  name: 'WeMake Drivers',
  tagline: 'Learn to Drive in London',
  phone: '020 7946 0958',
  email: 'hello@wemakedrivers.co.uk',
  address: 'London, United Kingdom',
  whatsapp: 'https://wa.me/442079460958',
  rating: 4.8,
  reviewCount: 312,
}

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Courses', path: '/courses' },
  {
    label: 'Blog',
    path: '/blog',
    children: [
      { label: 'Blog Grid', path: '/blog' },
      { label: 'Blog List', path: '/blog/list' },
      { label: 'Blog Post', path: '/blog/choosing-the-right-instructor' },
    ],
  },
  { label: 'Contact Us', path: '/contact-us' },
]

export const COURSES = [
  {
    id: 'choosing-instructor',
    title: 'Choosing a Driving Instructor',
    description: 'Learn what to look for in a qualified driving instructor and how to find the right match for your learning style.',
    icon: 'user-check',
  },
  {
    id: 'automatic-lessons',
    title: 'Automatic Driving Lessons',
    description: 'Master driving in an automatic vehicle with our comprehensive lesson plans designed for beginners.',
    icon: 'car',
  },
  {
    id: 'manual-lessons',
    title: 'Manual Driving Lessons',
    description: 'Full manual driving course covering clutch control, gear changes, and all aspects of manual driving.',
    icon: 'settings',
  },
  {
    id: 'test-preparation',
    title: 'Test Preparation',
    description: 'Intensive courses focused on preparing you for both the theory and practical driving tests.',
    icon: 'clipboard-check',
  },
  {
    id: 'motorway-lessons',
    title: 'Motorway Lessons',
    description: 'Build confidence on motorways with expert guidance on lane discipline, merging, and high-speed driving.',
    icon: 'route',
  },
  {
    id: 'refresher-course',
    title: 'Refresher Course',
    description: 'Perfect for returning drivers who want to rebuild confidence after a break from driving.',
    icon: 'refresh-cw',
  },
  {
    id: 'pass-plus',
    title: 'Pass Plus',
    description: 'Post-test course covering motorways, night driving, and adverse weather conditions. Can reduce insurance costs.',
    icon: 'award',
  },
  {
    id: 'intensive-course',
    title: 'Intensive Crash Course',
    description: 'Fast-track your learning with our intensive courses — pass your test in as little as one week.',
    icon: 'zap',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Passed First Time',
    text: "WeMake Drivers made learning to drive easy and stress-free. My instructor was patient and really knew how to explain things clearly. Passed first time!",
  },
  {
    name: 'James Okonkwo',
    role: 'Nervous Beginner',
    text: "I was terrified of driving but my instructor at WeMake Drivers was so calm and encouraging. I can't believe I actually passed! Highly recommend.",
  },
  {
    name: 'Priya Sharma',
    role: 'Intensive Course',
    text: "Did the intensive course and passed in just 2 weeks. The structured approach and mock tests really prepared me well. Worth every penny.",
  },
]

export const BLOG_POSTS = [
  {
    slug: 'choosing-the-right-instructor',
    title: 'How to Choose the Right Driving Instructor',
    excerpt: 'Finding the right instructor can make or break your learning experience. Here are the key things to look for.',
    date: '2026-03-20',
    category: 'Tips',
    image: '/images/blog-1.jpg',
  },
  {
    slug: 'test-day-tips',
    title: 'Test Day: Everything You Need to Know',
    excerpt: 'Nervous about your driving test? Here are our top tips for staying calm and passing with confidence.',
    date: '2026-03-15',
    category: 'Test Prep',
    image: '/images/blog-2.jpg',
  },
  {
    slug: 'london-driving-guide',
    title: 'Navigating London: A New Driver\'s Guide',
    excerpt: 'London roads can be daunting for new drivers. Learn the key routes, roundabouts, and tips for city driving.',
    date: '2026-03-10',
    category: 'Guides',
    image: '/images/blog-3.jpg',
  },
]

export const TEAM = [
  { name: 'David Apperson', role: 'Chief Instructor', image: '/images/team-1.jpg' },
  { name: 'Lisa Chen', role: 'Classroom Instructor', image: '/images/team-2.jpg' },
  { name: 'Michael Brown', role: 'Driving Instructor', image: '/images/team-3.jpg' },
]

export const STATS = [
  { value: '5K+', label: 'Happy Drivers' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Pass Rate' },
  { value: '40+', label: 'Instructors' },
]

export const HOW_IT_WORKS = [
  {
    title: 'Sign Up Online',
    description: 'Register on our website in under 2 minutes. Tell us about your experience level and preferred times.',
    icon: 'user-plus',
  },
  {
    title: 'Book Your Lessons',
    description: 'Choose from available time slots that work around your schedule. Flexible booking, easy rescheduling.',
    icon: 'calendar',
  },
  {
    title: 'Start Driving',
    description: 'Meet your instructor and begin your journey to becoming a confident, safe driver on London roads.',
    icon: 'car',
  },
]

export const FEATURES = [
  { title: 'Flexible Schedule', description: 'Book lessons around your work, school, or college timetable.' },
  { title: 'Confident Driving', description: 'Build real confidence with patient, experienced instructors.' },
  { title: 'Experienced Teachers', description: 'All our instructors are DVSA-approved with years of experience.' },
  { title: 'Driving Basics', description: 'Master the fundamentals from clutch control to parallel parking.' },
  { title: 'Test Preparation', description: 'Focused prep for both theory and practical driving tests.' },
  { title: 'London Coverage', description: 'We cover all London zones — wherever you are, we come to you.' },
]
