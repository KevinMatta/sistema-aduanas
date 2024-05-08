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
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.RolesEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Rol_Id", id);
                parametro.Add("@Rol_Modifica", usuario);
                parametro.Add("@Rol_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
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
                parameter.Add("@Rol_Creacion", item.Rol_Creacion);
                parameter.Add("@Rol_FechaCreacion", item.Rol_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbRoles> List()
        {
            string sql = ScriptsDatabase.RolesListar;

            List<tbRoles> result = new List<tbRoles>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sql, commandType: CommandType.Text).ToList();

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
                parameter.Add("@Rol_Modifica", item.Rol_Modifica);
                parameter.Add("@Rol_FechaModifica", item.Rol_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }
    }
}
