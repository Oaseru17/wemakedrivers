export interface Faq {
  id: string
  question: string
  answer: string
}

const FAQS: Faq[] = [
  {
    id: 'lesson-cost',
    question: 'How much do driving lessons cost?',
    answer:
      'Our lessons start from £40 per hour for manual and £45 per hour for automatic. Block-booking discounts are available — for example, buying ten lessons upfront typically saves you around 10%. Intensive crash courses are priced separately based on hours required.',
  },
  {
    id: 'lesson-duration',
    question: 'How long is each driving lesson?',
    answer:
      "Standard lessons are one hour, which gives you focused, productive time behind the wheel. If you'd prefer a longer session, we also offer 1.5-hour and 2-hour slots — great when you want to cover a specific skill without breaking your flow.",
  },
  {
    id: 'manual-automatic',
    question: 'Do you teach both manual and automatic?',
    answer:
      'Yes — we offer both. Manual lessons give you the flexibility to drive any car, while automatic lessons let you focus purely on road awareness and build confidence faster. Your instructor can advise which suits your goals best.',
  },
  {
    id: 'areas-covered',
    question: 'Which areas of North London do you cover?',
    answer:
      'We cover 19 areas across North London, including Hendon, Finchley, Golders Green, Barnet, Camden, Edgware, Hampstead, Highgate, Mill Hill, Muswell Hill, Southgate, Tottenham, Wood Green, and more. See our <a href="/areas">Areas page</a> for the full list and local route details.',
  },
  {
    id: 'test-ready-time',
    question: 'How long until I am test-ready?',
    answer:
      "Most learners need around 30–45 hours of professional instruction before they're ready to take their driving test, though this varies depending on your experience and how quickly you pick things up. We'll be honest with you about your progress at every stage rather than rushing you to the test before you're ready.",
  },
  {
    id: 'what-to-bring',
    question: 'What do I need to bring to a lesson?',
    answer:
      "You'll need your provisional driving licence — without it we legally cannot let you drive. If you wear glasses or contact lenses for distance vision, bring those too. Everything else, including the car, is provided by us.",
  },
  {
    id: 'cancel-reschedule',
    question: 'Can I cancel or reschedule a lesson?',
    answer:
      "Yes, as long as you give at least 24 hours' notice. Cancellations or changes made within 24 hours of the lesson time may be charged in full. We understand that things come up — just get in touch as early as possible and we'll do our best to accommodate you.",
  },
  {
    id: 'intensive-course',
    question: 'What is an intensive crash course?',
    answer:
      "An intensive course packs your driving hours into one or two weeks rather than spreading them over several months. It's particularly well-suited to people who already have some driving experience — for example, those who have driven abroad or on private land. Complete beginners can also do intensive courses but should allow a little longer.",
  },
  {
    id: 'dvsa-approved',
    question: 'Are your instructors DVSA-approved?',
    answer:
      'Yes — every WeMake Drivers instructor holds a current DVSA Approved Driving Instructor (ADI) licence. This means they have passed three rigorous DVSA examinations covering theory, driving ability, and teaching ability. You can ask to see your instructor\'s ADI badge at any time.',
  },
  {
    id: 'pass-plus',
    question: 'Do you offer Pass Plus?',
    answer:
      'Yes. Pass Plus is a DVSA-recognised post-test course covering motorway driving, night driving, driving in poor weather, and rural roads. It typically takes six hours spread over a few sessions. Many insurers offer a discount for newly-qualified drivers who have completed Pass Plus — worth asking your insurer before you book.',
  },
]

export { FAQS }
