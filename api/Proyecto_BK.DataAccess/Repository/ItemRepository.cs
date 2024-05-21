//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace sistema_aduana.DataAccess.Repository
//{
//    class ItemRepository
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
    public class ItemRepository : IRepository<tbItems>
    {
        public RequestStatus ToggleEstado(int? id, bool estado, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.ItemsToggleEstado;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Item_Id", id);
                parametro.Add("@Item_Estado", estado);
                parametro.Add("@Item_Modifica", usuario);
                parametro.Add("@Item_FechaModifica", fecha);

                var result = db.QueryFirst(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result.Resultado == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };

            };
        }

        public tbItems Find(int? id)
        {
            string sql = ScriptsDatabase.AduanasBuscar;

            tbItems result = new tbItems();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Adua_Id = id };
                result = db.QueryFirstOrDefault<tbItems>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbItems item)
        {
            string sql = "Gral.sp_Items_crear";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Item_Descripcion", item.Item_Descripcion);
                parameter.Add("@Cate_Id", item.Cate_Id);
                parameter.Add("@Item_Creacion", item.Item_Creacion);
                parameter.Add("@Item_FechaCreacion", item.Item_FechaCreacion);

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


        public IEnumerable<tbItems> List()
        {
            string sql = "[Adua].[sp_Aranceles_listar]";

            List<tbItems> result = new List<tbItems>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbItems>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbItems item)
        {
            string sql = "Gral.sp_Items_actualizar";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Item_Id", item.Item_Id);
                parameter.Add("@Item_Descripcion", item.Item_Descripcion);
                parameter.Add("@Cate_Id", item.Cate_Id);
                parameter.Add("@Item_Modifica", item.Item_Modifica);
                parameter.Add("@Item_FechaModifica", item.Item_FechaModifica);

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

        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            throw new NotImplementedException();
        }
    }
}

