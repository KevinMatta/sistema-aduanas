
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
    public class ArancelRepository : IRepository<tbAranceles>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.AduanasEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Adua_Id", id);
                parametro.Add("@Adua_Modifica", usuario);
                parametro.Add("@Adua_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbAranceles Find(int? id)
        {
            string sql = ScriptsDatabase.AduanasBuscar;

            tbAranceles result = new tbAranceles();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Adua_Id = id };
                result = db.QueryFirstOrDefault<tbAranceles>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbAranceles item)
        {
            string sql = "Adua.sp_Aranceles_crear";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Aran_Descripcion", item.Aran_Descripcion);
                parameter.Add("@Aran_Porcentaje", item.Aran_Porcentaje);
                parameter.Add("@Aran_Creacion", item.Aran_Creacion);
                parameter.Add("@Aran_FechaCreacion", item.Aran_FechaCreacion);

                try
                {
                    var result = db.QueryFirstOrDefault<int>(sql, parameter, commandType: CommandType.StoredProcedure);
                    string mensaje = (result != -1) ? "exito" : "error";
                    return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
                }
                catch (Exception ex)
                {
                    // Log the exception
                    Console.WriteLine(ex.Message);
                    return new RequestStatus { CodeStatus = -1, MessageStatus = "error" };
                }
            }
        }

        public IEnumerable<tbAranceles> List()
        {
            string sql = "[Adua].[sp_Aranceles_listar]";

            List<tbAranceles> result = new List<tbAranceles>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbAranceles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbAranceles item)
        {
            string sql = "Adua.sp_Aranceles_actualizar";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Aran_Id", item.Aran_Id);
                parameter.Add("@Aran_Descripcion", item.Aran_Descripcion);
                parameter.Add("@Aran_Porcentaje", item.Aran_Porcentaje);
                parameter.Add("@Aran_Modifica", item.Aran_Modifica);
                parameter.Add("@Aran_FechaModifica", item.Aran_FechaModifica);

                try
                {
                    var result = db.QueryFirstOrDefault<int>(sql, parameter, commandType: CommandType.StoredProcedure);
                    string mensaje = (result == 1) ? "exito" : "error";
                    return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
                }
                catch (Exception ex)
                {
                    // Log the exception
                    Console.WriteLine(ex.Message);
                    return new RequestStatus { CodeStatus = -1, MessageStatus = "error" };
                }
            }
        }

    }
}
