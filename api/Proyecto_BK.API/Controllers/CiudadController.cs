using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using sistema_aduana.BusinessLogic.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_aduana.API.Controllers
{
    [ApiController]
    [Route("/API/[controller]")]
    public class CiudadController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public CiudadController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _gralService.CiudadListar();
            return Ok(list);
        }
    }
}
