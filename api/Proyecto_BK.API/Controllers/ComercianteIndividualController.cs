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
    public class ComercianteIndividualController : Controller
    {
        private readonly GralService _gralService;
        private readonly IMapper _mapper;
        public ComercianteIndividualController(GralService gralService, IMapper mapper)
        {
            _gralService = gralService;
            _mapper = mapper;
        }
        [HttpPost("Crear")]
        public IActionResult Crear(ComercianteIndividualViewModel item)
        {
            try
            {
                var CInd = _mapper.Map<tbComerciantesIndividuales>(item);
                var result = _gralService.ComerciantesIndividualesCrear(CInd);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("SubirArchivo")]
        public async Task<IActionResult> SubirArchivo()
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
