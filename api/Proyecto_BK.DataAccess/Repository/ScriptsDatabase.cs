using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaMedico.DataAcces.Repository
{
    public class ScriptsDatabase
    {
        #region Acce
        #region Usuarios
        public static string UsuariosListar = "[Acce].[sp_Usuarios_listar]";
        #endregion
        #region Roles
        public static string RolesListar = "[Acce].[sp_Roles_listar]";
        #endregion
        #region Pantallas
        public static string PantallasListar = "[Acce].[sp_Pantallas_listar]";
        #endregion
        #endregion

        #region Gral
        #region Paises
        public static string PaisesListar = "[Gral].[sp_Paises_listar]";
        #endregion
        #region Estados
        public static string EstadosListar = "[Gral].[sp_Estados_listar]";
        #endregion
        #region Ciudades
        public static string CiudadesListar = "[Gral].[sp_Ciudades_listar]";
        #endregion
        #region Empresas
        public static string EmpresasListar = "[Gral].[sp_Empresas_listar]";
        #endregion
        #region EstadosCiviles
        public static string EstadosCivilesListar = "[Gral].[sp_EstadosCiviles_listar]";
        #endregion
        #region Empleados
        public static string EmpleadosListar = "[Gral].[sp_Empleados_listar]";
        #endregion
        #endregion

        #region Adua
        #region Aduanas
        public static string AduanasListar = "[Adua].[sp_Aduanas_listar]";
        #endregion
        #endregion
    }
}
