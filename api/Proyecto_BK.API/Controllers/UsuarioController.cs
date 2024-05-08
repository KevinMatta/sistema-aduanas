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
    public class UsuarioController : Controller
    {
        private readonly AcceService _acceService;
        private readonly IMapper _mapper;
        public UsuarioController(AcceService acceService, IMapper mapper)
        {
            _acceService = acceService;
            _mapper = mapper;
        }


        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _acceService.UsuariosListar();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            var list = _acceService.UsuariosBuscar(id);
            return Ok(list);
        }

        [HttpPost("Crear")]
        public IActionResult crear(UsuarioViewModel item)
        {
            var model = _mapper.Map<tbUsuarios>(item);
            var list = _acceService.UsuariosCrear(model);
            return Ok(list);
        }

        [HttpPut("Actualizar")]
        public IActionResult actualizar(UsuarioViewModel item)
        {
            var model = _mapper.Map<tbUsuarios>(item);
            var list = _acceService.UsuariosActualizar(model);
            return Ok(list);
        }

        [HttpDelete("Eliminar")]
        public IActionResult eliminar(int Usua_Id, int Usua_Modifica)
        {
            var list = _acceService.UsuariosEliminar(Usua_Id, Usua_Modifica, DateTime.Now);
            return Ok(list);
        }
    }
}
