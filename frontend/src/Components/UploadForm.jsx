import React, { useState } from "react";
import { Upload, Settings, Plus, X, Save } from "lucide-react";
import SettingsModel from "./SettingsModel";
import { showError, showSuccess } from "../utils/ToastHelper";


export default function UploadForm({ queue, onAdd, onSave, onRemove, onSettings, settings }) {
    const [fileTitle, setFileTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleAddToQueue = () => {
        if (!fileTitle || !selectedFile) return;

        // Get file extension
        const ext = "." + selectedFile.name.split(".").pop().toLowerCase();

        // Validate extension
        if (!settings.allowedExtensions.includes(ext)) {
            showError(`File type ${ext} is not allowed.`);
            return;
        }

        // Validate file size
        let sizeLimit = settings.maxSize;
        if (settings.unit === "MB") {
            sizeLimit = sizeLimit * 1024 * 1024; // MB to bytes
        } else {
            sizeLimit = sizeLimit * 1024;        // KB to bytes
        }

        if (selectedFile.size > sizeLimit) {
            showError(`File exceeds the size limit of ${settings.maxSize}${settings.unit}`);
            return;
        }

        // Add to queue if all validations passed
        onAdd(selectedFile, fileTitle);
        setFileTitle("");
        setSelectedFile(null);
    };


    const [openSettings, setOpenSettings] = useState(false);

    return (
        <div className="bg-[#272727] text-[#EFD09E] rounded-2xl p-8 w-full max-w-6xl mx-auto shadow-lg border border-[#3A3A3A] backdrop-blur-sm transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <Upload className="text-[#D4AA7D]" size={22} />
                <h2 className="text-xl font-semibold tracking-wide">Upload Files</h2>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* File Title Input */}
                <div>
                    <label className="block text-sm text-[#D4AA7D] mb-2">File Title</label>
                    <input
                        type="text"
                        value={fileTitle}
                        onChange={(e) => setFileTitle(e.target.value)}
                        placeholder="Enter file title..."
                        className="w-full bg-[#1f1f1f] border border-[#3a3a3a] text-[#EFD09E] placeholder:text-gray-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AA7D]/60 focus:outline-none transition-all hover:border-[#D4AA7D]"
                    />
                </div>

                {/* File Input */}
                <div>
                    <label className="block text-sm text-[#D4AA7D] mb-2">Select File</label>
                    <label className="flex items-center justify-between bg-[#1f1f1f] border border-dashed border-[#3a3a3a] rounded-lg px-4 py-2 cursor-pointer hover:border-[#D4AA7D] transition">
                        <span className="truncate">
                            {selectedFile ? selectedFile.name : "+ Choose a file..."}
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </label>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
                <button
                    onClick={handleAddToQueue}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#D4AA7D] to-[#EFD09E] text-[#272727] px-4 py-2 rounded-lg font-medium hover:opacity-90 hover:scale-[1.03] transition-all duration-200 shadow-md"
                >
                    <Plus size={18} /> Add to Queue
                </button>

                <button
                    onClick={onSave}
                    disabled={queue.length === 0}
                    className={`flex items-center gap-2 bg-[#EFD09E] text-[#272727] px-4 py-2 rounded-lg font-medium transition relative ${queue.length > 0
                        ? "hover:opacity-90 hover:scale-[1.03]"
                        : "opacity-60 cursor-not-allowed"
                        }`}
                >
                    <Save size={18} />
                    Save All
                    {queue.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                            {queue.length}
                        </span>
                    )}
                </button>

                <button
                    onClick={() => setOpenSettings(true)}
                    className="flex items-center gap-2 bg-[#1f1f1f] border border-[#3a3a3a] text-[#EFD09E] px-4 py-2 rounded-lg font-medium hover:border-[#D4AA7D] hover:scale-[1.02] transition-all"
                >
                    <Settings size={18} /> Settings
                </button>
            </div>

            {/* Divider */}
            {queue.length > 0 && <div className="border-t border-[#3a3a3a] my-6" />}

            {/* Queued Files List */}
            {queue.length > 0 && (
                <div>
                    <h3 className="text-[#D4AA7D] text-sm font-semibold mb-3 flex items-center gap-2">
                        📋 Queued Files ({queue.length})
                    </h3>

                    <div className="space-y-3">
                        {queue.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#1f1f1f] border border-[#3a3a3a] rounded-lg p-3 flex justify-between items-center hover:border-[#D4AA7D]/70 transition-all"
                            >
                                <div>
                                    <p className="text-[#EFD09E] font-medium">{item.title}</p>
                                    <p className="text-gray-500 text-sm">{item.file.name}</p>
                                </div>
                                <button
                                    onClick={() => onRemove(index)}
                                    className="p-2 bg-[#2d2d2d] hover:bg-[#3a3a3a] rounded-md transition"
                                >
                                    <X size={16} className="text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {openSettings && (
                <SettingsModel
                    onClose={() => setOpenSettings(false)}
                    settings={settings}
                    onSave={(updatedSettings) => {
                        onSettings(updatedSettings); // parent updates state
                        setOpenSettings(false);
                    }}
                />
            )}

        </div>
    );
}
