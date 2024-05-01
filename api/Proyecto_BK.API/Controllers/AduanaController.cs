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
    }
}
