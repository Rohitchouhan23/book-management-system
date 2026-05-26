import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-forest-800 text-cream shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center shadow-md group-hover:bg-amber-400 transition-colors">
              <span className="text-forest-900 text-lg font-bold font-heading">B</span>
            </div>
            <span className="font-heading text-xl font-bold tracking-wide">
              Book<span className="text-amber-400">Shelf</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <span className="text-amber-200 text-sm font-body">📚 Your Personal Library</span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-forest-700 transition-colors"
          >
            <div className={`w-5 h-0.5 bg-cream mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-cream mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-cream transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <p className="text-amber-200 text-sm px-2 py-2">📚 Your Personal Library</p>
          </div>
        )}
      </div>
    </nav>
  )
}