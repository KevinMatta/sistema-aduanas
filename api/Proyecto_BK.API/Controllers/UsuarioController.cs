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

        [HttpPost("IniciarSesion")]
        public IActionResult IniciarSesion(UsuarioViewModel item)
        {
            var modelo = _mapper.Map<tbUsuarios>(item);
            var response = _acceService.IniciarSesion(modelo);
            return Ok(response);
        }

        [HttpPost("EnviarCodigo")]
        public IActionResult EnviarCodigo(string usuario)
        {
            tbUsuarios usuarioEncontrado = _acceService.UsuariosBuscarPorUsername(usuario);
            if (usuarioEncontrado == null)
            {
                return BadRequest("Este usuario no existe");
            }
            MailData mailData = new MailData();
            mailData.EmailToId = usuarioEncontrado.Empl_Email;
            mailData.EmailToName = "Estimado Usuario";
            mailData.EmailSubject = usuarioEncontrado.Empl_Email;
            mailData.EmailBody = "";
            var enviarCorreo = _acceService.SendMail(mailData);
            return Ok(enviarCorreo);
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

        [HttpPost("ValidarPin")]
        public IActionResult ValidarPin(string PIN)
        {
            bool validado = false;//_acceService.ValidarPin(PIN);
            return validado ? Ok(PIN) : BadRequest("Código de verificación incorrecto");
        }
        [HttpPut("restablecer/{PIN}")]
        public IActionResult restablecer(string PIN, UsuarioViewModel item)
        {
            //var model = _mapper.Map<tbUsuarios>(item);
            var modelo = new tbUsuarios()
            {
                //Usua_PIN = PIN,
                Usua_Clave = item.Usua_Clave,
            };

            var result = true;// _acceService.restablecer(modelo);
            return Ok(result);
        }
    }
}
