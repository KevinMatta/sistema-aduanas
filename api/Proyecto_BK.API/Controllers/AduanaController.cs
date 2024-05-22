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
    public class AduanaController : Controller
    {
        private readonly AduaService _aduaService;
        private readonly IMapper _mapper;
        public AduanaController(AduaService aduaService, IMapper mapper)
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
        public IActionResult Crear(AduanaViewModel item)
        {
            try
            {
                var aduana = _mapper.Map<tbAduanas>(item);
                var result = _aduaService.AduanaCrear(aduana);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(AduanaViewModel item)
        {
            try
            {
                var aduana = _mapper.Map<tbAduanas>(item);
                var result = _aduaService.AduanaActualizar(aduana);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("ToggleEstado")]
        public IActionResult ToggleEstado(int Adua_Id, int Usua_Modifica, bool estado)
        {
            var response = _aduaService.AduanaToggleEstado(Adua_Id, estado, Usua_Modifica, DateTime.Now);
            return Ok(response);
        }
    }
}
