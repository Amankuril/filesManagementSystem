using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.StaticFiles;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string _uploadPath;

        public FileController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), config["FileSettings:UploadPath"]);
            if (!Directory.Exists(_uploadPath))
                Directory.CreateDirectory(_uploadPath);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FileItem>>> GetFiles()
            => await _context.Files.ToListAsync();

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string title)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var path = Path.Combine(_uploadPath, fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileItem = new FileItem
            {
                Title = title,
                FilePath = $"uploads/{fileName}",
                FileType = file.ContentType,
                FileSize = file.Length
            };

            _context.Files.Add(fileItem);
            await _context.SaveChangesAsync();

            return Ok(fileItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(int id, [FromForm] string title)
        {
            var fileItem = await _context.Files.FindAsync(id);
            if (fileItem == null) return NotFound();

            fileItem.Title = title;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            var fileItem = await _context.Files.FindAsync(id);
            if (fileItem == null) return NotFound();

            var path = Path.Combine(Directory.GetCurrentDirectory(), fileItem.FilePath);
            if (System.IO.File.Exists(path)) System.IO.File.Delete(path);

            _context.Files.Remove(fileItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("view/{*filePath}")]
public IActionResult ViewFile(string filePath)
{
    // Always point to wwwroot
    var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filePath);

    if (!System.IO.File.Exists(fullPath))
        return NotFound("File not found");

    var provider = new FileExtensionContentTypeProvider();
    if (!provider.TryGetContentType(fullPath, out var contentType))
        contentType = "application/octet-stream";

    Response.Headers["Content-Disposition"] = "inline";

    return PhysicalFile(fullPath, contentType);
}



    }
}
