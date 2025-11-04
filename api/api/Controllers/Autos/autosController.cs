using System;
using api.Data;
using api.Models;
using api.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;

namespace api.Controllers.Autos
{
    [ApiController]
    [Route("api/[controller]")]
    public class autosController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public autosController(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet("brands")]
        [SwaggerOperation(
            Summary = "Listado de marcas de autos",
            Description = "Retorna todas las marcas registradas en el sistema."
        )]
        [SwaggerResponse(StatusCodes.Status200OK, "Marcas obtenidas exitosamente", typeof(IEnumerable<Brand>))]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(Helpers.Examples.BrandExamples))]
        public async Task<ActionResult<IEnumerable<Brand>>> getAllBrands()
        {
            try
            {
                var brands = await _db.MarcasAutos.AsNoTracking().ToListAsync();
                if (brands == null || brands.Count == 0)
                    return NotFound("No existen marcas registradas.");

                return Ok(_mapper.Map<IEnumerable<Brand>>(brands));
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex, $"Error en GET /api/autos/brands → {ex.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, "Ocurrió un error inesperado.");
            }
        }
    }
}