using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class MarcaAuto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string PaisOrigen { get; set; } = null!;
    }
}