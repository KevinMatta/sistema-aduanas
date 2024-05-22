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
    public class ProfesionesRepository : IRepository<tbProfesiones>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.ProfesionesEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Prof_Id", id);
                parameter.Add("@Prof_Modifica", usuario);
                parameter.Add("@Prof_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parameter,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            };
        }

        public tbProfesiones Find(int? Prof_Id)
        {
            string sql = ScriptsDatabase.ProfesionesBuscar;

            tbProfesiones result = new tbProfesiones();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Prof_Id };
                result = db.QueryFirstOrDefault<tbProfesiones>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbProfesiones item)
        {
            string sql = ScriptsDatabase.ProfesionesCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Prof_Descripcion", item.Prof_Descripcion);
                parameter.Add("@Prof_Creacion", item.Prof_Creacion);
                parameter.Add("@Prof_FechaCreacion", item.Prof_FechaCreacion);

                var result = db.QueryFirst(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result.Resultado == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbProfesiones> List()
        {
            string sql = ScriptsDatabase.ProfesionesListar;

            List<tbProfesiones> result = new List<tbProfesiones>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbProfesiones>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbProfesiones item)
        {
            string sql = ScriptsDatabase.ProfesionesActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Prof_Id", item.Prof_Id);
                parameter.Add("@Prof_Descripcion", item.Prof_Descripcion);
                parameter.Add("@Prof_Modifica", item.Prof_Modifica);
                parameter.Add("@Prof_FechaModifica", item.Prof_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }

    }
}
