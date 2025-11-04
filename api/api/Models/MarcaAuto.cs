using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    /// <summary>
    /// Representa una marca de automóvil en la base de datos.
    /// </summary>
    [Table("MarcasAutos")]
    public class MarcaAuto
    {
        /// <summary>
        /// Identificador único de la marca.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Nombre de la marca del automóvil.
        /// </summary>
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        /// <summary>
        /// País de origen de la marca (opcional).
        /// </summary>
        [MaxLength(50)]
        public string? PaisOrigen { get; set; }
    }
}
