import React, { useState } from "react";

export default function UpdateModal({ onUpdate, onCancel, file }) {
  const [title, setTitle] = useState(file?.title || "");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onUpdate(file.id, title);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-[#1E1E1E]/95 border border-[#3A3A3A] rounded-2xl shadow-2xl px-8 py-6 text-center w-[90%] max-w-md transition-all duration-300">
        
        {/* Header */}
        <h3 className="text-2xl font-semibold text-[#EFD09E] mb-3 tracking-wide">
          Update File
        </h3>
        <p className="text-[#D4AA7D]/80 text-sm mb-6">
          Modify the file title below and save your changes.
        </p>

        {/* Input */}
        <div className="flex flex-col gap-3 mb-6">
          <label className="text-left text-[#D4AA7D]/90 text-sm font-medium">
            File Title
          </label>
          <input
            type="text"
            placeholder="Enter new file title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              bg-[#1b1b1b] 
              border border-[#3A3A3A] 
              text-[#EFD09E] 
              placeholder:text-gray-500 
              rounded-lg px-4 py-2 
              focus:ring-2 focus:ring-[#D4AA7D]/60 
              focus:outline-none 
              transition-all
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            className="
              bg-gradient-to-r from-[#D4AA7D] to-[#EFD09E]
              text-[#272727] font-semibold 
              px-5 py-2.5 rounded-lg
              hover:opacity-90 hover:scale-[1.05]
              transition-all duration-200
              shadow-md
            "
          >
            Save Changes
          </button>

          <button
            onClick={onCancel}
            className="
              bg-[#1b1b1b]
              text-[#EFD09E] font-medium
              px-5 py-2.5 rounded-lg
              border border-[#3A3A3A]
              hover:bg-[#2A2A2A] hover:scale-[1.05]
              transition-all duration-200
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
