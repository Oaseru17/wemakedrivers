interface SectionHeadingProps {
  subtitle: string
  title: string
  description?: string
  center?: boolean
  light?: boolean
}

function SectionHeading({ subtitle, title, description, center = false, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <span className={`text-sm font-semibold uppercase tracking-wider ${light ? 'text-secondary/80' : 'text-secondary'}`}>
        {subtitle}
      </span>
      <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-lg ${center ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export { SectionHeading as default }
