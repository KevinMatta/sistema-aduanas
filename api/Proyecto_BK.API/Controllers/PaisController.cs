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
    public class PaisController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public PaisController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _gralService.PaisListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            var result = _gralService.PaisBuscar(id);
            return Ok(result);
        }

        [HttpPost("Crear")]
        public IActionResult Crear(PaisViewModel item)
        {
            try
            {
                var pais = _mapper.Map<tbPaises>(item);
                var result = _gralService.PaisCrear(pais);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(PaisViewModel item)
        {
            try
            {
                var pais = _mapper.Map<tbPaises>(item);
                var result = _gralService.PaisActualizar(pais);
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
                var result = _gralService.PaisEliminar(id, usuario, DateTime.Now);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
