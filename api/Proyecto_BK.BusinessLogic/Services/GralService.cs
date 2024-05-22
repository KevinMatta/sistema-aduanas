using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Proyecto_BK.BusinessLogic;
using sistema_aduana.DataAccess.Repository;
using sistema_aduana.Entities.Entities;
using System;
using MimeKit;
using MailKit.Net.Smtp;
using System.IO;
using Microsoft.Extensions.Options;
using sistema_aduana.Common.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.BusinessLogic.Services
{
    public class GralService
    {
        private readonly MailSettings _mailSettings;
        private readonly IConfiguration _configuration;
        private readonly CiudadRepository _ciudadRepository;
        private readonly EstadoRepository _estadoRepository;
        private readonly PaisRepository _paisRepository;
        private readonly EmpresaRepository _empresaRepository;
        private readonly EmpleadoRepository _empleadoRepository;
        private readonly EstadoCivilRepository _estadoCivilRepository;
        private readonly ProfesionesRepository _profesionesRepository;
        private readonly PersonaNaturalRepository _personaNaturalRepository;
        private readonly ComercianteIndividualRepository _comercianteIndividualRepository;
        private readonly PersonaJuridicaRepository _personaJuridicaRepository;

        private readonly ItemRepository _itemRepository;
        private readonly CategoriaRepository _categoriaRepository;

        public GralService(CiudadRepository ciudadRepository, EstadoRepository estadoRepository,
            EstadoCivilRepository estadoCivilRepository, PaisRepository paisRepository, EmpresaRepository empresaRepository, 
            EmpleadoRepository empleadoRepository, ProfesionesRepository profesionesRepository,
            PersonaNaturalRepository personaNaturalRepository, ComercianteIndividualRepository comercianteIndividualRepository,

            IConfiguration configuration, IOptions<MailSettings> mailSettingsOptions,

            PersonaJuridicaRepository personaJuridicaRepository, ItemRepository itemRepository, CategoriaRepository categoriaRepository)

        {
            _ciudadRepository = ciudadRepository;
            _categoriaRepository = categoriaRepository;
            _estadoRepository = estadoRepository;
            _estadoCivilRepository = estadoCivilRepository;
            _paisRepository = paisRepository;
            _empresaRepository = empresaRepository;
            _empleadoRepository = empleadoRepository;
            _profesionesRepository = profesionesRepository;
            _personaNaturalRepository = personaNaturalRepository;
            _comercianteIndividualRepository = comercianteIndividualRepository;
            _personaJuridicaRepository = personaJuridicaRepository;

            _itemRepository = itemRepository;

            _configuration = configuration;
            _mailSettings = mailSettingsOptions.Value;

        }

        #region Utilitarios

        public ServiceResult SendMail(MailData mailData)
        {
            var result = new ServiceResult();
            try
            {
                using (MimeMessage emailMessage = new MimeMessage())
                {
                    MailboxAddress emailFrom = new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail);
                    emailMessage.From.Add(emailFrom);
                    MailboxAddress emailTo = new MailboxAddress(mailData.EmailToName, mailData.EmailToId);
                    emailMessage.To.Add(emailTo);

                    emailMessage.Subject = "Codigo de registro";

                    BodyBuilder emailBodyBuilder = new BodyBuilder();
                    string html = "<header><h1 style='text-align: center;'>Verifica tu correo electrónico</h1>"+
                        "<p style='text-align: center;'>Ingresa este código de verificación en nuestro sitio web en el formulario de registro</p></header>" +
                        $"<main><div style='background-color: #E3E3E3; width: 100px; max-width: 100px; margin: 20px auto; font-size: 18px; padding: 20px; border-radius: 10px; text-align: center;'>{mailData.EmailBody}</div>" +
                        "<footer style='text-align: center;'>Si tu no solicitaste este correo de confirmación puedes ignorarlo.</footer></main>";
                    emailBodyBuilder.HtmlBody = html;

                    emailMessage.Body = emailBodyBuilder.ToMessageBody();
                    using (SmtpClient mailClient = new SmtpClient())
                    {
                        mailClient.Connect(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                        mailClient.Authenticate(_mailSettings.UserName, _mailSettings.Password);
                        mailClient.Send(emailMessage);
                        mailClient.Disconnect(true);
                    }
                }
                return result.Ok("Correo enviado");
            }
            catch (Exception ex)
            {
                return result.Error("Error al enviar el correo");
            }
        }

        public async Task<ServiceResult> SubirArchivoAsync(Stream pdf, string keyName)
        {
            var result = new ServiceResult();
            try
            {
                string bucketKey = _configuration["BucketKeys:bucketKey"];
                string bucketSecret = _configuration["BucketKeys:bucketSecret"];
                string bucketName = _configuration["BucketKeys:bucketName"];

                using (var client = new AmazonS3Client(bucketKey, bucketSecret, RegionEndpoint.USEast2))
                {
                    using (var newMemoryStream = new MemoryStream())
                    {
                        await pdf.CopyToAsync(newMemoryStream);
                        newMemoryStream.Position = 0;

                        var fileTransferUtility = new TransferUtility(client);
                        await fileTransferUtility.UploadAsync(newMemoryStream, bucketName, keyName);
                    }
                }
                return result.Ok();
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Pais
        public ServiceResult PaisListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _paisRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PaisBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _paisRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PaisCrear(tbPaises item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _paisRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PaisActualizar(tbPaises item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _paisRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PaisEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _paisRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Estado
        public ServiceResult EstadoListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _estadoRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCrear(tbEstados item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _estadoRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoActualizar(tbEstados item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _estadoRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _estadoRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        
        #region Ciudad
        public ServiceResult CiudadListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CiudadBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _ciudadRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CiudadCrear(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _ciudadRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CiudadActualizar(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _ciudadRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CiudadEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _ciudadRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        
        #region Empresa
        public ServiceResult EmpresaListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empresaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpresaBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _empresaRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpresaCrear(tbEmpresas item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _empresaRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpresaActualizar(tbEmpresas item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _empresaRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpresaEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _empresaRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        
        #region Empleado
        public ServiceResult EmpleadoListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _empleadoRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoBuscar(string DNI)
        {
            var result = new ServiceResult();
            try
            {
                var item = _empleadoRepository.Find(DNI);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoCrear(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _empleadoRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoActualizar(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _empleadoRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoToggleEstado(int id, bool estado, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadoRepository.ToggleEstado(id, estado, usuario, fecha);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region EstadoCivil
        public ServiceResult EstadoCivilListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoCivilRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCivilBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _estadoCivilRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCivilCrear(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _estadoCivilRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCivilActualizar(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _estadoCivilRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCivilEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _estadoCivilRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Profesiones
        public ServiceResult ProfesionesListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _profesionesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ProfesionesBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _profesionesRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ProfesionesCrear(tbProfesiones item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _profesionesRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ProfesionesActualizar(tbProfesiones item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _profesionesRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ProfesionesEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _profesionesRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region PersonaNatural
        public ServiceResult PersonasNaturalesListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _personaNaturalRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasNaturalesBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _personaNaturalRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult PersonasNaturalesBuscarPorDNI(string DNI)
        {
            var result = new ServiceResult();
            try
            {
                var item = _personaNaturalRepository.Find(DNI);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasNaturalesCrear(tbPersonasNaturales item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _personaNaturalRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasNaturalesActualizar(tbPersonasNaturales item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _personaNaturalRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasNaturalesEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _personaNaturalRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region ComercianteIndividual
        public ServiceResult ComerciantesIndividualesListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _comercianteIndividualRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ComerciantesIndividualesBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _comercianteIndividualRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ComerciantesIndividualesCrear(tbComerciantesIndividuales item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _comercianteIndividualRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ComerciantesIndividualesActualizar(tbComerciantesIndividuales item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _comercianteIndividualRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ComerciantesIndividualesEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _comercianteIndividualRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region personaJuridica
        public ServiceResult PersonasJuridicasListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _personaJuridicaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasJuridicasBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _personaJuridicaRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasJuridicasCrear(tbPersonasJuridicas item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _personaJuridicaRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasJuridicasActualizar(tbPersonasJuridicas item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _personaJuridicaRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasJuridicasEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _personaJuridicaRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion


        #region item

    

        public ServiceResult itemListarcat(int cat)
        {
            var result = new ServiceResult();
            try
            {
                var list = _itemRepository.Listddl(cat);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #region item
        public ServiceResult itemListar()

        {
            var result = new ServiceResult();
            try
            {

                var list = _itemRepository.List();

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ItemCrear(tbItems item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _itemRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ItemActualizar(tbItems item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _itemRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ItemsToggleEstado(int id, bool estado, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var list = _itemRepository.ToggleEstado(id, estado, usuario, fecha);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion


        #region Categorias


        public ServiceResult CategoriasListar()

        {
            var result = new ServiceResult();
            try
            {
                var list = _categoriaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CategoriasCrear(tbCategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _categoriaRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CategoriasActualizar(tbCategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _categoriaRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CategoriasToggleEstado(int id, bool estado, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var list = _categoriaRepository.ToggleEstado(id, estado, usuario, fecha);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
    }
}
