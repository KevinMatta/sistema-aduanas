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
     public class CiudadRepository : IRepository<tbCiudades>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.CiudadesEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Ciud_Id", id);
                parametro.Add("@Ciud_Modifica", usuario);
                parametro.Add("@Ciud_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbCiudades Find(int? id)
        {
            string sql = ScriptsDatabase.CiudadesBuscar;

            tbCiudades result = new tbCiudades();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Ciud_Id = id };
                result = db.QueryFirstOrDefault<tbCiudades>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbCiudades item)
        {
            string sql = ScriptsDatabase.CiudadesCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Ciud_Descripcion", item.Ciud_Descripcion);
                parameter.Add("@Esta_Id", item.Esta_Id);
                parameter.Add("@Ciud_Creacion", item.Ciud_Creacion);
                parameter.Add("@Ciud_FechaCreacion", item.Ciud_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbCiudades> List()
        {
            string sql = ScriptsDatabase.CiudadesListar;

            List<tbCiudades> result = new List<tbCiudades>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbCiudades>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbCiudades item)
        {
            string sql = ScriptsDatabase.CiudadesActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Ciud_Id", item.Ciud_Id);
                parameter.Add("@Ciud_Descripcion", item.Ciud_Descripcion);
                parameter.Add("@Esta_Id", item.Esta_Id);
                parameter.Add("@Ciud_Modifica", item.Ciud_Modifica);
                parameter.Add("@Ciud_FechaModifica", item.Ciud_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }
    }
}
