using Proyecto_BK.BusinessLogic;
using sistema_aduana.DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.BusinessLogic.Services
{
    public class GralService
    {
        private readonly CiudadRepository _ciudadRepository;
        private readonly EstadoRepository _estadoRepository;
        private readonly PaisRepository _paisRepository;
        private readonly EmpresaRepository _empresaRepository;
        private readonly EmpleadoRepository _empleadoRepository;
        private readonly EstadoCivilRepository _estadoCivilRepository;
        public GralService(CiudadRepository ciudadRepository, EstadoRepository estadoRepository, EstadoCivilRepository estadoCivilRepository, PaisRepository paisRepository, EmpresaRepository empresaRepository, EmpleadoRepository empleadoRepository)
        {
            _ciudadRepository = ciudadRepository;
            _estadoRepository = estadoRepository;
            _estadoCivilRepository = estadoCivilRepository;
            _paisRepository = paisRepository;
            _empresaRepository = empresaRepository;
            _empleadoRepository = empleadoRepository;
        }

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
