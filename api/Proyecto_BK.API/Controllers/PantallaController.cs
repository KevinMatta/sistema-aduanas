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
    public class PantallaController : Controller
    {
        private readonly AcceService _acceService;
        private readonly IMapper _mapper;
        public PantallaController(AcceService acceService, IMapper mapper)
        {
            _acceService = acceService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _acceService.PantallasListar();
            return Ok(list);
        }
        [HttpGet("ListEsquemas")]
        public IActionResult IndexEsquemas()
        {
            var list = _acceService.EsquemasListar();
            return Ok(list);
        }
    }
}
