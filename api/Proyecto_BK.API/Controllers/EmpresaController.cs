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
    }
}
