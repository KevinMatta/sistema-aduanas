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
    public class PersonaNaturalController : Controller
    {
        private readonly GralService   _gralService;
        private readonly IMapper _mapper;
        public PersonaNaturalController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpPost("Crear")]
        public IActionResult Crear(PersonaNaturalViewModel item)
        {
            try
            {
                var Pnat = _mapper.Map<tbPersonasNaturales>(item);
                var result = _gralService.PersonasNaturalesCrear(Pnat);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("SubirRTNsolicitante")]
        public async Task<IActionResult> SubirRTNsolicitante()
        {
            try
            {
                var pdf = Request.Form.Files[0];
                var keyName = Request.Form["keyName"];

                using (var stream = pdf.OpenReadStream())
                {
                    var response = await _gralService.SubirArchivoAsync(stream, keyName);
                }

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPost("SubirDNI")]
        public async Task<IActionResult> SubirDNI()
        {
            try
            {
                var pdf = Request.Form.Files[0];
                var keyName = Request.Form["keyName"];

                using (var stream = pdf.OpenReadStream())
                {
                    var response = await _gralService.SubirArchivoAsync(stream, keyName);
                }

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPost("SubirReciboPublico")]
        public async Task<IActionResult> SubirReciboPublico()
        {
            try
            {
                var pdf = Request.Form.Files[0];
                var keyName = Request.Form["keyName"];

                using (var stream = pdf.OpenReadStream())
                {
                    var response = await _gralService.SubirArchivoAsync(stream, keyName);
                }

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPost("EnviarCodigo")]
        public IActionResult EnviarCodigo(string correo, string codigo)
        {
            MailData mailData = new MailData();
            mailData.EmailToId = correo;
            mailData.EmailToName = "Estimado Usuario";
            mailData.EmailSubject = correo;
            mailData.EmailBody = codigo;
            var enviarCorreo = _gralService.SendMail(mailData);
            return Ok(enviarCorreo);
        }
    }
}
