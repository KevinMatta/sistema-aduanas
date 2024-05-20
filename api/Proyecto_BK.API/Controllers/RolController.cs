using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using sistema_aduana.BusinessLogic.Services;
using sistema_aduana.Common.Models;
using sistema_aduana.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_aduana.API.Controllers
{
    [ApiController]
    [Route("/API/[controller]")]
    public class RolController : Controller
    {
        private readonly AcceService _acceService;
        private readonly IMapper _mapper;
        public RolController(AcceService acceService, IMapper mapper)
        {
            _acceService = acceService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _acceService.RolesListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult BuscarRol(int id)
        {
            var result = _acceService.RolesBuscar(id);
            return Ok(result);
        }

        [HttpPost("Crear")]
        public IActionResult CrearRol(RolViewModel item)
        {
            try
            {
                var rol = _mapper.Map<tbRoles>(item);
                var result = _acceService.RolesCrear(rol);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult ActualizarRol(RolViewModel item)
        {
            try
            {
                var rol = _mapper.Map<tbRoles>(item);
                var result = _acceService.RolesActualizar(rol);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("ToggleEstado")]
        public IActionResult ToggleEstado(int Rol_Id, int Usua_Modifica, bool estado)
        {
            var response = _acceService.RolesToggleEstado(Rol_Id, estado, Usua_Modifica, DateTime.Now);
            return Ok(response);
        }
    }
}
