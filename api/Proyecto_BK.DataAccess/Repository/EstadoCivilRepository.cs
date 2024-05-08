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
    public class EstadoCivilRepository : IRepository<tbEstadosCiviles>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.EstadosCivilesEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@EsCi_Id", id);
                parametro.Add("@EsCi_Modifica", usuario);
                parametro.Add("@EsCi_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbEstadosCiviles Find(int? id)
        {
            string sql = ScriptsDatabase.EstadosCivilesBuscar;

            tbEstadosCiviles result = new tbEstadosCiviles();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { EsCi_Id = id };
                result = db.QueryFirstOrDefault<tbEstadosCiviles>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbEstadosCiviles item)
        {
            string sql = ScriptsDatabase.EstadosCivilesCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@EsCi_Descripcion", item.EsCi_Descripcion);
                parameter.Add("@EsCi_Creacion", item.EsCi_Creacion);
                parameter.Add("@EsCi_FechaCreacion", item.EsCi_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEstadosCiviles> List()
        {
            string sql = ScriptsDatabase.EstadosCivilesListar;

            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            string sql = ScriptsDatabase.EstadosCivilesActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@EsCi_Id", item.EsCi_Id);
                parameter.Add("@EsCi_Descripcion", item.EsCi_Descripcion);
                parameter.Add("@EsCi_Modifica", item.EsCi_Modifica);
                parameter.Add("@EsCi_FechaModifica", item.EsCi_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

    }
}
