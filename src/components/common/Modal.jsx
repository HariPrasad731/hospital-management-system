export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        <div className="border-t px-4 py-2 text-right">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
