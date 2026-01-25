import { Eye, Pencil, Trash2 } from "lucide-react";

export default function FileCard({ file, onUpdate, onDelete }) {
  return (
    <div
      className="
        bg-[#272727]
        border border-[#3A3A3A] 
        rounded-2xl 
        p-5 
        shadow-md   
        hover:shadow-[0_0_15px_rgba(212,170,125,0.3)] 
        transition-all 
        duration-300 
        hover:scale-[1.02]
      "
    >
      {/* File Title */}
      <h3 className="text-[#EFD09E] font-semibold text-lg mb-1 truncate tracking-wide">
        {file.title}
      </h3>

      {/* File Info */}
      <p className="text-[#D4AA7D]/70 text-sm mb-4">
        Type: <span className="text-[#EFD09E]/90">{file.fileType}</span>
      </p>

      {/* Action Buttons */}
      <div className="flex justify-between items-center text-sm font-medium">
        {/* View */}
        <a
          href={`http://localhost:5281/api/file/view/${file.filePath}`}

          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-[#EFD09E]/90 hover:text-[#EFD09E] transition-all hover:scale-105"
        >
          <Eye size={16} /> View
        </a>


        {/* Edit */}
        <button
          onClick={onUpdate}
          className="
            flex items-center gap-1 text-[#D4AA7D]/90 hover:text-[#EFD09E] 
            transition-all hover:scale-105
          "
        >
          <Pencil size={16} /> Edit
        </button>

        {/* Delete */}
        <button
          onClick={onDelete}
          className="
            flex items-center gap-1 text-red-400 hover:text-red-500 
            transition-all hover:scale-105
          "
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
