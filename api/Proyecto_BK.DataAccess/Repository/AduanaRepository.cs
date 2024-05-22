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
    public class AduanaRepository : IRepository<tbAduanas>
    {
        public RequestStatus ToggleEstado(int? id, bool estado, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.AduanasToggleEstado;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Adua_Id", id);
                parametro.Add("@Adua_Estado", estado);
                parametro.Add("@Adua_Modifica", usuario);
                parametro.Add("@Adua_FechaModifica", fecha);

                var result = db.QueryFirst(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result.Resultado == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };

            };
        }
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            throw new NotImplementedException();
        }

        public tbAduanas Find(int? id)
        {
            string sql = ScriptsDatabase.AduanasBuscar;

            tbAduanas result = new tbAduanas();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Adua_Id = id };
                result = db.QueryFirstOrDefault<tbAduanas>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbAduanas item)
        {
            string sql = ScriptsDatabase.AduanasCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Adua_Descripcion", item.Adua_Descripcion);
                parameter.Add("@Ciud_Id", item.Ciud_Id);
                parameter.Add("@Adua_Creacion", item.Adua_Creacion);
                parameter.Add("@Adua_FechaCreacion", item.Adua_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbAduanas> List()
        {
            string sql = ScriptsDatabase.AduanasListar;

            List<tbAduanas> result = new List<tbAduanas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbAduanas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbAduanas item)
        {
            string sql = ScriptsDatabase.AduanasActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Adua_Id", item.Adua_Id);
                parameter.Add("@Adua_Descripcion", item.Adua_Descripcion);
                parameter.Add("@Ciud_Id", item.Ciud_Id);
                parameter.Add("@Adua_Modifica", item.Adua_Modifica);
                parameter.Add("@Adua_FechaModifica", item.Adua_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

    }
}
