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
    public class FriendlistsController : ControllerBase
    {
        private readonly CrossMusicContext _context;

        public FriendlistsController(CrossMusicContext context)
        {
            _context = context;
        }

        // GET: api/Friendlists
        [HttpGet]
        public IEnumerable<Friendlist> GetFriendlist()
        {
            return _context.Friendlist;
        }

        // GET: api/Friendlists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFriendlist([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var friendlist = await _context.Friendlist.FindAsync(id);

            if (friendlist == null)
            {
                return NotFound();
            }

            return Ok(friendlist);
        }

        // PUT: api/Friendlists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFriendlist([FromRoute] int id, [FromBody] Friendlist friendlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != friendlist.IdFl)
            {
                return BadRequest();
            }

            _context.Entry(friendlist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendlistExists(id))
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

        // POST: api/Friendlists
        [HttpPost]
        public async Task<IActionResult> PostFriendlist([FromBody] Friendlist friendlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Friendlist.Add(friendlist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFriendlist", new { id = friendlist.IdFl }, friendlist);
        }

        // DELETE: api/Friendlists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFriendlist([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var friendlist = await _context.Friendlist.FindAsync(id);
            if (friendlist == null)
            {
                return NotFound();
            }

            _context.Friendlist.Remove(friendlist);
            await _context.SaveChangesAsync();

            return Ok(friendlist);
        }

        private bool FriendlistExists(int id)
        {
            return _context.Friendlist.Any(e => e.IdFl == id);
        }
    }
}