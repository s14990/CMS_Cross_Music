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
    public class UflsController : ControllerBase
    {
        private readonly CrossMusicContext _context;

        public UflsController(CrossMusicContext context)
        {
            _context = context;
        }

        // GET: api/Ufls
        [HttpGet]
        public IEnumerable<Ufl> GetUfl()
        {
            return _context.Ufl;
        }

        // GET: api/Ufls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUfl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ufl = await _context.Ufl.FindAsync(id);

            if (ufl == null)
            {
                return NotFound();
            }

            return Ok(ufl);
        }

        // PUT: api/Ufls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUfl([FromRoute] int id, [FromBody] Ufl ufl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ufl.IdUfl)
            {
                return BadRequest();
            }

            _context.Entry(ufl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UflExists(id))
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

        // POST: api/Ufls
        [HttpPost]
        public async Task<IActionResult> PostUfl([FromBody] Ufl ufl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Ufl.Add(ufl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUfl", new { id = ufl.IdUfl }, ufl);
        }

        // DELETE: api/Ufls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUfl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ufl = await _context.Ufl.FindAsync(id);
            if (ufl == null)
            {
                return NotFound();
            }

            _context.Ufl.Remove(ufl);
            await _context.SaveChangesAsync();

            return Ok(ufl);
        }

        private bool UflExists(int id)
        {
            return _context.Ufl.Any(e => e.IdUfl == id);
        }
    }
}