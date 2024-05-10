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
    public class OficinasController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public OficinasController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _gralService.OficinasListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            var result = _gralService.OficinasBuscar(id);
            return Ok(result);
        }

        [HttpPost("Crear")]
        public IActionResult Crear(OficinasViewModel item)
        {
            try
            {
                var oficina = _mapper.Map<tbOficinas>(item);
                var result = _gralService.OficinasCrear(oficina);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(OficinasViewModel item)
        {
            try
            {
                var oficina = _mapper.Map<tbOficinas>(item);
                var result = _gralService.OficinasActualizar(oficina);
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
                var result = _gralService.OficinasEliminar(id, usuario, DateTime.Now);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
