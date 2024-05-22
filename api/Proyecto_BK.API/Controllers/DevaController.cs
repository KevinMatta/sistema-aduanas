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
    public class DevaController : Controller
    {
        private readonly AduaService _aduaService;
        private readonly IMapper _mapper;
        public DevaController(AduaService aduaService, IMapper mapper)
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


        public class CrearRequest
        {
            public DeVaViewModel4 DeVaViewModel { get; set; }
            public FacturaEncViewModel FacturaEncViewModel { get; set; }
            public FacturaDetalleViewModel FacturaDetalleViewModel { get; set; }
        }
            


        [HttpPost("Crear")]
        public IActionResult Crear(CrearRequest request)
        {
            try
            {
                var aduana = _mapper.Map<tbDeclaracionDeValor>(request.DeVaViewModel);
                var facenc = _mapper.Map<tbFacturas>(request.FacturaEncViewModel);
                var facedt = _mapper.Map<tbFacturaDetalle>(request.FacturaDetalleViewModel);

                var result = _aduaService.DeVaCreate(aduana);
                var result1 = _aduaService.FactEncCreate(facenc);
                var result2 = _aduaService.FactDetCreate(facedt);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPost("Crear")]
        //public IActionResult Crear([FromBody] DeVaViewModel4 item, [FromQuery] FacturaEncViewModel ifemfe, [FromQuery] FacturaDetalleViewModel itemfd)
        //{
        //    try
        //    {
        //        var aduana = _mapper.Map<tbDeclaracionDeValor>(item);
        //        var facenc = _mapper.Map<tbFacturas>(ifemfe);
        //        var facedt = _mapper.Map<tbFacturaDetalle>(itemfd);
        //        var result = _aduaService.DeVaCreate(aduana);
        //        var result1 = _aduaService.FactEncCreate(facenc);
        //        var result2 = _aduaService.FactDetCreate(facedt);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

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
    }
}
