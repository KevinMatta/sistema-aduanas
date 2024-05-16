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
        public AduaService(AduanaRepository aduanaRepository, ArancelRepository arancelRepository)
        {
            _arancelRepository = arancelRepository;
            _aduaRepository = aduanaRepository;
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

        public ServiceResult AduanaEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _aduaRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        public ServiceResult ArancelListar(tbAranceles item)
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
    }
}
