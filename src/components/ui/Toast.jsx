"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import useToastStore from "../../store/toastStore";

export default function Toast() {
  const { toasts, removeToast } = useToastStore();
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client side to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${bgColors[toast.type]} border rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-right`}
        >
          <div className="flex-shrink-0">{icons[toast.type]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}


