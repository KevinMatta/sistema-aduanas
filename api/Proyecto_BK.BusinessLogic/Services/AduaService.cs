using Proyecto_BK.BusinessLogic;
using sistema_aduana.DataAccess.Repository;
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
        public AduaService(AduanaRepository aduanaRepository)
        {
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
        #endregion
    }
}
