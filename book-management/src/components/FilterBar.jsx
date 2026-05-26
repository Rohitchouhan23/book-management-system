const GENRES = ['All', 'Fiction', 'Non-Fiction', 'Science', 'History', 'Fantasy', 'Biography', 'Mystery', 'Romance', 'Self-Help', 'Technology']

export default function FilterBar({ search, setSearch, genre, setGenre, onAddClick }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-sm animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-amber-200 bg-cream focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 font-body text-sm text-ink placeholder-amber-300 transition-all"
          />
        </div>

        {/* Genre Filter */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-amber-200 bg-cream focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 font-body text-sm text-ink cursor-pointer transition-all min-w-[140px]"
        >
          {GENRES.map(g => (
            <option key={g} value={g}>{g === 'All' ? '📚 All Genres' : g}</option>
          ))}
        </select>

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-forest-800 hover:bg-forest-700 text-cream rounded-xl font-body font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Book
        </button>
      </div>
    </div>
  )
}