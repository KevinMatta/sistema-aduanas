using Microsoft.Extensions.DependencyInjection;
//using Proyecto_BK.DataAccess;
//using Proyecto_BK.DataAccess.Repository;
using Proyecto_BK.BusinessLogic.Services;
using System;
using System.Collections.Generic;
using System.Text;
using sistema_aduana.DataAcces;
using sistema_aduana.DataAccess.Repository;
using sistema_aduana.BusinessLogic.Services;

namespace Proyecto_BK.BusinessLogic.Services
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection service, string conn)
        {
            service.AddScoped<UsuarioRepository>();
            service.AddScoped<RolRepository>();
            service.AddScoped<PantallaRepository>();
            service.AddScoped<PantallasPorRolRepository>();
            service.AddScoped<PaisRepository>();
            service.AddScoped<EstadoRepository>();
            service.AddScoped<CiudadRepository>();
            service.AddScoped<EmpresaRepository>();
            service.AddScoped<EmpleadoRepository>();
            service.AddScoped<EstadoCivilRepository>();
            service.AddScoped<AduanaRepository>();
            service.AddScoped<PersonaNaturalRepository>();
            service.AddScoped<ComercianteIndividualRepository>();
            service.AddScoped<PersonaJuridicaRepository>();
            service.AddScoped<ProfesionesRepository>();
            service.AddScoped<OficinasRepository>();


            sistema_aduanaContext.BuildConnectionString(conn);
        }
        public static void BusinessLogic(this IServiceCollection service)
        {
            service.AddScoped<AcceService>();
            service.AddScoped<GralService>();
            service.AddScoped<AduaService>();

        }
    }
}
