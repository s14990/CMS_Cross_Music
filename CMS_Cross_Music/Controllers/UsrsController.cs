using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS_Cross_Music.Models;

namespace CMS_Cross_Music.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsrsController : ControllerBase
    {
        private readonly CrossMusicContext _context;

        public UsrsController(CrossMusicContext context)
        {
            _context = context;
        }

        // GET: api/Usrs
        [HttpGet]
        public IEnumerable<Usr> GetUsr()
        {
            return _context.Usr;
        }

        // GET: api/Usrs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsr([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usr = await _context.Usr.FindAsync(id);

            if (usr == null)
            {
                return NotFound();
            }

            return Ok(usr);
        }

        // PUT: api/Usrs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsr([FromRoute] int id, [FromBody] Usr usr)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usr.IdUser)
            {
                return BadRequest();
            }

            _context.Entry(usr).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsrExists(id))
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

        // POST: api/Usrs
        [HttpPost]
        public async Task<IActionResult> PostUsr([FromBody] Usr usr)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Usr.Add(usr);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsr", new { id = usr.IdUser }, usr);
        }

        // DELETE: api/Usrs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsr([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usr = await _context.Usr.FindAsync(id);
            if (usr == null)
            {
                return NotFound();
            }

            _context.Usr.Remove(usr);
            await _context.SaveChangesAsync();

            return Ok(usr);
        }

        private bool UsrExists(int id)
        {
            return _context.Usr.Any(e => e.IdUser == id);
        }
    }
}