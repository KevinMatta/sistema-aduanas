using Dapper;
using Microsoft.Data.SqlClient;
using sistema_aduana.DataAcces;
using sistema_aduana.DataAcces.Repository;
using sistema_aduana.Entities.Entities;
using SistemaMedico.DataAcces.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.DataAccess.Repository
{
    public class RolRepository : IRepository<tbRoles>
    {
        public RequestStatus ToggleEstado(int? id, bool estado, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.RolesToggleEstado;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Rol_Id", id);
                parametro.Add("@Rol_Estado", estado);
                parametro.Add("@Rol_Modifica", usuario);
                parametro.Add("@Rol_FechaModifica", fecha);

                var result = db.QueryFirst(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result.Resultado == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };

            };
        }

        public tbRoles Find(int? id)
        {
            string sql = ScriptsDatabase.RolesBuscar;

            tbRoles result = new tbRoles();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Rol_Id = id };
                result = db.QueryFirstOrDefault<tbRoles>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbRoles item)
        {
            string sql = ScriptsDatabase.RolesCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Rol_Descripcion", item.Rol_Descripcion);
                parameter.Add("@pantallas", CreateDataTable(item.pantallasPorAgregar).AsTableValuedParameter("tbPantallasIds"));
                parameter.Add("@Rol_Creacion", item.Rol_Creacion);
                parameter.Add("@Rol_FechaCreacion", item.Rol_FechaCreacion);

                var result = db.QueryFirst(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result.Resultado == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };
            }
        }
        private DataTable CreateDataTable(List<int> list)
        {
            var table = new DataTable();
            table.Columns.Add("Pant_Id", typeof(int));

            foreach (var item in list)
            {
                table.Rows.Add(item);
            }

            return table;
        }

        public IEnumerable<tbRoles> List()
        {
            string sqlRoles = ScriptsDatabase.RolesListar;
            string sqlParos = ScriptsDatabase.PantallasPorRolesListar;

            List<tbRoles> result = new List<tbRoles>();
            List<tbPantallasPorRoles> resultPARO = new List<tbPantallasPorRoles>();


            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sqlRoles, commandType: CommandType.Text).ToList();


                resultPARO = db.Query<tbPantallasPorRoles>(sqlParos, commandType: CommandType.Text).ToList();

                foreach (var rol in result)
                {
                    rol.pantallasPorAgregar = new List<int>();
                    foreach (var paro in resultPARO)
                    {
                        if (paro.Rol_Id == rol.Rol_Id)
                        {
                            rol.pantallasPorAgregar.Add(paro.Pant_Id);
                        }
                    }
                }

                return result;
            }
        }

        public RequestStatus Update(tbRoles item)
        {
            string sql = ScriptsDatabase.RolesActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Rol_Id", item.Rol_Id);
                parameter.Add("@Rol_Descripcion", item.Rol_Descripcion);
                parameter.Add("@pantallas", CreateDataTable(item.pantallasPorAgregar).AsTableValuedParameter("tbPantallasIds"));
                parameter.Add("@Rol_Modifica", item.Rol_Modifica);
                parameter.Add("@Rol_FechaModifica", item.Rol_FechaModifica);

                var result = db.QueryFirst(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result.Resultado == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };
            }
        }

        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            throw new NotImplementedException();
        }
    }
}
