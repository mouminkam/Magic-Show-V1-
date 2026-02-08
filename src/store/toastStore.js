import { create } from "zustand";

const useToastStore = create((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      type: "info", // info, success, error, warning
      message: "",
      duration: 3000,
      ...toast,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, newToast.duration);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  success: (message, duration = 3000) => {
    return useToastStore.getState().addToast({
      type: "success",
      message,
      duration,
    });
  },

  error: (message, duration = 4000) => {
    return useToastStore.getState().addToast({
      type: "error",
      message,
      duration,
    });
  },

  warning: (message, duration = 3000) => {
    return useToastStore.getState().addToast({
      type: "warning",
      message,
      duration,
    });
  },

  info: (message, duration = 3000) => {
    return useToastStore.getState().addToast({
      type: "info",
      message,
      duration,
    });
  },

  clear: () => {
    set({ toasts: [] });
  },
}));

export default useToastStore;


