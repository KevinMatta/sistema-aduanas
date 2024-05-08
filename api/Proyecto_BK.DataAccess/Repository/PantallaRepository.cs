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
   public class PantallaRepository : IRepository<tbPantallas>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.PantallasEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Pant_Id", id);
                parametro.Add("@Pant_Modifica", usuario);
                parametro.Add("@Pant_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbPantallas Find(int? id)
        {
            string sql = ScriptsDatabase.PantallasBuscar;

            tbPantallas result = new tbPantallas();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Pant_Id = id };
                result = db.QueryFirstOrDefault<tbPantallas>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPantallas item)
        {
            string sql = ScriptsDatabase.PantallasCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Pant_Descripcion", item.Pant_Descripcion);
                parameter.Add("@Pant_Creacion", item.Pant_Creacion);
                parameter.Add("@Pant_FechaCreacion", item.Pant_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPantallas> List()
        {
            string sql = ScriptsDatabase.PantallasListar;

            List<tbPantallas> result = new List<tbPantallas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbPantallas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbPantallas item)
        {
            string sql = ScriptsDatabase.PantallasActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Pant_Id", item.Pant_Id);
                parameter.Add("@Pant_Descripcion", item.Pant_Descripcion);
                parameter.Add("@Pant_Modifica", item.Pant_Modifica);
                parameter.Add("@Pant_FechaModifica", item.Pant_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEsquemas> ListEsqu()
        {
            string sql = ScriptsDatabase.EsquemasListar;

            List<tbEsquemas> result = new List<tbEsquemas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbEsquemas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }
    }
}
