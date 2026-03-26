import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/shared/PageBanner'
import { BLOG_POSTS } from '../data/site'

function Blog() {
  return (
    <>
      <PageBanner title="Blog" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                {/* Image placeholder */}
                <div className="relative h-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-dark" />
                  <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </div>

                  <h3 className="text-lg font-bold text-primary mb-2">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-secondary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-secondary font-semibold text-sm hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog
