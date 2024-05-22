//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace sistema_aduana.DataAccess.Repository
//{
//    class FactDetRepository
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
    public class FactDetRepository : IRepository<tbFacturaDetalle>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            throw new NotImplementedException();
        }

        public tbFacturaDetalle Find(int? id)
        {
            string sql = ScriptsDatabase.AduanasBuscar;

            tbFacturaDetalle result = new tbFacturaDetalle();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Adua_Id = id };
                result = db.QueryFirstOrDefault<tbFacturaDetalle>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbFacturaDetalle item)
        {
            string sql = "Adua.sp_FacturaDetalle_crear";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Fact_Id", item.Fact_Id);
                parameter.Add("@Item_Id", item.Item_Id);
                parameter.Add("@FaDe_NumeroItem", item.FaDe_NumeroItem);
                parameter.Add("@FaDe_Cantidad", item.FaDe_Cantidad);
                parameter.Add("@FaDe_UnidadMedida", item.FaDe_UnidadMedida);
                parameter.Add("@FaDe_Caracteristicas", item.FaDe_Caracteristicas);
                parameter.Add("@Pais_Id", item.Pais_Id);
                parameter.Add("@FaDe_ValorUnitario", item.FaDe_ValorUnitario);
                parameter.Add("@FaDe_TotalFactura", item.FaDe_TotalFactura);
                parameter.Add("@FaDe_Creacion", item.FaDe_Creacion);
                parameter.Add("@FaDe_FechaCreacion", item.FaDe_FechaCreacion);

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


        public IEnumerable<tbFacturaDetalle> List()
        {
            string sql = "[Adua].[sp_Aranceles_listar]";

            List<tbFacturaDetalle> result = new List<tbFacturaDetalle>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbFacturaDetalle>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbFacturaDetalle item)
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
