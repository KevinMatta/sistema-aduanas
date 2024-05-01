using Proyecto_BK.BusinessLogic;
using sistema_aduana.DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.BusinessLogic.Services
{
    public class AcceService
    {
        private readonly UsuarioRepository _usuarioRepository;
        private readonly RolRepository _rolRepository;
        private readonly PantallaRepository _pantallaRepository;
        public AcceService(UsuarioRepository usuarioRepository, RolRepository rolRepository, PantallaRepository pantallaRepository)
        {
            _usuarioRepository = usuarioRepository;
            _rolRepository = rolRepository;
            _pantallaRepository = pantallaRepository;
        }

        #region Usuarios
        public ServiceResult UsuariosListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuarioRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Roles
        public ServiceResult RolesListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Pantallas
        public ServiceResult PantallasListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRepository.List();
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
