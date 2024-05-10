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
    public class ComercianteIndividualController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public ComercianteIndividualController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpPost("Crear")]
        public IActionResult Crear(ComercianteIndividualViewModel item)
        {
            try
            {
                var CInd = _mapper.Map<tbComerciantesIndividuales>(item);
                var result = _gralService.ComerciantesIndividualesCrear(CInd);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
