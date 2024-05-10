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
    public class AcceService
    {
        private readonly UsuarioRepository _usuarioRepository;
        private readonly RolRepository _rolRepository;
        private readonly PantallaRepository _pantallaRepository;
        private readonly PantallasPorRolRepository _pantallasPorRolRepository;
        public AcceService(UsuarioRepository usuarioRepository, RolRepository rolRepository, PantallaRepository pantallaRepository, PantallasPorRolRepository pantallasPorRolRepository)
        {
            _usuarioRepository = usuarioRepository;
            _rolRepository = rolRepository;
            _pantallaRepository = pantallaRepository;
            _pantallasPorRolRepository = pantallasPorRolRepository;
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

        public ServiceResult UsuariosBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuarioRepository.Find(id);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult UsuariosCrear(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuarioRepository.Insert(item);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult UsuariosActualizar(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuarioRepository.Update(item);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult UsuariosEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuarioRepository.Delete(id, usuario, fecha);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
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

        public ServiceResult RolesBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.Find(id);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult RolesCrear(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.Insert(item);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult RolesActualizar(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.Update(item);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult RolesEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.Delete(id, usuario, fecha);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
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

        public ServiceResult PantallasBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRepository.Find(id);
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PantallasCrear(tbPantallas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRepository.Insert(item);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PantallasActualizar(tbPantallas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRepository.Update(item);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PantallasEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRepository.Delete(id, usuario, fecha);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region PantallasPorRol
        public ServiceResult PantallasPorRolCrear(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasPorRolRepository.Insert(item);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PantallasPorRolEliminar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasPorRolRepository.Eliminar(id);
                return list.CodeStatus > 0 ? result.Ok(list) : result.Error(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Esquemas
        public ServiceResult EsquemasListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRepository.ListEsqu();
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
