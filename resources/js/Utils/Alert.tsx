import { AlertCircle } from 'lucide-react';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function Alert({
  isOpen,
  onClose,
  message = 'Fitur masih berada dalam masa pengembangan',
}: AlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#FFF6EC] rounded-2xl shadow-xl border border-[#7C634D]/20 p-8 w-full max-w-md transform transition-all duration-300 ease-out scale-100 opacity-100 flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className="mb-4 text-[#7C634D] bg-[#7C634D]/10 p-3 rounded-full">
          <AlertCircle size={32} strokeWidth={2} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#7C634D] font-inter mb-2">Coming Soon</h3>

        {/* Message */}
        <p className="text-[#9C8570] font-inter mb-6">{message}</p>

        {/* Button */}
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#7C634D] text-white font-medium rounded-lg hover:bg-[#6A5441] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7C634D] focus:ring-offset-2 focus:ring-offset-[#FFF6EC]"
          aria-label="Close notification"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}
