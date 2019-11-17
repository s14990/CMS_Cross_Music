using CMS_Cross_Music.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CMS_Cross_Music.Controllers
{
    [EnableQuery]

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
        public async Task<IActionResult> PostUsr([FromBody] UserLogin userLogin)
        {
            if (_context.Usr.Any(u => u.UserName == userLogin.UserName))
            {
                return BadRequest(new { errors = "This User Exists" });
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Usr usr = new Usr
            {
                UserName = userLogin.UserName,
                UserEmail = userLogin.UserEmail,
                UserRank = 2,
                UserConfirmed = false
            };
            _context.Usr.Add(usr);
            await _context.SaveChangesAsync();

            using (MD5 md5Hash = MD5.Create())
            {
                string hash = GetMd5Hash(md5Hash, userLogin.UserPassword);
                Pass pass = new Pass
                {
                    UserIdUser = usr.IdUser,
                    Hash = hash
                };
                _context.Pass.Add(pass);
            }
            Friendlist fl = new Friendlist
            {
                UserIdUser = usr.IdUser
            };
            _context.Friendlist.Add(fl);
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

        private string GetMd5Hash(MD5 md5Hash, string input)
        {

            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            return sBuilder.ToString();
        }

    }
}