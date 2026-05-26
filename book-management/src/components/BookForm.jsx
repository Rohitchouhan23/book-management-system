import { useState, useEffect } from 'react'

const GENRES = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Fantasy', 'Biography', 'Mystery', 'Romance', 'Self-Help', 'Technology']

const EMPTY = { title: '', author: '', genre: '', year: '', description: '' }

export default function BookForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initialData ? { ...EMPTY, ...initialData } : EMPTY)
    setErrors({})
  }, [initialData])

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.author.trim()) e.author = 'Author is required'
    if (!form.genre) e.genre = 'Genre is required'
    if (!form.year || isNaN(form.year) || form.year < 1000 || form.year > new Date().getFullYear())
      e.year = `Enter a valid year (1000–${new Date().getFullYear()})`
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    onSubmit({ ...form, year: Number(form.year) })
  }

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border font-body text-sm text-ink bg-cream focus:outline-none focus:ring-2 transition-all
    ${errors[field] ? 'border-red-400 focus:ring-red-100' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-100'}`

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-forest-800 mb-1.5 font-body">Book Title *</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. The Great Gatsby" className={inputClass('title')} />
        {errors.title && <p className="text-red-500 text-xs mt-1 font-body">{errors.title}</p>}
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-semibold text-forest-800 mb-1.5 font-body">Author *</label>
        <input name="author" value={form.author} onChange={handleChange} placeholder="e.g. F. Scott Fitzgerald" className={inputClass('author')} />
        {errors.author && <p className="text-red-500 text-xs mt-1 font-body">{errors.author}</p>}
      </div>

      {/* Genre + Year */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-forest-800 mb-1.5 font-body">Genre *</label>
          <select name="genre" value={form.genre} onChange={handleChange} className={inputClass('genre') + ' cursor-pointer'}>
            <option value="">Select genre</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          {errors.genre && <p className="text-red-500 text-xs mt-1 font-body">{errors.genre}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-forest-800 mb-1.5 font-body">Year *</label>
          <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="e.g. 1925" className={inputClass('year')} />
          {errors.year && <p className="text-red-500 text-xs mt-1 font-body">{errors.year}</p>}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-forest-800 mb-1.5 font-body">Description <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief description of the book..."
          rows={3}
          className={inputClass('description') + ' resize-none'}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-amber-200 text-forest-800 font-body font-semibold text-sm hover:bg-amber-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream font-body font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? 'Saving...' : initialData ? '✅ Update Book' : '➕ Add Book'}
        </button>
      </div>
    </form>
  )
}