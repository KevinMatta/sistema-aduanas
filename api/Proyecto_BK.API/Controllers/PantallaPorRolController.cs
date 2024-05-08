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
    public class PantallaPorRolController : Controller
    {


        private readonly AcceService _acceService;
        private readonly IMapper _mapper;
        public PantallaPorRolController(AcceService acceService, IMapper mapper)
        {
            _acceService = acceService;
            _mapper = mapper;
        }

        [HttpPost("Crear")]
        public IActionResult crear(PantallaPorRolViewModel item)
        {
            var model = _mapper.Map<tbPantallasPorRoles>(item);
            var list = _acceService.PantallasPorRolCrear(model);
            return Ok(list);
        }

        [HttpDelete("Eliminar")]
        public IActionResult eliminar(int id)
        {
            var list = _acceService.PantallasPorRolEliminar(id);
            return Ok(list);
        }
    }
}
