using Proyecto_BK.BusinessLogic;
using sistema_aduana.DataAccess.Repository;
using sistema_aduana.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.BusinessLogic.Services
{
    public class AduaService
    {
        private readonly AduanaRepository _aduaRepository;
        private readonly ArancelRepository _arancelRepository;
        private readonly DeVaRepository _deVaRepository;
        private readonly FacturaRepository _facturaRepository;
        private readonly FactDetRepository _factDetRepository;
        public AduaService(AduanaRepository aduanaRepository, ArancelRepository arancelRepository, DeVaRepository deVaRepository, FacturaRepository facturaRepository, FactDetRepository factDetRepository)
        {
            _arancelRepository = arancelRepository;
            _aduaRepository = aduanaRepository;
            _deVaRepository = deVaRepository;
            _facturaRepository = facturaRepository;
            _factDetRepository = factDetRepository;
        }

        #region Aduana
        public ServiceResult AduanaListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _aduaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult AduanaBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _aduaRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult AduanaCrear(tbAduanas item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _aduaRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult AduanaActualizar(tbAduanas item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _aduaRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult AduanaToggleEstado(int id, bool estado, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var list = _aduaRepository.ToggleEstado(id, estado, usuario, fecha);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        public ServiceResult ArancelListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _arancelRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #region Aranceles
        public ServiceResult ArancelCrear(tbAranceles item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _arancelRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ArancelActualizar(tbAranceles item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _arancelRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion
        #region DEVA
        public ServiceResult DeVaCreate(tbDeclaracionDeValor item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _deVaRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region FactEnc
        public ServiceResult FactEncCreate(tbFacturas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturaRepository.Insert(item);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        #region FactDet
        public ServiceResult FactDetCreate(tbFacturaDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _factDetRepository.Insert(item);
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
