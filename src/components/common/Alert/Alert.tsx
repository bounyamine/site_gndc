import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ type, onClose, children }) => {
  const typeClasses = {
    success: 'bg-green-100 text-green-800 border-green-400',
    error: 'bg-red-100 text-red-800 border-red-400',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    info: 'bg-blue-100 text-blue-800 border-blue-400',
  };

  return (
    <div
      className={`flex items-center p-4 border rounded-md ${typeClasses[type]} relative`}
      role="alert"
    >
      <span className="flex-grow">{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-sm font-bold text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
};
