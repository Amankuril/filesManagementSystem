export default function Header() {
  return (
    <div className="text-center mb-12 w-full">
      <h1
        className="
          text-5xl 
          font-extrabold 
          tracking-tight 
          text-[#EFD09E] 
          drop-shadow-[0_0_10px_rgba(212,170,125,0.4)] 
          mb-3
          transition-all
          duration-300
          hover:drop-shadow-[0_0_15px_rgba(212,170,125,0.7)]
        "
      >
         File Management System
      </h1>

      <p className="text-[#D4AA7D]/80 text-lg font-medium">
        Organize, upload & manage your files with elegance and ease
      </p>

      <div className="mt-4 flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AA7D] via-[#EFD09E] to-[#D4AA7D] rounded-full shadow-lg animate-pulse"></div>
      </div>
    </div>
  );
}
