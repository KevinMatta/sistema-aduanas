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
    public class EmpresaController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public EmpresaController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _gralService.EmpresaListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            var result = _gralService.EmpresaBuscar(id);
            return Ok(result);
        }

        [HttpPost("Crear")]
        public IActionResult Crear(EmpresaViewModel item)
        {
            try
            {
                var empresa = _mapper.Map<tbEmpresas>(item);
                var result = _gralService.EmpresaCrear(empresa);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(EmpresaViewModel item)
        {
            try
            {
                var empresa = _mapper.Map<tbEmpresas>(item);
                var result = _gralService.EmpresaActualizar(empresa);
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
                var result = _gralService.EmpresaEliminar(id, usuario, DateTime.Now);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
