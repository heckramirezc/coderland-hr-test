using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("MarcasAutos")]
    public class MarcaAuto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        [MaxLength(50)]
        public string? PaisOrigen { get; set; }
    }
}
