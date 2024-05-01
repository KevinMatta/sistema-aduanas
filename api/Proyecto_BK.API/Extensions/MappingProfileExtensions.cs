using AutoMapper;
using sistema_aduana.Entities.Entities;
using sistema_aduana.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sistema_Turnos.API.Extensions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            CreateMap<UsuarioViewModel, tbUsuarios>().ReverseMap();
            CreateMap<RolViewModel, tbRoles>().ReverseMap();
            CreateMap<PantallaViewModel, tbPantallas>().ReverseMap();

            CreateMap<PaisViewModel, tbPaises>().ReverseMap();
            CreateMap<EstadoViewModel, tbEstados>().ReverseMap();
            CreateMap<CiudadViewModel, tbCiudades>().ReverseMap();
            CreateMap<EstadoCivilViewModel, tbEstadosCiviles>().ReverseMap();
            CreateMap<EmpleadoViewModel, tbEmpleados>().ReverseMap();
            CreateMap<EmpresaViewModel, tbEmpresas>().ReverseMap();

            CreateMap<AduanaViewModel, tbAduanas>().ReverseMap();

        }
    }
}
