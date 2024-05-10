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
    public class PantallaController : Controller
    {
        private readonly AcceService _acceService;
        private readonly IMapper _mapper;
        public PantallaController(AcceService acceService, IMapper mapper)
        {
            _acceService = acceService;
            _mapper = mapper;
        }
        [HttpGet("ListEsquemas")]
        public IActionResult IndexEsquemas()
        {
            var list = _acceService.EsquemasListar();
            return Ok(list);
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _acceService.PantallasListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            var list = _acceService.PantallasBuscar(id);
            return Ok(list);
        }

        [HttpPost("Crear")]
        public IActionResult crear(PantallaViewModel item)
        {
            var model = _mapper.Map<tbPantallas>(item);
            var list = _acceService.PantallasCrear(model);
            return Ok(list);
        }

        [HttpPut("Actualizar")]
        public IActionResult actualizar(PantallaViewModel item)
        {
            var model = _mapper.Map<tbPantallas>(item);
            var list = _acceService.PantallasActualizar(model);
            return Ok(list);
        }

        [HttpDelete("Eliminar")]
        public IActionResult eliminar(int Pantalla_Id, int usuario)
        {
            var list = _acceService.PantallasEliminar(Pantalla_Id, usuario, DateTime.Now);
            return Ok(list);
        }


    }
}
