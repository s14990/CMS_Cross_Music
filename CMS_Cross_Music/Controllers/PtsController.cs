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
    public class PtsController : ControllerBase
    {
        private readonly CrossMusicContext _context;

        public PtsController(CrossMusicContext context)
        {
            _context = context;
        }

        // GET: api/Pts
        [HttpGet]
        public IEnumerable<Pt> GetPt()
        {
            return _context.Pt;
        }

        // GET: api/Pts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pt = await _context.Pt.FindAsync(id);

            if (pt == null)
            {
                return NotFound();
            }

            return Ok(pt);
        }

        // PUT: api/Pts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPt([FromRoute] int id, [FromBody] Pt pt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pt.IdPt)
            {
                return BadRequest();
            }

            _context.Entry(pt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PtExists(id))
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

        // POST: api/Pts
        [HttpPost]
        public async Task<IActionResult> PostPt([FromBody] Pt pt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Pt.Add(pt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPt", new { id = pt.IdPt }, pt);
        }

        // DELETE: api/Pts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pt = await _context.Pt.FindAsync(id);
            if (pt == null)
            {
                return NotFound();
            }

            _context.Pt.Remove(pt);
            await _context.SaveChangesAsync();

            return Ok(pt);
        }

        private bool PtExists(int id)
        {
            return _context.Pt.Any(e => e.IdPt == id);
        }
    }
}