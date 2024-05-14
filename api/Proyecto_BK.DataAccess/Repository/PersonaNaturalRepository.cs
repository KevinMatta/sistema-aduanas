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
    public class PersonaNaturalRepository : IRepository<tbPersonasNaturales>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.PersonasNaturalesEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PeNa_Id", id);
                parameter.Add("@PeNa_Modifica", usuario);
                parameter.Add("@PeNa_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parameter,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            };
        }

        public tbPersonasNaturales Find(int? PeNa_Id)
        {
            string sql = ScriptsDatabase.PersonasNaturalesBuscar;

            tbPersonasNaturales result = new tbPersonasNaturales();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { PeNa_Id };
                result = db.QueryFirstOrDefault<tbPersonasNaturales>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public tbPersonasNaturales Find(string PeNa_DNI)
        {
            string sql = ScriptsDatabase.PersonasNaturalesBuscarPorDNI;

            tbPersonasNaturales result = new tbPersonasNaturales();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { PeNa_DNI };
                result = db.QueryFirstOrDefault<tbPersonasNaturales>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPersonasNaturales item)
        {
            string sql = ScriptsDatabase.PersonasNaturalesCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PeNa_Nombre", item.PeNa_Nombre);
                parameter.Add("@PeNa_Apellido", item.PeNa_Apellido);
                parameter.Add("@PeNa_Rtn", item.PeNa_Rtn);
                parameter.Add("@PeNa_RtnUrlPdf", item.PeNa_RtnUrlPdf);
                parameter.Add("@PeNa_DNI", item.PeNa_DNI);
                parameter.Add("@PeNa_DNIurlPdf", item.PeNa_DNIurlPdf);
                parameter.Add("@PeNa_NumReciboPublico", item.PeNa_NumReciboPublico);
                parameter.Add("@PeNa_NumReciboPublicoUrlPdf", item.PeNa_NumReciboPublicoUrlPdf);
                parameter.Add("@Adua_Id", item.Adua_Id);
                parameter.Add("@EsCi_Id", item.EsCi_Id);
                parameter.Add("@Prof_Id", item.Prof_Id);
                parameter.Add("@Ciud_Id", item.Ciud_Id);
                parameter.Add("@PeNa_Direccion", item.PeNa_Direccion);
                parameter.Add("@PeNa_TelefonoFijo", item.PeNa_TelefonoFijo);
                parameter.Add("@PeNa_TelefonoCelular", item.PeNa_TelefonoCelular);
                parameter.Add("@PeNa_Correo", item.PeNa_Correo);
                parameter.Add("@PeNa_CodigoCorreo", item.PeNa_CodigoCorreo);
                parameter.Add("@PeNa_CorreoAlternativa", item.PeNa_CorreoAlternativa);
                parameter.Add("@PeNa_CodigoCorreoAlternativa", item.PeNa_CodigoCorreoAlternativa);
                parameter.Add("@PeNa_Creacion", item.PeNa_Creacion);
                parameter.Add("@PeNa_FechaCreacion", item.PeNa_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPersonasNaturales> List()
        {
            string sql = ScriptsDatabase.PersonasNaturalesListar;

            List<tbPersonasNaturales> result = new List<tbPersonasNaturales>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbPersonasNaturales>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbPersonasNaturales item)
        {
            string sql = ScriptsDatabase.PersonasNaturalesActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PeNa_Id", item.PeNa_Id);
                parameter.Add("@PeNa_Nombre", item.PeNa_Nombre);
                parameter.Add("@PeNa_Apellido", item.PeNa_Apellido);
                parameter.Add("@PeNa_Rtn", item.PeNa_Rtn);
                parameter.Add("@PeNa_RtnUrlPdf", item.PeNa_RtnUrlPdf);
                parameter.Add("@PeNa_DNI", item.PeNa_DNI);
                parameter.Add("@PeNa_DNIurlPdf", item.PeNa_DNIurlPdf);
                parameter.Add("@PeNa_NumReciboPublico", item.PeNa_NumReciboPublico);
                parameter.Add("@PeNa_NumReciboPublicoUrlPdf", item.PeNa_NumReciboPublicoUrlPdf);
                parameter.Add("@Ofic_Id", item.Ofic_Id);
                parameter.Add("@EsCi_Id", item.EsCi_Id);
                parameter.Add("@Prof_Id", item.Prof_Id);
                parameter.Add("@Ciud_Id", item.Ciud_Id);
                parameter.Add("@PeNa_Direccion", item.PeNa_Direccion);
                parameter.Add("@PeNa_TelefonoFijo", item.PeNa_TelefonoFijo);
                parameter.Add("@PeNa_TelefonoCelular", item.PeNa_TelefonoCelular);
                parameter.Add("@PeNa_Correo", item.PeNa_Correo);
                parameter.Add("@PeNa_CodigoCorreo", item.PeNa_CodigoCorreo);
                parameter.Add("@PeNa_CorreoAlternativa", item.PeNa_CorreoAlternativa);
                parameter.Add("@PeNa_CodigoCorreoAlternativa", item.PeNa_CodigoCorreoAlternativa);
                parameter.Add("@PeNa_Modifica", item.PeNa_Modifica);
                parameter.Add("@PeNa_FechaModifica", item.PeNa_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
        public RequestStatus ActualizarCodigoVerificacion(string PeNa_Id, string codigo)
        {
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("PeNa_Id", PeNa_Id);
                parametro.Add("PeNa_CodigoVerificacion", codigo);

                var result = db.QueryFirst(ScriptsDatabase.PersonasNaturalesPIN,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                return new RequestStatus { CodeStatus = result.Resultado };
            }
        }

    }
}
