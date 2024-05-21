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
    public class EmpleadoController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public EmpleadoController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _gralService.EmpleadoListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            var result = _gralService.EmpleadoBuscar(id);
            return Ok(result);
        }

        [HttpGet("BuscarPorDNI/{DNI}")]
        public IActionResult BuscarDNI(string DNI)
        {
            var result = _gralService.EmpleadoBuscar(DNI);
            return Ok(result);
        }

        [HttpPost("Crear")]
        public IActionResult Crear(EmpleadoViewModel item)
        {
            try
            {
                var empleado = _mapper.Map<tbEmpleados>(item);
                var result = _gralService.EmpleadoCrear(empleado);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(EmpleadoViewModel item)
        {
            try
            {
                var empleado = _mapper.Map<tbEmpleados>(item);
                var result = _gralService.EmpleadoActualizar(empleado);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("ToggleEstado")]
        public IActionResult ToggleEstado(int Empl_Id, int Usua_Modifica, bool estado)
        {
            var response = _gralService.EmpleadoToggleEstado(Empl_Id, estado, Usua_Modifica, DateTime.Now);
            return Ok(response);
        }
    }
}
