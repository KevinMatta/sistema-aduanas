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
    public class PersonaNaturalController : Controller
    {
        private readonly GralService   _gralService;
        private readonly IMapper _mapper;
        public PersonaNaturalController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpPost("Crear")]
        public IActionResult Crear(PersonaNaturalViewModel item)
        {
            try
            {
                var Pnat = _mapper.Map<tbPersonasNaturales>(item);
                var result = _gralService.PersonasNaturalesCrear(Pnat);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
