using System;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }

        public DbSet<MarcaAuto> MarcasAutos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            SeedData(modelBuilder);
        }

        private static void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MarcaAuto>().HasData(
                new MarcaAuto { Id = 1, Nombre = "Toyota", PaisOrigen = "Japón" },
                new MarcaAuto { Id = 2, Nombre = "Ford", PaisOrigen = "Estados Unidos" },
                new MarcaAuto { Id = 3, Nombre = "BMW", PaisOrigen = "Alemania" },
                new MarcaAuto { Id = 4, Nombre = "Honda", PaisOrigen = "Japón" }
            );
        }
    }
}