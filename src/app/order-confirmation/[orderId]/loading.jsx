export default function OrderConfirmationLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse w-full max-w-2xl mx-auto px-4">
        <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
        <div className="h-48 bg-gray-200 rounded mb-6"></div>
        <div className="h-32 bg-gray-200 rounded mb-6"></div>
      </div>
    </div>
  );
}
