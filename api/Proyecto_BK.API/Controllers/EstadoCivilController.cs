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
    public class EstadoCivilController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public EstadoCivilController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _gralService.EstadoCivilListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            var result = _gralService.EstadoCivilBuscar(id);
            return Ok(result);
        }

        [HttpPost("Crear")]
        public IActionResult Crear(EstadoCivilViewModel item)
        {
            try
            {
                var estadoCivil = _mapper.Map<tbEstadosCiviles>(item);
                var result = _gralService.EstadoCivilCrear(estadoCivil);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(EstadoCivilViewModel item)
        {
            try
            {
                var estadoCivil = _mapper.Map<tbEstadosCiviles>(item);
                var result = _gralService.EstadoCivilActualizar(estadoCivil);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id, int usuario)
        {
            try
            {
                var result = _gralService.EstadoCivilEliminar(id, usuario, DateTime.Now);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
