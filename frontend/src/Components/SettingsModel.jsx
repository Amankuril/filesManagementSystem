import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const SettingsModel = ({ onClose, settings, onSave }) => {
  const availableExtensions = [
    ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".txt",
    ".doc", ".docx", ".xlsx", ".csv", ".zip", ".rar", ".mp3", ".mp4"
  ];

  // Local state that reflects the incoming settings
  const [allowedExtensions, setAllowedExtensions] = useState([]);
  const [maxSize, setMaxSize] = useState(5);
  const [unit, setUnit] = useState("MB");

  // Sync modal state with parent settings when opened
  useEffect(() => {
    setAllowedExtensions(settings.allowedExtensions);
    setMaxSize(settings.maxSize);
    setUnit(settings.unit);
  }, [settings]);

  const handleAddExtension = (ext) => {
    if (!allowedExtensions.includes(ext)) {
      setAllowedExtensions([...allowedExtensions, ext]);
    }
  };

  const handleRemoveExtension = (ext) => {
    setAllowedExtensions(allowedExtensions.filter((e) => e !== ext));
  };

  const handleSave = () => {
    onSave({
      allowedExtensions,
      maxSize,
      unit,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-[#1E1E1E]/95 border border-[#3A3A3A] rounded-2xl shadow-2xl px-8 py-6 w-[90%] max-w-lg transition-all duration-300">

        {/* Header */}
        <div className="flex items-center justify-between  pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-[#EFD09E]">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-[#2f2f2f] transition">
            <X size={20} className="text-[#EFD09E]" />
          </button>
        </div>

        {/* Allowed Extensions */}
        <div className="mb-8">
          <label className="block text-[#D4AA7D] font-medium mb-2">
            Allowed File Extensions
          </label>

          <div className="bg-[#272727] border border-[#3A3A3A] rounded-lg p-3 flex flex-wrap gap-2 min-h-[48px]">
            {allowedExtensions.map((ext, index) => (
              <span key={index} className="flex items-center gap-2 bg-[#1b1b1b] text-[#EFD09E] px-3 py-1 rounded-full text-sm border border-[#3A3A3A]">
                {ext}
                <button
                  onClick={() => handleRemoveExtension(ext)}
                  className="text-[#D97777] hover:text-red-400 transition"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add extension */}
          <div className="mt-4">
            <select
              onChange={(e) => handleAddExtension(e.target.value)}
              className="appearance-none w-full bg-[#1b1b1b] border border-[#3A3A3A] text-[#EFD09E] rounded-lg px-4 py-2 cursor-pointer"
              value=""
            >
              <option value="" disabled>
                Select file type to allow...
              </option>
              {availableExtensions.map((ext) => (
                <option key={ext} value={ext} disabled={allowedExtensions.includes(ext)}>
                  {ext.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File Size */}
        <div className="mb-8">
          <label className="block text-[#D4AA7D] font-medium mb-2">Maximum File Size</label>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={maxSize}
              onChange={(e) => setMaxSize(e.target.value)}
              className=" appearance-none w-28 bg-[#1b1b1b] border border-[#3A3A3A] text-[#EFD09E] rounded-lg px-3 py-2 text-center"
            />

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className=" appearance-none bg-[#1b1b1b] border border-[#3A3A3A] text-[#EFD09E] rounded-lg px-3 py-2 cursor-pointer"
            >
              <option>MB</option>
              <option>KB</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3  pt-5">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-[#1b1b1b] text-[#EFD09E]">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AA7D] to-[#EFD09E] text-[#272727] font-bold"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModel;
