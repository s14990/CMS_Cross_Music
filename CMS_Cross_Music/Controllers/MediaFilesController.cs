using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS_Cross_Music.Models;
using Microsoft.AspNet.OData;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.IO;

namespace CMS_Cross_Music.Controllers
{
    [EnableQuery]

    [Route("api/[controller]")]
    [ApiController]
    public class MediafilesController : ControllerBase
    {
        private readonly CrossMusicContext _context;

        public MediafilesController(CrossMusicContext context)
        {
            _context = context;
        }

        // GET: api/Files
        [HttpGet]
        public IEnumerable<Mediafile> GetMediafile()
        {
            return _context.Mediafile;
        }

        // GET: api/Files/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMediafile([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mediafile = await _context.Mediafile.FindAsync(id);

            if (mediafile == null)
            {
                return NotFound();
            }

            return Ok(mediafile);
        }

        // PUT: api/Files/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMediafile([FromRoute] int id, [FromBody] Mediafile mediafile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mediafile.IdFile)
            {
                return BadRequest();
            }

            _context.Entry(mediafile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediafileExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Files
        [HttpPost]
        public async Task<ActionResult<Mediafile>> PostMediafile([FromForm] UploadFile model)
        {
            IFormFile file = model.File;

            Account account = new Account(
            "dn2pht7no",
            "763416155661231",
            "Y8_D6HDCOUNJAUoPvi8wtVWhkmE");

            Cloudinary cloudinary = new Cloudinary(account);

            var fs = file.OpenReadStream();
            var uploadParams = new VideoUploadParams()
            {
                File = new FileDescription(file.FileName, fs)
            };
            var uploadResult = cloudinary.Upload(uploadParams);
            string full_filename = Path.GetFileName(file.FileName);
            string[] file_parts = full_filename.Split(".");
            string file_name = file_parts[0];
            string file_extension = file_parts[1];
            Mediafile mediaFile = new Mediafile();
            mediaFile.MediaName = file_name;
            mediaFile.MediaDate = DateTime.Now;
            mediaFile.FlName = full_filename;
            mediaFile.FlType = file_extension;
            if (file_extension == "mp4")
                mediaFile.MediaType = "video";
            else if (file_extension == "mp3")
                mediaFile.MediaType = "video";
            else
                mediaFile.MediaType = "other";
            if (model.Desctiption != null)
            {
                mediaFile.MediaDescription = model.Desctiption;
            }
            else
                mediaFile.MediaDescription = "...";
            mediaFile.FlLink = uploadResult.Uri.ToString();
            var u = await _context.Usr.SingleOrDefaultAsync(j => j.UserName == "admin");
            mediaFile.UserIdUser = u.IdUser;
            _context.Mediafile.Add(mediaFile);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetMediaFile", new { id = mediaFile.IdFile }, mediaFile);
        }

        // DELETE: api/Files/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMediafile([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mediafile = await _context.Mediafile.FindAsync(id);
            if (mediafile == null)
            {
                return NotFound();
            }

            _context.Mediafile.Remove(mediafile);
            await _context.SaveChangesAsync();

            return Ok(mediafile);
        }

        private bool MediafileExists(int id)
        {
            return _context.Mediafile.Any(e => e.IdFile == id);
        }
    }
}