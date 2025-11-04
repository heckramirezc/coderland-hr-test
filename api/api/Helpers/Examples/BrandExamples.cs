using System;
using api.ViewModels;
using Swashbuckle.AspNetCore.Filters;

namespace api.Helpers.Examples
{
    public class BrandExamples : IExamplesProvider<IEnumerable<Brand>>
    {
        public IEnumerable<Brand> GetExamples()
        {
            return new List<Brand>
            {
                new Brand { code = 1, name = "Toyota", country = "Japón" },
                new Brand { code = 2, name = "Ford", country = "Estados Unidos" }
            };
        }
    }
}