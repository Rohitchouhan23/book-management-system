import { useState, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { getAllBooks, createBook, updateBook, deleteBook } from '../api/bookApi'
import BookCard from '../components/BookCard'
import BookForm from '../components/BookForm'
import BookModal from '../components/BookModal'
import DeleteConfirm from '../components/DeleteConfirm'
import FilterBar from '../components/FilterBar'
import Loader from '../components/Loader'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')

  const [modal, setModal] = useState(null) // 'add' | 'edit' | 'delete' | 'view'
  const [selected, setSelected] = useState(null)

  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await getAllBooks()
      setBooks(res.data)
    } catch {
      setError('Failed to fetch books. Please check your API URL.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBooks() }, [])

  const filtered = useMemo(() => {
    return books.filter(b => {
      const q = search.toLowerCase()
      const matchSearch = !q || b.title?.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q)
      const matchGenre = genre === 'All' || b.genre === genre
      return matchSearch && matchGenre
    })
  }, [books, search, genre])

  const closeModal = () => { setModal(null); setSelected(null) }

  const handleAdd = async (data) => {
    try {
      setActionLoading(true)
      const res = await createBook(data)
      setBooks(b => [res.data, ...b])
      toast.success('Book added successfully!')
      closeModal()
    } catch {
      toast.error('Failed to add book.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleUpdate = async (data) => {
    try {
      setActionLoading(true)
      const res = await updateBook(selected.id, data)
      setBooks(b => b.map(book => book.id === selected.id ? res.data : book))
      toast.success('Book updated successfully!')
      closeModal()
    } catch {
      toast.error('Failed to update book.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setActionLoading(true)
      await deleteBook(selected.id)
      setBooks(b => b.filter(book => book.id !== selected.id))
      toast.success('Book deleted.')
      closeModal()
    } catch {
      toast.error('Failed to delete book.')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="mb-8 animate-fade-in">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-ink">
          📚 My <span className="text-amber-600">Book</span> Collection
        </h1>
        <p className="font-body text-gray-500 mt-2 text-sm sm:text-base">
          Manage your personal library — add, edit, search and organize your books.
        </p>
      </div>

      {/* Stats Bar */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 animate-fade-in">
          <div className="bg-white border border-amber-100 rounded-xl p-4 text-center shadow-sm">
            <p className="font-heading font-bold text-2xl text-forest-800">{books.length}</p>
            <p className="font-body text-xs text-gray-500 mt-0.5">Total Books</p>
          </div>
          <div className="bg-white border border-amber-100 rounded-xl p-4 text-center shadow-sm">
            <p className="font-heading font-bold text-2xl text-amber-600">{filtered.length}</p>
            <p className="font-body text-xs text-gray-500 mt-0.5">Showing</p>
          </div>
          <div className="bg-white border border-amber-100 rounded-xl p-4 text-center shadow-sm col-span-2 sm:col-span-1">
            <p className="font-heading font-bold text-2xl text-forest-700">
              {[...new Set(books.map(b => b.genre).filter(Boolean))].length}
            </p>
            <p className="font-body text-xs text-gray-500 mt-0.5">Genres</p>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          onAddClick={() => setModal('add')}
        />
      </div>

      {/* Content */}
      {loading && <Loader />}

      {error && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="font-body text-red-500 font-semibold">{error}</p>
          <button
            onClick={fetchBooks}
            className="mt-4 px-5 py-2 bg-forest-800 text-cream rounded-xl font-body font-semibold text-sm hover:bg-forest-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="font-heading font-bold text-ink text-xl">No books found</h3>
          <p className="font-body text-gray-400 text-sm mt-2">
            {books.length === 0 ? 'Add your first book to get started!' : 'Try adjusting your search or filters.'}
          </p>
          {books.length === 0 && (
            <button
              onClick={() => setModal('add')}
              className="mt-5 px-6 py-2.5 bg-forest-800 text-cream rounded-xl font-body font-semibold text-sm hover:bg-forest-700 transition-colors shadow-md"
            >
              ➕ Add First Book
            </button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((book, i) => (
            <div key={book.id} style={{ animationDelay: `${i * 60}ms` }}>
              <BookCard
                book={book} 
                onView={() => { setSelected(book); setModal('view') }}
                onEdit={() => { setSelected(book); setModal('edit') }}
                onDelete={() => { setSelected(book); setModal('delete') }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {modal === 'add' && (
        <BookModal title="Add New Book" onClose={closeModal}>
          <BookForm onSubmit={handleAdd} onCancel={closeModal} loading={actionLoading} />
        </BookModal>
      )}

      {modal === 'edit' && (
        <BookModal title="Edit Book" onClose={closeModal}>
          <BookForm initialData={selected} onSubmit={handleUpdate} onCancel={closeModal} loading={actionLoading} />
        </BookModal>
      )}

      {modal === 'delete' && (
        <BookModal title="Confirm Delete" onClose={closeModal}>
          <DeleteConfirm book={selected} onConfirm={handleDelete} onCancel={closeModal} loading={actionLoading} />
        </BookModal>
      )}

      {modal === 'view' && selected && (
        <BookModal title="Book Details" onClose={closeModal}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">📖</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-ink text-xl">{selected.title}</h3>
                <p className="text-forest-700 font-body text-sm font-medium">by {selected.author}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 font-body mb-0.5">Genre</p>
                <p className="font-semibold text-ink font-body text-sm">{selected.genre || '—'}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 font-body mb-0.5">Year</p>
                <p className="font-semibold text-ink font-body text-sm">{selected.year || '—'}</p>
              </div>
            </div>
            {selected.description && (
              <div className="bg-cream border border-amber-100 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-body mb-1">Description</p>
                <p className="text-sm text-ink font-body leading-relaxed">{selected.description}</p>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setModal('edit')}
                className="flex-1 py-2.5 bg-amber-100 hover:bg-amber-200 text-forest-800 rounded-xl font-body font-semibold text-sm transition-colors"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => setModal('delete')}
                className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-body font-semibold text-sm transition-colors"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </BookModal>
      )}
    </main>
  )
}