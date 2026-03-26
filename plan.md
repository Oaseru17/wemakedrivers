# Home.tsx Rewrite Plan

## Task
Completely rewrite Home.tsx to match the Dreevex driving school template layout.

## Sections (11 total)
1. Hero - full-width bg image, dark overlay, left-aligned content, tab links, green outlined button
2. Courses + Apply Form - two columns (60/40), course items left, form card right
3. CTA Banner - green bg, heading left, phone right
4. Popular Courses - 4 photo cards in a row with gradient placeholders
5. How it Works - 3 service cards with icons
6. Dark Features section - navy bg, feature cards with green borders
7. Motivational Quotes - 3 colored cards (teal, purple, orange)
8. Partner Logos - 4 placeholder logos
9. Instructor Bio - photo left, contact info right
10. Testimonials - light gray bg, quote cards
11. Blog - cards with image, date, category, title

## Colors
- secondary: #3cb878 (green)
- accent/dark: #1b1d2a (dark navy)
- teal: #3bbfa0
- purple: #9b59b6
- orange: #e67e22
- primary: #2d2f3e
- light: #f5f6fa

## Data imports
SITE, COURSES, TESTIMONIALS, BLOG_POSTS, STATS, HOW_IT_WORKS, FEATURES from ../data/site

## Component imports
SectionHeading from ../components/shared/SectionHeading
Link from react-router-dom
Icons from lucide-react
