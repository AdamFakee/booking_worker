import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastType } from '@/components/ui/Toast';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean } | null>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast((prev) => prev ? { ...prev, visible: false } : null);
    // Tiny delay to allow animation to play out (handled by AnimatePresence or just removing component) 
    // but here we simply unmount it which triggers Exiting animation if configured correctly.
    // For simplicity with basic conditional rendering, we verify visibility.
    setTimeout(() => setToast(null), 300); // Wait for exit animation
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && toast.visible && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onHide={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
