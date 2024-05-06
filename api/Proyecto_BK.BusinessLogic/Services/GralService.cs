using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Proyecto_BK.BusinessLogic;
using sistema_aduana.DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.BusinessLogic.Services
{
    public class GralService
    {

        private readonly IConfiguration _configuration;

        private readonly CiudadRepository _ciudadRepository;
        private readonly EstadoRepository _estadoRepository;
        private readonly PaisRepository _paisRepository;
        private readonly EmpresaRepository _empresaRepository;
        private readonly EmpleadoRepository _empleadoRepository;
        private readonly EstadoCivilRepository _estadoCivilRepository;
        public GralService(CiudadRepository ciudadRepository, 
            EstadoRepository estadoRepository, 
            EstadoCivilRepository estadoCivilRepository, 
            PaisRepository paisRepository, 
            EmpresaRepository empresaRepository, 
            EmpleadoRepository empleadoRepository,
            IConfiguration configuration)
        {
            _ciudadRepository = ciudadRepository;
            _estadoRepository = estadoRepository;
            _estadoCivilRepository = estadoCivilRepository;
            _paisRepository = paisRepository;
            _empresaRepository = empresaRepository;
            _empleadoRepository = empleadoRepository;
            _configuration = configuration;
        }

        #region Utilitarios

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
                        try
                        {
                            await fileTransferUtility.UploadAsync(newMemoryStream, bucketName, keyName);

                        }
                        catch (Exception ex)
                        {
                            return result.Error("Error al subir el archivo");
                        }
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
        #endregion



        //#region PersonaNatural
        //public ServiceResult PersonaNaturalListar()
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var list = _personaNaturalRepository.List();
        //        return result.Ok(list);
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}
        //#endregion
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
        #endregion

    }
}
