//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace sistema_aduana.DataAccess.Repository
//{
//    class FacturaRepository
//    {
//    }
//}
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
    public class FacturaRepository : IRepository<tbFacturas>
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

        public tbFacturas Find(int? id)
        {
            string sql = ScriptsDatabase.AduanasBuscar;

            tbFacturas result = new tbFacturas();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Adua_Id = id };
                result = db.QueryFirstOrDefault<tbFacturas>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbFacturas item)
        {
            string sql = "Adua.sp_Facturas_crear";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Fact_NumeroFactura", item.Fact_NumeroFactura);
                parameter.Add("@Fact_Fecha", item.Fact_Fecha);
                parameter.Add("@Fact_Creacion", 1);
                parameter.Add("@Fact_FechaCreacion", DateTime.Now);

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


        public IEnumerable<tbFacturas> List()
        {
            string sql = "[Adua].[sp_Aranceles_listar]";

            List<tbFacturas> result = new List<tbFacturas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbFacturas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbFacturas item)
        {
            string sql = "Gral.sp_Categorias_actualizar";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                //parameter.Add("@Cate_Id", item.Cate_Id);
                //parameter.Add("@Cate_Descripcion", item.Cate_Descripcion);
                //parameter.Add("@Cate_Modifica", item.Cate_Modifica);
                //parameter.Add("@Cate_FechaModifica", item.Cate_FechaModifica);

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
