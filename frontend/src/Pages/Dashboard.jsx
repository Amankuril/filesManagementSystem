import React, { useState, useEffect } from "react";
import {
  getAllFiles,
  uploadFile,
  deleteFile,
  updateFileTitle,
} from "../api/fileService"; 
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";
import UploadForm from "../Components/UploadForm";
import FileCard from "../Components/FileCard";
import SettingsModal from "../Components/SettingsModel";
import ConfirmModal from "../Components/ConfirmModel";
import UpdateModal from "../Components/UpdateModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSuccess, showError } from "../utils/ToastHelper";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [queue, setQueue] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch files
  const fetchFiles = async () => {
    try {
      const res = await getAllFiles();
      setFiles(res.data);
    } catch {
      showError(" Failed to fetch files from server");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Add to queue
  const handleAddToQueue = (file, title) => {
    setQueue([...queue, { file, title }]);
    showSuccess(" File added to queue!");
  };

  //  Save queued files
  const handleSaveQueue = async () => {
    if (queue.length === 0) return toast.info("No files to upload!");

    try {
      for (const item of queue) await uploadFile(item.file, item.title);
      setQueue([]);
      fetchFiles();
      showSuccess("Files uploaded successfully!");
    } catch {
      showError("Upload failed!");
    }
  };

  //  Delete file
  const handleDelete = async () => {
    try {
      await deleteFile(deleteId);
      showSuccess(" File deleted successfully!");
      setConfirmDelete(false);
      fetchFiles();
    } catch {
      showError(" Failed to delete file");
    }
  };

  // ✅ Update file title
  const handleUpdate = async (id, newTitle) => {
    try {
      await updateFileTitle(id, newTitle);
      showSuccess(" File title updated!");
      fetchFiles();
      setShowUpdate(false);
    } catch {
      showError(" Update failed");
    }
  };

  const filteredFiles = files.filter((f) =>
    f.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = (index) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  };



  const [settings, setSettings] = useState({
    allowedExtensions: [".jpg", ".png", ".pdf"],
    maxSize: 5,
    unit: "MB"
  });

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-[#EFD09E] px-6 py-10 flex flex-col items-center">
      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <UploadForm
        queue={queue}
        onAdd={handleAddToQueue}
        onSave={handleSaveQueue}
        onRemove={handleRemove}
        settings={settings}
        onSettings={setSettings}
      />


      {/* File Grid */}
      <div className="w-full max-w-6xl mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onUpdate={() => {
                setSelectedFile(file);
                setShowUpdate(true);
              }}
              onDelete={() => {
                setDeleteId(file.id);
                setConfirmDelete(true);
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-[#D4AA7D]/80 py-20 text-lg">
            🕵️ No files found. Try uploading or adjusting your search.
          </div>
        )}
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {confirmDelete && (
        <ConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
      {showUpdate && selectedFile && (
        <UpdateModal
          file={selectedFile}
          onUpdate={handleUpdate}
          onCancel={() => setShowUpdate(false)}
        />
      )}

      {/* ToastContainer (global) */}
      <ToastContainer
        autoClose={1800}
        closeOnClick
        pauseOnHover
        draggable
        hideProgressBar={false}
      />
    </div>
  );
}
