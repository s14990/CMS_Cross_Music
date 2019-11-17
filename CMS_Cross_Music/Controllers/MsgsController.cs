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
    public class MsgsController : ControllerBase
    {
        private readonly CrossMusicContext _context;

        public MsgsController(CrossMusicContext context)
        {
            _context = context;
        }

        // GET: api/Msgs
        [HttpGet]
        public IEnumerable<Msg> GetMsg()
        {
            return _context.Msg;
        }

        // GET: api/Msgs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMsg([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var msg = await _context.Msg.FindAsync(id);

            if (msg == null)
            {
                return NotFound();
            }

            return Ok(msg);
        }

        // PUT: api/Msgs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMsg([FromRoute] int id, [FromBody] Msg msg)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != msg.IdMsg)
            {
                return BadRequest();
            }

            _context.Entry(msg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MsgExists(id))
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

        // POST: api/Msgs
        [HttpPost]
        public async Task<IActionResult> PostMsg([FromBody] Msg msg)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Msg.Add(msg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMsg", new { id = msg.IdMsg }, msg);
        }

        // DELETE: api/Msgs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMsg([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var msg = await _context.Msg.FindAsync(id);
            if (msg == null)
            {
                return NotFound();
            }

            _context.Msg.Remove(msg);
            await _context.SaveChangesAsync();

            return Ok(msg);
        }

        private bool MsgExists(int id)
        {
            return _context.Msg.Any(e => e.IdMsg == id);
        }
    }
}