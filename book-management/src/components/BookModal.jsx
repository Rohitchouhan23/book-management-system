import { useEffect } from 'react'

export default function BookModal({ title, children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-cream rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in border border-amber-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 sticky top-0 bg-cream z-10">
          <h2 className="font-heading font-bold text-ink text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-100 text-gray-500 hover:text-ink transition-colors text-lg"
          >
            ×
          </button>
        </div>
        {/* Content */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}