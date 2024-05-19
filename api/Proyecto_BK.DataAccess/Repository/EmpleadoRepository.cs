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
    public class EmpleadoRepository : IRepository<tbEmpleados>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.EmpleadosEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Empl_Id", id);
                parametro.Add("@Empl_Modifica", usuario);
                parametro.Add("@Empl_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbEmpleados Find(int? id)
        {
            string sql = ScriptsDatabase.EmpleadosBuscar;

            tbEmpleados result = new tbEmpleados();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Empl_Id = id };
                result = db.QueryFirstOrDefault<tbEmpleados>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public tbEmpleados Find(string Empl_DNI)
        {
            string sql = ScriptsDatabase.EmpleadosBuscarPorDNI;

            tbEmpleados result = new tbEmpleados();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Empl_DNI };
                result = db.QueryFirstOrDefault<tbEmpleados>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbEmpleados item)
        {
            string sql = ScriptsDatabase.EmpleadosCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Empl_PrimerNombre", item.Empl_PrimerNombre);
                parameter.Add("@Empl_PrimerApellido", item.Empl_PrimerApellido);
                parameter.Add("@Empl_DNI", item.Empl_DNI);
                parameter.Add("@Empl_Sexo", item.Empl_Sexo);
                parameter.Add("@EsCi_Id", item.EsCi_Id);
                parameter.Add("@Empr_Id", item.Empr_Id);
                parameter.Add("@Empl_Creacion", item.Empl_Creacion);
                parameter.Add("@Empl_FechaCreacion", item.Empl_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEmpleados> List()
        {
            string sql = ScriptsDatabase.EmpleadosListar;

            List<tbEmpleados> result = new List<tbEmpleados>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbEmpleados>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbEmpleados item)
        {
            string sql = ScriptsDatabase.EmpleadosActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Empl_Id", item.Empl_Id);
                parameter.Add("@Empl_PrimerNombre", item.Empl_PrimerNombre);
                parameter.Add("@Empl_PrimerApellido", item.Empl_PrimerApellido);
                parameter.Add("@Empl_DNI", item.Empl_DNI);
                parameter.Add("@Empl_Sexo", item.Empl_Sexo);
                parameter.Add("@EsCi_Id", item.EsCi_Id);
                parameter.Add("@Empr_Id", item.Empr_Id);
                parameter.Add("@Empl_Modifica", item.Empl_Modifica);
                parameter.Add("@Empl_FechaModifica", item.Empl_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

    }
}
