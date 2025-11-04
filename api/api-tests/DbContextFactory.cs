using System;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace api_tests
{
    public class DbContextFactory
    {
        public AppDbContext CreateContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new AppDbContext(options);
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();


            if (!context.MarcasAutos.Any())
            {
                context.MarcasAutos.AddRange(GetSeedData());
                context.SaveChanges();
            }

            return context;
        }

        public static List<MarcaAuto> GetSeedData()
        {
            return new List<MarcaAuto>
            {
                new MarcaAuto { Id = 1, Nombre = "Toyota", PaisOrigen = "Japón"},
                new MarcaAuto { Id = 2, Nombre = "Ford", PaisOrigen = "Estados Unidos"},
                new MarcaAuto { Id = 3, Nombre = "BMW", PaisOrigen = "Alemania"},
                new MarcaAuto { Id = 4, Nombre = "Hyundai", PaisOrigen = "Corea del Sur"}
            };
        }
    }
}
