using System;
using api.Models;
using api.ViewModels;
using AutoMapper;

namespace api.Profiles
{
    public class BrandProfile : Profile
    {
        public BrandProfile()
        {
            CreateMap<MarcaAuto, Brand>()
                .ForMember(dest => dest.code, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.country, opt => opt.MapFrom(src => src.PaisOrigen));
        }
    }
}