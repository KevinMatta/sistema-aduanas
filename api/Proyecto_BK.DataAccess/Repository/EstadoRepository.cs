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
    public class EstadoRepository : IRepository<tbEstados>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.EstadosEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Esta_Id", id);
                parametro.Add("@Esta_Modifica", usuario);
                parametro.Add("@Esta_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbEstados Find(int? id)
        {
            string sql = ScriptsDatabase.EstadosBuscar;

            tbEstados result = new tbEstados();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Esta_Id = id };
                result = db.QueryFirstOrDefault<tbEstados>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbEstados item)
        {
            string sql = ScriptsDatabase.EstadosCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Esta_Descripcion", item.Esta_Descripcion);
                parameter.Add("@Pais_Id", item.Pais_Id);
                parameter.Add("@Esta_Creacion", item.Esta_Creacion);
                parameter.Add("@Esta_FechaCreacion", item.Esta_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEstados> List()
        {
            string sql = ScriptsDatabase.EstadosListar;

            List<tbEstados> result = new List<tbEstados>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbEstados>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbEstados item)
        {
            string sql = ScriptsDatabase.EstadosActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Esta_Id", item.Esta_Id);
                parameter.Add("@Esta_Descripcion", item.Esta_Descripcion);
                parameter.Add("@Pais_Id", item.Pais_Id);
                parameter.Add("@Esta_Modifica", item.Esta_Modifica);
                parameter.Add("@Esta_FechaModifica", item.Esta_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

    }
}
