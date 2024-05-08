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
    public class PaisRepository : IRepository<tbPaises>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.PaisesEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Pais_Id", id);
                parametro.Add("@Pais_Modifica", usuario);
                parametro.Add("@Pais_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbPaises Find(int? id)
        {
            string sql = ScriptsDatabase.PaisesBuscar;

            tbPaises result = new tbPaises();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Pais_Id = id };
                result = db.QueryFirstOrDefault<tbPaises>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPaises item)
        {
            string sql = ScriptsDatabase.PaisesCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Pais_Descripcion", item.Pais_Descripcion);
                parameter.Add("@Pais_Creacion", item.Pais_Creacion);
                parameter.Add("@Pais_FechaCreacion", item.Pais_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPaises> List()
        {
            string sql = ScriptsDatabase.PaisesListar;

            List<tbPaises> result = new List<tbPaises>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbPaises>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbPaises item)
        {
            string sql = ScriptsDatabase.PaisesActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Pais_Id", item.Pais_Id);
                parameter.Add("@Pais_Descripcion", item.Pais_Descripcion);
                parameter.Add("@Pais_Modifica", item.Pais_Modifica);
                parameter.Add("@Pais_FechaModifica", item.Pais_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }
    }
}
