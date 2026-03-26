import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PageBanner from '../components/shared/PageBanner'
import { BLOG_POSTS } from '../data/site'

function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return (
      <>
        <PageBanner title="Post Not Found" />
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-600 mb-6">The blog post you are looking for does not exist.</p>
            <Link to="/blog" className="text-secondary font-semibold hover:underline">
              Back to Blog
            </Link>
          </div>
        </section>
      </>
    )
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug)
  const categories = [...new Set(BLOG_POSTS.map((p) => p.category))]

  return (
    <>
      <PageBanner title={post.title} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-secondary font-semibold text-sm mb-8 hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Featured Image Placeholder */}
              <div className="rounded-xl overflow-hidden h-[350px] mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-dark" />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-5 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5 bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  {post.category}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-primary mb-6">{post.title}</h2>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-5">
                <p>
                  Learning to drive in London is a unique experience that comes with its own set of challenges and rewards.
                  Whether you are a complete beginner or returning to driving after a break, understanding the fundamentals is
                  essential. In this article, we explore key insights related to {post.title.toLowerCase()} and what it means
                  for learner drivers across the capital.
                </p>
                <p>
                  One of the most common questions we hear from students is how to stay calm and focused during lessons.
                  The answer often comes down to preparation and choosing the right support system. A qualified, patient
                  instructor can make all the difference, turning what feels like an overwhelming task into a manageable,
                  even enjoyable, journey.
                </p>
                <p>
                  At WeMake Drivers, we believe that every learner deserves a tailored approach. Our instructors adapt
                  their teaching style to match your pace and learning preferences. From quiet residential streets to busy
                  London junctions, we ensure you gain the experience needed to drive safely and confidently in any
                  environment.
                </p>
                <p>
                  If you are ready to take the next step, get in touch with our team to book your first lesson. With
                  flexible scheduling, DVSA-approved instructors, and a proven track record of helping students pass,
                  WeMake Drivers is the smart choice for anyone learning to drive in London.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Recent Posts */}
              <div className="bg-light rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-5">Recent Posts</h3>
                <div className="space-y-4">
                  {otherPosts.map((other) => (
                    <Link
                      key={other.slug}
                      to={`/blog/${other.slug}`}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-secondary to-accent shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors leading-snug">
                          {other.title}
                        </h4>
                        <span className="text-xs text-gray-400 mt-1 block">
                          {new Date(other.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-light rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-5">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category}>
                      <span className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors cursor-pointer text-sm">
                        <Tag className="w-3.5 h-3.5" />
                        {category}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPost
