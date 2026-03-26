import { Link } from 'react-router-dom'

interface PageBannerProps {
  title: string
  breadcrumb?: string
}

function PageBanner({ title, breadcrumb }: PageBannerProps) {
  return (
    <section className="bg-primary py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-secondary">{breadcrumb || title}</span>
        </div>
      </div>
    </section>
  )
}

export { PageBanner as default }
