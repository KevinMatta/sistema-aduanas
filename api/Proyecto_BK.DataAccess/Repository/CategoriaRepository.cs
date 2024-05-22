//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace sistema_aduana.DataAccess.Repository
//{
//    class CategoriaRepository
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
    public class CategoriaRepository : IRepository<tbCategorias>
    {
        public RequestStatus ToggleEstado(int? id, bool estado, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.CategoriasToggleEstado;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Cate_Id", id);
                parametro.Add("@Cate_Estado", estado);
                parametro.Add("@Cate_Modifica", usuario);
                parametro.Add("@Cate_FechaModifica", fecha);

                var result = db.QueryFirst(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result.Resultado == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };

            };
        }
        public tbCategorias Find(int? id)
        {
            string sql = ScriptsDatabase.AduanasBuscar;

            tbCategorias result = new tbCategorias();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Adua_Id = id };
                result = db.QueryFirstOrDefault<tbCategorias>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbCategorias item)
        {
            string sql = "Gral.sp_Categorias_crear";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Cate_Descripcion", item.Cate_Descripcion);
                parameter.Add("@Cate_Creacion", item.Cate_Creacion);
                parameter.Add("@Cate_FechaCreacion", item.Cate_FechaCreacion);

                try
                {
                    var result = db.QueryFirst(sql, parameter, commandType: CommandType.StoredProcedure);
                    string mensaje = (result.Resultado != -1) ? "exito" : "error";
                    return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };
                }
                catch (Exception ex)
                {
                    // Log the exception
                    Console.WriteLine(ex.Message);
                    return new RequestStatus { CodeStatus = -1, MessageStatus = "error" };
                }
            }
        }


        public IEnumerable<tbCategorias> List()
        {

            string sql = ScriptsDatabase.CategoriasListar;


            List<tbCategorias> result = new List<tbCategorias>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbCategorias>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbCategorias item)
        {
            string sql = "Gral.sp_Categorias_actualizar";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Cate_Id", item.Cate_Id);
                parameter.Add("@Cate_Descripcion", item.Cate_Descripcion);
                parameter.Add("@Cate_Modifica", item.Cate_Modifica);
                parameter.Add("@Cate_FechaModifica", item.Cate_FechaModifica);

                try
                {
                    var result = db.QueryFirst(sql, parameter, commandType: CommandType.StoredProcedure);
                    string mensaje = (result.Resultado == 1) ? "exito" : "error";
                    return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };
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
