﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS_Cross_Music.Models;
using System.Security.Cryptography;
using System.Text;

namespace CMS_Cross_Music.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SesnsController : ControllerBase
    {
        private readonly CrossMusicContext _context;

        public SesnsController(CrossMusicContext context)
        {
            _context = context;
        }

        // GET: api/Sesns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sesn>>> GetSesn()
        {
            return await _context.Sesn.ToListAsync();
        }

        // GET: api/Sesns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sesn>> GetSesn(int id)
        {
            var sesn = await _context.Sesn.FindAsync(id);

            if (sesn == null)
            {
                return NotFound();
            }

            return sesn;
        }

        // PUT: api/Sesns/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSesn(int id, Sesn sesn)
        {
            if (id != sesn.IdSesn)
            {
                return BadRequest();
            }

            _context.Entry(sesn).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SesnExists(id))
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

        // POST: api/Sesns
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Sesn>> PostSesn(UserLogin login)
        {

            var user = await _context.Usr.SingleOrDefaultAsync(u => u.UserName == login.UserName);
            if (user == null)
            {
                return BadRequest(new { errors = "No user was found" });
            }
            var pass = await _context.Pass.SingleOrDefaultAsync(p => p.UserIdUser == user.IdUser);

            using (MD5 md5Hash = MD5.Create())
            {
                
                if (!VerifyMd5Hash(md5Hash, login.UserPassword, pass.Hash))
                {
                    return BadRequest(new { errors = "Wrong Password" });
                }
                
            }
            Sesn sesn = new Sesn();
            sesn.StartDate = DateTime.Now;
            sesn.UserIdUser = user.IdUser;
            _context.Sesn.Add(sesn);

            await _context.SaveChangesAsync();
            

            return CreatedAtAction("GetSesn", new { id = sesn.IdSesn }, sesn);
        }

        // DELETE: api/Sesns/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sesn>> DeleteSesn(int id)
        {
            var sesn = await _context.Sesn.FindAsync(id);
            if (sesn == null)
            {
                return NotFound();
            }

            _context.Sesn.Remove(sesn);
            await _context.SaveChangesAsync();

            return sesn;
        }

        private bool SesnExists(int id)
        {
            return _context.Sesn.Any(e => e.IdSesn == id);
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

        private bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
        {
            string hashOfInput = GetMd5Hash(md5Hash, input);

            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            if (0 == comparer.Compare(hashOfInput, hash))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
