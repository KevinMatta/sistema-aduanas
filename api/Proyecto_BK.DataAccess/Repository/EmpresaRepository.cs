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
    public class EmpresaRepository : IRepository<tbEmpresas>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.EmpresasEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Empr_Id", id);
                parametro.Add("@Empr_Modifica", usuario);
                parametro.Add("@Empr_FechaModifica", fecha);

                var result = db.QueryFirst(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result.Resultado == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };
            };
        }

        public tbEmpresas Find(int? id)
        {
            string sql = ScriptsDatabase.EmpresasBuscar;

            tbEmpresas result = new tbEmpresas();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Empr_Id = id };
                result = db.QueryFirstOrDefault<tbEmpresas>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbEmpresas item)
        {
            string sql = ScriptsDatabase.EmpresasCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Empr_Descripcion", item.Empr_Descripcion);
                parameter.Add("@Ciud_Id", item.Ciud_Id);
                parameter.Add("@Empr_Creacion", item.Empr_Creacion);
                parameter.Add("@Empr_FechaCreacion", item.Empr_FechaCreacion);

                var result = db.QueryFirst(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result.Resultado == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEmpresas> List()
        {
            string sql = ScriptsDatabase.EmpresasListar;

            List<tbEmpresas> result = new List<tbEmpresas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbEmpresas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbEmpresas item)
        {
            string sql = ScriptsDatabase.EmpresasActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Empr_Id", item.Empr_Id);
                parameter.Add("@Empr_Descripcion", item.Empr_Descripcion);
                parameter.Add("@Ciud_Id", item.Ciud_Id);
                parameter.Add("@Empr_Modifica", item.Empr_Modifica);
                parameter.Add("@Empr_FechaModifica", item.Empr_FechaModifica);

                var result = db.QueryFirst(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result.Resultado == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = mensaje };
            }
        }

    }
}
