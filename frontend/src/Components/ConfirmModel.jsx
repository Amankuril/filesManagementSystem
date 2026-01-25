


export default function ConfirmModel({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-[#1E1E1E]/95 border border-[#3A3A3A] rounded-2xl shadow-2xl px-8 py-6 text-center w-[90%] max-w-sm transition-all duration-300">
                {/* Title */}
                <h3 className="text-xl font-semibold text-[#EFD09E] mb-3 tracking-wide">
                    Confirm Deletion
                </h3>

                {/* Description */}
                <p className="text-[#D4AA7D]/80 mb-6 text-sm">
                    Are you sure you want to delete this file? <br />
                    This action <span className="text-red-400 font-medium">cannot be undone.</span>
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="
              bg-gradient-to-r from-red-600 to-red-500
              text-white font-semibold 
              px-5 py-2.5 rounded-lg
              shadow-md hover:shadow-red-500/40
              hover:scale-[1.05] transition-all duration-200
            "
                    >
                        Yes, Delete
                    </button>

                    <button
                        onClick={onCancel}
                        className="
              bg-gradient-to-r from-[#D4AA7D] to-[#EFD09E]
              text-[#272727] font-semibold 
              px-5 py-2.5 rounded-lg
              hover:opacity-90 hover:scale-[1.05]
              transition-all duration-200
              shadow-md
            "
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
