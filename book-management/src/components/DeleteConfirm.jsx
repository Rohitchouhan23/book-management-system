export default function DeleteConfirm({ book, onConfirm, onCancel, loading }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
        <span className="text-3xl">🗑️</span>
      </div>
      <div>
        <h3 className="font-heading font-bold text-ink text-lg">Delete Book?</h3>
        <p className="text-gray-500 font-body text-sm mt-2 leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-ink">"{book?.title}"</span>?
          This action cannot be undone.
        </p>
      </div>
      <div className="flex gap-3 w-full">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-amber-200 text-forest-800 font-body font-semibold text-sm hover:bg-amber-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-body font-semibold text-sm transition-colors disabled:opacity-60"
        >
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </button>
      </div>
    </div>
  )
}