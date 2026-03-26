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
    title: 'Find Your Perfect Instructor',
    description: "You'll be matched with an instructor who fits your personality and learning style — so every lesson feels comfortable.",
    icon: 'user-check',
  },
  {
    id: 'automatic-lessons',
    title: 'Automatic Driving Lessons',
    description: "If you'd rather skip the clutch, our automatic lessons let you focus purely on the road and build your confidence faster.",
    icon: 'car',
  },
  {
    id: 'manual-lessons',
    title: 'Manual Driving Lessons',
    description: "Want full control? You'll master clutch control, smooth gear changes, and everything you need to drive any car.",
    icon: 'settings',
  },
  {
    id: 'test-preparation',
    title: 'Test Preparation',
    description: "When you're ready for your test, we'll run you through mock exams, tricky junctions, and everything the examiner looks for.",
    icon: 'clipboard-check',
  },
  {
    id: 'motorway-lessons',
    title: 'Motorway Lessons',
    description: "Motorways can feel intimidating at first. We'll be right beside you, helping you master lane changes, merging, and speed.",
    icon: 'route',
  },
  {
    id: 'refresher-course',
    title: 'Refresher Course',
    description: "Haven't driven in a while? No worries — you'll shake off the rust and get your confidence back in just a few sessions.",
    icon: 'refresh-cw',
  },
  {
    id: 'pass-plus',
    title: 'Pass Plus',
    description: "Already passed? Level up with night driving, motorways, and adverse weather — plus you could save on your insurance.",
    icon: 'award',
  },
  {
    id: 'intensive-course',
    title: 'Intensive Crash Course',
    description: "Need your licence fast? You could be test-ready in as little as one week with our focused, intensive programme.",
    icon: 'zap',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Passed First Time',
    text: "I was so nervous starting out, but my instructor made everything feel easy. I passed first time and I actually enjoy driving now!",
  },
  {
    name: 'James Okonkwo',
    role: 'Nervous Beginner',
    text: "I put off learning for years because I was scared. My instructor was incredibly patient — I went from terrified to passing in 8 weeks.",
  },
  {
    name: 'Priya Sharma',
    role: 'Intensive Course',
    text: "I did the intensive course and passed in 2 weeks. The mock tests made the real thing feel easy. Best decision I made.",
  },
]

export const BLOG_POSTS = [
  {
    slug: 'choosing-the-right-instructor',
    title: 'How to Choose the Right Driving Instructor',
    excerpt: "Your instructor can make or break your experience. Here's how to find someone who actually fits your learning style.",
    date: '2026-03-20',
    category: 'Tips',
    image: '/images/blog-1.jpg',
  },
  {
    slug: 'test-day-tips',
    title: 'Test Day: Everything You Need to Know',
    excerpt: "Feeling nervous? That's normal. Here's exactly what to expect on test day and how to stay calm behind the wheel.",
    date: '2026-03-15',
    category: 'Test Prep',
    image: '/images/blog-2.jpg',
  },
  {
    slug: 'london-driving-guide',
    title: 'Navigating London: A New Driver\'s Guide',
    excerpt: "London roads can feel overwhelming at first. Here are the routes, roundabouts, and tips that will make you feel at home.",
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
  { value: '5K+', label: 'Learners Passed' },
  { value: '15+', label: 'Years Teaching' },
  { value: '98%', label: 'First-Time Pass Rate' },
  { value: '4.8', label: 'Average Rating' },
]

export const HOW_IT_WORKS = [
  {
    title: 'Tell Us About You',
    description: "Fill in a quick form — your experience, your area, and when you're free. Takes under 2 minutes.",
    icon: 'user-plus',
  },
  {
    title: 'Pick Your Slots',
    description: "Choose lesson times that work around your life. Evenings, weekends, whenever suits you best.",
    icon: 'calendar',
  },
  {
    title: 'Get Behind the Wheel',
    description: "Your instructor picks you up from home, work, or college. You'll be driving from your very first lesson.",
    icon: 'car',
  },
]

export const FEATURES = [
  { title: 'Your Schedule, Your Pace', description: "Book lessons when it suits you — mornings, evenings, weekends. You're in control." },
  { title: 'Real Confidence', description: "You won't just learn to pass. You'll learn to actually enjoy being behind the wheel." },
  { title: 'DVSA-Approved Instructors', description: "Every instructor is qualified, vetted, and genuinely loves teaching people to drive." },
  { title: 'Basics to Advanced', description: "Whether you're touching a steering wheel for the first time or prepping for your test — we've got you." },
  { title: 'Test-Ready Prep', description: "Mock tests, examiner routes, and honest feedback so there are no surprises on the day." },
  { title: 'We Come to You', description: "Wherever you are in London, your instructor picks you up. No commute, no hassle." },
]
