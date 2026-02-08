export default function ShoppingCartLoading() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 border-b border-gray-200 pb-8">
              <div className="w-32 h-32 bg-gray-200 rounded flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
          ))}
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
