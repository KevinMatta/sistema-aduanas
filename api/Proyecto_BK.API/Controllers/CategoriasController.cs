//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace sistema_aduana.API.Controllers
//{
//    public class CategoriasController : Controller
//    {
//        public IActionResult Index()
//        {
//            return View();
//        }
//    }
//}

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
    public class CategoriasController : Controller
    {
        private readonly GralService _gralService ;
        private readonly IMapper _mapper;
        public CategoriasController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _gralService.catListart();
            return Ok(list);
        }

        [HttpGet("Buscar/{id}")]
        public IActionResult Buscar(int id)
        {
            try
            {
                //var result = _gralService.AduanaBuscar(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Crear")]
        public IActionResult Crear(CategoriaViewModel item)
        {
            try
            {
                var cat = _mapper.Map<tbCategorias>(item);
                var result = _gralService.CategoriasCrear(cat);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Actualizar(CategoriaViewModel item)
        {
            try
            {
                var aduana = _mapper.Map<tbCategorias>(item);
                var result = _gralService.CategoriasActualizar(aduana);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id, int usuario)
        {
            try
            {
                //var result = _gralService.ca(id, usuario, DateTime.Now);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}