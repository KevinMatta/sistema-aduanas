//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace sistema_aduana.API.Controllers
//{
//    public class ArancelController : Controller
//    {
//        public IActionResult Index()
//        {
//            return View();
//        }
//    }
//}
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
    public class ArancelController : Controller
    {
        private readonly AduaService _aduaService;
        private readonly IMapper _mapper;
        public ArancelController(AduaService aduaService, IMapper mapper)
        {
            _aduaService = aduaService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _aduaService.AduanaListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            try
            {
                var result = _aduaService.AduanaBuscar(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Crear")]
        public IActionResult Crear(ArancelesViewModel item)
        {
            try
            {
                var aduana = _mapper.Map<tbAranceles>(item);
                var result = _aduaService.ArancelCrear(aduana);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(ArancelesViewModel item)
        {
            try
            {
                var aduana = _mapper.Map<tbAranceles>(item);
                var result = _aduaService.ArancelActualizar(aduana);
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
                var result = _aduaService.AduanaEliminar(id, usuario, DateTime.Now);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
