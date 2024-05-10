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
    public class ComercianteIndividualRepository : IRepository<tbComerciantesIndividuales>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.ComercianteIndividualEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@CoIn_Id", id);
                parameter.Add("@CoIn_Modifica", usuario);
                parameter.Add("@CoIn_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parameter,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            };
        }

        public tbComerciantesIndividuales Find(int? CoIn_Id)
        {
            string sql = ScriptsDatabase.ComercianteIndividualBuscar;

            tbComerciantesIndividuales result = new tbComerciantesIndividuales();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { CoIn_Id };
                result = db.QueryFirstOrDefault<tbComerciantesIndividuales>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbComerciantesIndividuales item)
        {
            string sql = ScriptsDatabase.ComercianteIndividualCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@CoIn_RtnSolicitante", item.CoIn_RtnSolicitante);
                parameter.Add("@PeNa_Id", item.PeNa_Id);
                parameter.Add("@CoIn_Aldea", item.CoIn_Aldea);
                parameter.Add("@CoIn_CalleYavenida", item.CoIn_CalleYavenida);
                parameter.Add("@CoIn_BarrioOcolonia", item.CoIn_BarrioOcolonia);
                parameter.Add("@CoIn_EdificioYnum", item.CoIn_EdificioYnum);
                parameter.Add("@CoIn_PuntosDeReferencia", item.CoIn_PuntosDeReferencia);
                parameter.Add("@CoIn_Declaracion", item.CoIn_Declaracion);
                parameter.Add("@CoIn_RepresentanteLegal", item.CoIn_RepresentanteLegal);
                parameter.Add("@EsCi_RepresentanteLegal", item.EsCi_RepresentanteLegal);
                parameter.Add("@Prof_RepresentanteLegal", item.Prof_RepresentanteLegal);
                parameter.Add("@Ciud_RepresentanteLegal", item.Ciud_RepresentanteLegal);
                parameter.Add("@CoIn_AldeaRepresentanteLegal", item.CoIn_AldeaRepresentanteLegal);
                parameter.Add("@CoIn_CalleYavenidaRepresentanteLegal", item.CoIn_CalleYavenidaRepresentanteLegal);
                parameter.Add("@CoIn_BarrioOcoloniaRepresentanteLegal", item.CoIn_BarrioOcoloniaRepresentanteLegal);
                parameter.Add("@CoIn_EdificioYnumRepresentanteLegal", item.CoIn_EdificioYnumRepresentanteLegal);
                parameter.Add("@CoIn_PuntosDeReferenciaRepresentanteLegal", item.CoIn_PuntosDeReferenciaRepresentanteLegal);
                parameter.Add("@CoIn_RtnRepresentanteLegal", item.CoIn_RtnRepresentanteLegal);
                parameter.Add("@CoIn_DNIRepresentanteLegal", item.CoIn_DNIRepresentanteLegal);
                parameter.Add("@CoIn_Creacion", item.CoIn_Creacion);
                parameter.Add("@CoIn_FechaCreacion", item.CoIn_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbComerciantesIndividuales> List()
        {
            string sql = ScriptsDatabase.ComercianteIndividualListar;

            List<tbComerciantesIndividuales> result = new List<tbComerciantesIndividuales>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbComerciantesIndividuales>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbComerciantesIndividuales item)
        {
            string sql = ScriptsDatabase.ComercianteIndividualActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@CoIn_Id", item.CoIn_Id);
                parameter.Add("@CoIn_RtnSolicitante", item.CoIn_RtnSolicitante);
                parameter.Add("@PeNa_Id", item.PeNa_Id);
                parameter.Add("@CoIn_Aldea", item.CoIn_Aldea);
                parameter.Add("@CoIn_CalleYavenida", item.CoIn_CalleYavenida);
                parameter.Add("@CoIn_BarrioOcolonia", item.CoIn_BarrioOcolonia);
                parameter.Add("@CoIn_EdificioYnum", item.CoIn_EdificioYnum);
                parameter.Add("@CoIn_PuntosDeReferencia", item.CoIn_PuntosDeReferencia);
                parameter.Add("@CoIn_Declaracion", item.CoIn_Declaracion);
                parameter.Add("@CoIn_RepresentanteLegal", item.CoIn_RepresentanteLegal);
                parameter.Add("@EsCi_RepresentanteLegal", item.EsCi_RepresentanteLegal);
                parameter.Add("@Prof_RepresentanteLegal", item.Prof_RepresentanteLegal);
                parameter.Add("@Ciud_RepresentanteLegal", item.Ciud_RepresentanteLegal);
                parameter.Add("@CoIn_AldeaRepresentanteLegal", item.CoIn_AldeaRepresentanteLegal);
                parameter.Add("@CoIn_CalleYavenidaRepresentanteLegal", item.CoIn_CalleYavenidaRepresentanteLegal);
                parameter.Add("@CoIn_BarrioOcoloniaRepresentanteLegal", item.CoIn_BarrioOcoloniaRepresentanteLegal);
                parameter.Add("@CoIn_EdificioYnumRepresentanteLegal", item.CoIn_EdificioYnumRepresentanteLegal);
                parameter.Add("@CoIn_PuntosDeReferenciaRepresentanteLegal", item.CoIn_PuntosDeReferenciaRepresentanteLegal);
                parameter.Add("@CoIn_RtnRepresentanteLegal", item.CoIn_RtnRepresentanteLegal);
                parameter.Add("@CoIn_DNIRepresentanteLegal", item.CoIn_DNIRepresentanteLegal);
                parameter.Add("@CoIn_Modifica", item.CoIn_Modifica);
                parameter.Add("@CoIn_FechaModifica", item.CoIn_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }

    }
}
