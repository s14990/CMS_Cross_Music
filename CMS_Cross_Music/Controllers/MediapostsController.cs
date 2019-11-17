using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS_Cross_Music.Models;
using Microsoft.AspNet.OData;

namespace CMS_Cross_Music.Controllers
{
    [EnableQuery]

    [Route("api/[controller]")]
    [ApiController]
    public class MediapostsController : ControllerBase
    {
        private readonly CrossMusicContext _context;

        public MediapostsController(CrossMusicContext context)
        {
            _context = context;
        }

        // GET: api/Mediaposts
        [HttpGet]
        public IEnumerable<Mediapost> GetMediapost()
        {
            return _context.Mediapost;
        }

        // GET: api/Mediaposts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMediapost([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mediapost = await _context.Mediapost.FindAsync(id);

            if (mediapost == null)
            {
                return NotFound();
            }

            return Ok(mediapost);
        }

        // PUT: api/Mediaposts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMediapost([FromRoute] int id, [FromBody] Mediapost mediapost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mediapost.IdPost)
            {
                return BadRequest();
            }

            _context.Entry(mediapost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediapostExists(id))
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

        // POST: api/Mediaposts
        [HttpPost]
        public async Task<IActionResult> PostMediapost([FromBody] Mediapost mediapost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Mediapost.Add(mediapost);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMediapost", new { id = mediapost.IdPost }, mediapost);
        }

        // DELETE: api/Mediaposts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMediapost([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mediapost = await _context.Mediapost.FindAsync(id);
            if (mediapost == null)
            {
                return NotFound();
            }

            _context.Mediapost.Remove(mediapost);
            await _context.SaveChangesAsync();

            return Ok(mediapost);
        }

        private bool MediapostExists(int id)
        {
            return _context.Mediapost.Any(e => e.IdPost == id);
        }
    }
}