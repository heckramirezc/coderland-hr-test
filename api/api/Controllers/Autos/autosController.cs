using System;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Autos
{
    [ApiController]
    [Route("api/[controller]")]
    public class autosController : ControllerBase
    {
        private readonly AppDbContext _db;

        public autosController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IEnumerable<MarcaAuto>>> GetAll()
        {
            var brands = await _db.MarcasAutos.ToListAsync();
            return Ok(brands);
        }
    }
}