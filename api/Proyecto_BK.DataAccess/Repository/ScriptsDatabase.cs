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
        public static string UsuariosBuscar = "[Acce].[sp_Usuarios_buscar]";
        public static string UsuariosBuscarPorUsername = "[Acce].[sp_Usuarios_buscarPorUsuario]";
        public static string UsuariosLogin = "[Acce].[SP_Usuarios_Login]";
        public static string UsuariosCrear = "[Acce].[sp_Usuarios_crear]";
        public static string UsuariosPIN = "[Acce].[sp_Usuarios_pin]";
        public static string UsuariosReestablecer = "[Acce].[sp_Usuarios_reestablecer]";
        public static string UsuariosActualizar = "[Acce].[sp_Usuarios_actualizar]";
        public static string UsuariosToggleEstado = "[Acce].[sp_Usuarios_toggleEstado]";
        #endregion
        #region Roles
        public static string RolesListar = "[Acce].[sp_Roles_listar]";
        public static string RolesBuscar = "[Acce].[sp_Roles_buscar]";
        public static string RolesCrear = "[Acce].[sp_Roles_crear]";
        public static string RolesActualizar = "[Acce].[sp_Roles_actualizar]";
        public static string RolesToggleEstado = "[Acce].[sp_Roles_toggleEstado]";
        #endregion
        #region Pantallas
        public static string PantallasListar = "[Acce].[sp_Pantallas_listar]";
        public static string PantallasBuscar = "[Acce].[sp_Pantallas_buscar]";
        public static string PantallasCrear = "[Acce].[sp_Pantallas_crear]";
        public static string PantallasActualizar = "[Acce].[sp_Pantallas_actualizar]";
        public static string PantallasEliminar = "[Acce].[sp_Pantallas_eliminar]";
        public static string EsquemasListar = "[Acce].[sp_Esquemas_listar]";
        #endregion
        #region PantallasPorRoles
        public static string PantallasPorRolesCrear = "[Acce].[sp_PantallasPorRol_crear]";
        public static string PantallasPorRolesEliminar = "[Acce].[sp_PantallasPorRoles_eliminar]";
        public static string PantallasPorRolesListar = "[Acce].[sp_PantallasPorRoles_listar]";
        #endregion
        #endregion

        #region Gral

        #region Paises
        public static string PaisesListar = "[Gral].[sp_Paises_listar]";
        public static string PaisesBuscar = "[Gral].[sp_Paises_buscar]";
        public static string PaisesCrear = "[Gral].[sp_Paises_crear]";
        public static string PaisesActualizar = "[Gral].[sp_Paises_actualizar]";
        public static string PaisesEliminar = "[Gral].[sp_Paises_eliminar]";
        #endregion

        #region Estados
        public static string EstadosListar = "[Gral].[sp_Estados_listar]";
        public static string EstadosBuscar = "[Gral].[sp_Estados_buscar]";
        public static string EstadosCrear = "[Gral].[sp_Estados_crear]";
        public static string EstadosActualizar = "[Gral].[sp_Estados_actualizar]";
        public static string EstadosEliminar = "[Gral].[sp_Estados_eliminar]";
        #endregion

        #region Ciudades
        public static string CiudadesListar = "[Gral].[sp_Ciudades_listar]";
        public static string CiudadesBuscar = "[Gral].[sp_Ciudades_buscar]";
        public static string CiudadesCrear = "[Gral].[sp_Ciudades_crear]";
        public static string CiudadesActualizar = "[Gral].[sp_Ciudades_actualizar]";
        public static string CiudadesEliminar = "[Gral].[sp_Ciudades_eliminar]";
        #endregion

        #region Empresas
        public static string EmpresasListar = "[Gral].[sp_Empresas_listar]";
        public static string EmpresasBuscar = "[Gral].[sp_Empresas_buscar]";
        public static string EmpresasCrear = "[Gral].[sp_Empresas_crear]";
        public static string EmpresasActualizar = "[Gral].[sp_Empresas_actualizar]";
        public static string EmpresasEliminar = "[Gral].[sp_Empresas_eliminar]";
        #endregion

        #region EstadosCiviles
        public static string EstadosCivilesListar = "[Gral].[sp_EstadosCiviles_listar]";
        public static string EstadosCivilesBuscar = "[Gral].[sp_EstadosCiviles_buscar]";
        public static string EstadosCivilesCrear = "[Gral].[sp_EstadosCiviles_crear]";
        public static string EstadosCivilesActualizar = "[Gral].[sp_EstadosCiviles_actualizar]";
        public static string EstadosCivilesEliminar = "[Gral].[sp_EstadosCiviles_eliminar]";
        #endregion

        #region Empleados
        public static string EmpleadosListar = "[Gral].[sp_Empleados_listar]";
        public static string EmpleadosBuscar = "[Gral].[sp_Empleados_buscar]";
        public static string EmpleadosBuscarPorDNI = "[Gral].[sp_Empleados_buscarPorDNI]";
        public static string EmpleadosCrear = "[Gral].[sp_Empleados_crear]";
        public static string EmpleadosActualizar = "[Gral].[sp_Empleados_actualizar]";
        public static string EmpleadosEliminar = "[Gral].[sp_Empleados_eliminar]";
        #endregion

        #region Profesiones
        public static string ProfesionesListar = "Gral.sp_Profesiones_listar";
        public static string ProfesionesBuscar = "Gral.sp_Profesiones_buscar";
        public static string ProfesionesCrear = "Gral.sp_Profesiones_crear";
        public static string ProfesionesActualizar = "Gral.sp_Profesiones_actualizar";
        public static string ProfesionesEliminar = "Gral.sp_Profesiones_eliminar";
        #endregion

        #region Oficinas
        public static string OficinasListar = "Gral.sp_Oficinas_listar";
        public static string OficinasBuscar = "Gral.sp_Oficinas_buscar";
        public static string OficinasCrear = "Gral.sp_Oficinas_crear";
        public static string OficinasActualizar = "Gral.sp_Oficinas_actualizar";
        public static string OficinasEliminar = "Gral.sp_Oficinas_eliminar";

        #endregion

        #region PersonasNaturales
        public static string PersonasNaturalesListar = "Gral.sp_PersonasNaturales_listar";
        public static string PersonasNaturalesBuscar = "Gral.sp_PersonasNaturales_buscar";
        public static string PersonasNaturalesBuscarPorDNI = "Gral.sp_PersonasNaturales_buscarPorDNI";
        public static string PersonasNaturalesCrear = "Gral.sp_PersonasNaturales_crear";
        public static string PersonasNaturalesPIN = "[Acce].[sp_PersonasNaturales_pin]";
        public static string PersonasNaturalesActualizar = "Gral.sp_PersonasNaturales_actualizar";
        public static string PersonasNaturalesEliminar = "Gral.sp_PersonasNaturales_eliminar";
        #endregion

        #region ComerciantesIndividuales
        public static string ComercianteIndividualListar = "Gral.sp_ComerciantesIndividuales_listar";
        public static string ComercianteIndividualBuscar = "Gral.sp_ComerciantesIndividuales_buscar";
        public static string ComercianteIndividualCrear = "Gral.sp_ComerciantesIndividuales_crear";
        public static string ComercianteIndividualActualizar = "Gral.sp_ComerciantesIndividuales_actualizar";
        public static string ComercianteIndividualEliminar = "Gral.sp_ComerciantesIndividuales_eliminar";
        #endregion

        #region PersonasJuridicas
        public static string PersonasJuridicasListar = "Gral.sp_PersonasJuridicas_listar";
        public static string PersonasJuridicasBuscar = "Gral.sp_PersonasJuridicas_buscar";
        public static string PersonasJuridicasCrear = "Gral.sp_PersonasJuridicas_crear";
        public static string PersonasJuridicasActualizar = "[Gral].[sp_PersonasJuridicas_actualizar]";
        public static string PersonasJuridicasEliminar = "Gral.sp_PersonasJuridicas_eliminar";
        #endregion

        #endregion

        #region Adua
        #region Aduanas
        public static string AduanasListar = "[Adua].[sp_Aduanas_listar]";
        public static string AduanasBuscar = "[Adua].[sp_Aduanas_buscar]";
        public static string AduanasCrear = "[Adua].[sp_Aduanas_crear]";
        public static string AduanasActualizar = "[Adua].[sp_Aduanas_actualizar]";
        public static string AduanasToggleEstado = "[Adua].[sp_Aduanas_toggleEstado]";

        public static string ComerciantesIndividualesActualizar { get; internal set; }
        public static string ComerciantesIndividualesListar { get; internal set; }
        #endregion
        #endregion

        #region Categorias

        public static string CategoriasToggleEstado = "[Gral].[sp_Categorias_toggleEstado]";
        public static string CategoriasListar = "[Gral].[sp_Categorias_listar]";

        #endregion

        #region Items

        public static string ItemsToggleEstado = "[Gral].[sp_Items_toggleEstado]";
        public static string ItemsListar = "[Gral].[sp_Items_listar]";

        #endregion
    }
}
