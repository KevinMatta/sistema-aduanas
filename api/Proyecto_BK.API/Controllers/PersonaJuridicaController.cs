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
    public class PersonaJuridicaController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public PersonaJuridicaController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }


        [HttpPost("Crear")]
        public IActionResult Crear(PersonaJuridicaViewModel item)
        {
            try
            {

                var aduana = _mapper.Map<tbPersonasJuridicas>(item);
                var result = _gralService.PersonasJuridicasCrear(aduana);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
