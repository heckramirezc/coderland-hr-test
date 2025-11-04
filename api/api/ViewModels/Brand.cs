using System;
using System.ComponentModel;

namespace api.ViewModels
{
    public class Brand
    {
        [Description("Código único de la marca")]
        public int code { get; set; }

        [Description("Nombre público de la marca")]
        public string name { get; set; } = string.Empty;

        [Description("País de origen de la marca")]
        public string? country { get; set; }
    }
}