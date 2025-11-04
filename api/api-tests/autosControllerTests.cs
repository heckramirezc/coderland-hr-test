using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers.Autos;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace api_tests
{

    public class autosControllerTests
    {
        private readonly DbContextFactory _dbContextFactory;

        public autosControllerTests()
        {
            _dbContextFactory = new DbContextFactory();
        }

        // Prueba que el método GET /autos/brands retorna un resultado de tipo OK (HTTP 200).
        [Fact]
        public async Task GetMarcas_ShouldReturnOkResult()
        {
            using var context = _dbContextFactory.CreateContext();
            var controller = new autosController(context);
            var result = await controller.getAllBrands();
            Assert.IsType<OkObjectResult>(result.Result);
        }

        // Prueba que el método GET /autos/brands retorna el número correcto de elementos.
        [Fact]
        public async Task GetMarcas_ShouldReturnCorrectCount()
        {
            using var context = _dbContextFactory.CreateContext();
            var controller = new autosController(context);
            var expectedCount = DbContextFactory.GetSeedData().Count;

            var result = await controller.getAllBrands();
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var items = Assert.IsAssignableFrom<IEnumerable<MarcaAuto>>(okResult.Value);

            Assert.Equal(expectedCount, items.Count());
        }

        // Prueba que los datos retornados por el endpoint son los datos semilla correctos.
        [Fact]
        public async Task GetMarcas_ShouldReturnAllSeedData()
        {
            using var context = _dbContextFactory.CreateContext();
            var controller = new autosController(context);
            var seedData = DbContextFactory.GetSeedData().OrderBy(m => m.Id).ToList();
            var result = await controller.getAllBrands();
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedItems = Assert.IsAssignableFrom<IEnumerable<MarcaAuto>>(okResult.Value)
                                    .OrderBy(m => m.Id)
                                    .ToList();

            Assert.Equal(seedData.Count, returnedItems.Count);

            for (int i = 0; i < seedData.Count; i++)
            {
                Assert.Equal(seedData[i].Nombre, returnedItems[i].Nombre);
            }
        }
    }
}
