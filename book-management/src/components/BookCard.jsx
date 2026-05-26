const GENRE_COLORS = {
  Fiction: 'bg-blue-100 text-blue-700',
  'Non-Fiction': 'bg-green-100 text-green-700',
  Science: 'bg-purple-100 text-purple-700',
  History: 'bg-orange-100 text-orange-700',
  Fantasy: 'bg-pink-100 text-pink-700',
  Biography: 'bg-teal-100 text-teal-700',
  Mystery: 'bg-gray-100 text-gray-700',
  Romance: 'bg-rose-100 text-rose-700',
  'Self-Help': 'bg-yellow-100 text-yellow-700',
  Technology: 'bg-cyan-100 text-cyan-700',
}

export default function BookCard({ book, onEdit, onDelete, onView }) {
  const genreColor = GENRE_COLORS[book.genre] || 'bg-amber-100 text-amber-700'

  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col gap-3 animate-slide-up group h-[300px]">
      
      {/* Top Section - Fixed height */}
      <div className="flex items-start justify-between gap-3 h-[64px]">
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3
            onClick={onView}
            className="font-heading font-bold text-ink text-base leading-tight cursor-pointer hover:text-amber-600 transition-colors overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              height: '40px'
            }}
          >
            {book.title}
          </h3>
          <p className="text-forest-700 font-body text-xs mt-1 font-medium truncate">
            by {book.author}
          </p>
        </div>
        {/* Book Icon */}
        <div className="w-11 h-11 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-300">
          <span className="text-xl">📖</span>
        </div>
      </div>

      {/* Tags - Fixed height */}
      <div className="flex flex-wrap gap-2 h-[28px] overflow-hidden">
        <span className={`text-xs font-bold px-3 py-1 rounded-full font-body whitespace-nowrap ${genreColor}`}>
          {book.genre || 'General'}
        </span>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-body border border-amber-200 whitespace-nowrap">
          📅 {book.year || 'N/A'}
        </span>
      </div>

      {/* Description - Fixed height */}
      <div className="flex-1 overflow-hidden">
        <p
          className="text-sm text-gray-500 font-body leading-relaxed"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {book.description || 'No description available for this book.'}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-amber-100" />

      {/* Actions - Fixed height */}
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="flex-1 py-2 text-xs font-bold font-body text-forest-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200"
        >
          👁 View
        </button>
        <button
          onClick={onEdit}
          className="flex-1 py-2 text-xs font-bold font-body text-forest-800 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 py-2 text-xs font-bold font-body text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}