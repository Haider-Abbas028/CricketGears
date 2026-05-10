// frontend/src/components/admin/ConfirmModal.jsx

// ConfirmModal component - handles confirmation dialogs in admin panel
// Displays a modal with title, message, and confirm/cancel buttons
const ConfirmModal = ({
  isOpen, // Boolean to control modal visibility
  title, // Modal title text
  message, // Modal message text
  onConfirm, // Function to call on confirm action
  onCancel, // Function to call on cancel action
  loading, // Boolean to show loading state during confirm
}) => {
  // If modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    // Overlay with semi-transparent black background
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      {/* Modal container with dark theme styling */}
      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md">
        {/* Modal title */}
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        {/* Modal message */}
        <p className="text-gray-400 mb-6">{message}</p>
        {/* Action buttons container */}
        <div className="flex gap-3">
          {/* Confirm button - red for destructive actions */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
          {/* Cancel button */}
          <button
            onClick={onCancel}
            className="flex-1 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
