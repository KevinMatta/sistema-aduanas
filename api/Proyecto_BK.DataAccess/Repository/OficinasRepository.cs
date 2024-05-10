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
    public class OficinasRepository : IRepository<tbOficinas>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.OficinasEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Ofic_Id", id);
                parametro.Add("@Ofic_Modifica", usuario);
                parametro.Add("@Ofic_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbOficinas Find(int? id)
        {
            string sql = ScriptsDatabase.OficinasBuscar;

            tbOficinas result = new tbOficinas();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Ofic_Id = id };
                result = db.QueryFirstOrDefault<tbOficinas>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbOficinas item)
        {
            string sql = ScriptsDatabase.OficinasCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Ofic_Descripcion", item.Ofic_Descripcion);
                parameter.Add("@Adua_Id", item.Adua_Id);
                parameter.Add("@Ofic_Creacion", item.Ofic_Creacion);
                parameter.Add("@Ofic_FechaCreacion", item.Ofic_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbOficinas> List()
        {
            string sql = ScriptsDatabase.OficinasListar;

            List<tbOficinas> result = new List<tbOficinas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbOficinas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbOficinas item)
        {
            string sql = ScriptsDatabase.OficinasActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Ofic_Id", item.Ofic_Id);
                parameter.Add("@Ofic_Descripcion", item.Ofic_Descripcion);
                parameter.Add("@Adua_Id", item.Adua_Id);
                parameter.Add("@Ofic_Modifica", item.Ofic_Modifica);
                parameter.Add("@Ofic_FechaModifica", item.Ofic_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

    }
}
