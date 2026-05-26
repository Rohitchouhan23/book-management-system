import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 animate-fade-in px-4 text-center">
      <div className="text-7xl">📚</div>
      <h1 className="font-heading font-bold text-4xl text-ink">404</h1>
      <p className="font-body text-gray-500 text-lg">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-2 px-6 py-2.5 bg-forest-800 text-cream rounded-xl font-body font-semibold hover:bg-forest-700 transition-colors shadow-md"
      >
        ← Back to Library
      </Link>
    </div>
  )
}