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
    public class ProfesionController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public ProfesionController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _gralService.ProfesionesListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            var result = _gralService.ProfesionesBuscar(id);
            return Ok(result);
        }

        [HttpPost("Crear")]
        public IActionResult Crear(ProfesionViewModel item)
        {
            try
            {
                var profesion = _mapper.Map<tbProfesiones>(item);
                var result = _gralService.ProfesionesCrear(profesion);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(ProfesionViewModel item)
        {
            try
            {
                var profesion = _mapper.Map<tbProfesiones>(item);
                var result = _gralService.ProfesionesActualizar(profesion);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Eliminar")]
        public IActionResult Eliminar(int id, int usuario)
        {
            try
            {
                var result = _gralService.ProfesionesEliminar(id, usuario, DateTime.Now);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
