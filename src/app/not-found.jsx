import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          الصفحة غير موجودة
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
