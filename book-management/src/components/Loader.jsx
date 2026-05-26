export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-amber-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-forest-700 font-body font-medium animate-pulse">Loading books...</p>
    </div>
  )
}