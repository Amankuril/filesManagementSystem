import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center mb-8 w-full">
      <input
        type="text"
        placeholder="🔍 Search files by title, type, or date..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full md:w-2/3 
          px-5 py-3 
          rounded-2xl 
          bg-[#272727]
          text-[#EFD09E]  
          placeholder-[#B3B3B3] 
          border border-[#3A3A3A]
          shadow-md 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#D4AA7D]
          focus:border-[#EFD09E]
          transition-all duration-300
          hover:border-[#D4AA7D]
        "
      />
    </div>
  );
}
