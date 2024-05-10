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
    public class PersonaJuridicaRepository : IRepository<tbPersonasJuridicas>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.PersonasJuridicasEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PeJu_Id", id);
                parameter.Add("@PeJu_Modifica", usuario);
                parameter.Add("@PeJu_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parameter,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            };
        }

        public tbPersonasJuridicas Find(int? PeJu_Id)
        {
            string sql = ScriptsDatabase.PersonasJuridicasBuscar;

            tbPersonasJuridicas result = new tbPersonasJuridicas();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { PeJu_Id };
                result = db.QueryFirstOrDefault<tbPersonasJuridicas>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbPersonasJuridicas item)
        {
            string sql = ScriptsDatabase.PersonasJuridicasCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PeJu_RtnSolicitante", item.PeJu_RtnSolicitante);
                parameter.Add("@PeJu_Aldea", item.PeJu_Aldea);
                parameter.Add("@PeJu_CalleYavenida", item.PeJu_CalleYavenida);
                parameter.Add("@PeJu_BarrioOcolonia", item.PeJu_BarrioOcolonia);
                parameter.Add("@PeJu_EdificioYnum", item.PeJu_EdificioYnum);
                parameter.Add("@PeJu_PuntosDeReferencia", item.PeJu_PuntosDeReferencia);
                parameter.Add("@PeJu_Escritura", item.PeJu_Escritura);
                parameter.Add("@PeNa_Id", item.PeNa_Id);
                parameter.Add("@EsCi_RepresentanteLegal", item.EsCi_RepresentanteLegal);
                parameter.Add("@Prof_RepresentanteLegal", item.Prof_RepresentanteLegal);
                parameter.Add("@Ciud_RepresentanteLegal", item.Ciud_RepresentanteLegal);
                parameter.Add("@PeJu_AldeaRepresentanteLegal", item.PeJu_AldeaRepresentanteLegal);
                parameter.Add("@PeJu_CalleYavenidaRepresentanteLegal", item.PeJu_CalleYavenidaRepresentanteLegal);
                parameter.Add("@PeJu_BarrioOcoloniaRepresentanteLegal", item.PeJu_BarrioOcoloniaRepresentanteLegal);
                parameter.Add("@PeJu_EdificioYnumRepresentanteLegal", item.PeJu_EdificioYnumRepresentanteLegal);
                parameter.Add("@PeJu_PuntosDeReferenciaRepresentanteLegal", item.PeJu_PuntosDeReferenciaRepresentanteLegal);
                parameter.Add("@PeJu_RtnRepresentanteLegal", item.PeJu_RtnRepresentanteLegal);
                parameter.Add("@PeJu_DNIRepresentanteLegal", item.PeJu_DNIRepresentanteLegal);
                parameter.Add("@PeJu_Creacion", item.PeJu_Creacion);
                parameter.Add("@PeJu_FechaCreacion", item.PeJu_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPersonasJuridicas> List()
        {
            string sql = ScriptsDatabase.PersonasJuridicasListar;

            List<tbPersonasJuridicas> result = new List<tbPersonasJuridicas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbPersonasJuridicas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbPersonasJuridicas item)
        {
            string sql = ScriptsDatabase.PersonasJuridicasActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PeJu_Id", item.PeJu_Id);
                parameter.Add("@PeJu_RtnSolicitante", item.PeJu_RtnSolicitante);
                parameter.Add("@PeJu_Aldea", item.PeJu_Aldea);
                parameter.Add("@PeJu_CalleYavenida", item.PeJu_CalleYavenida);
                parameter.Add("@PeJu_BarrioOcolonia", item.PeJu_BarrioOcolonia);
                parameter.Add("@PeJu_EdificioYnum", item.PeJu_EdificioYnum);
                parameter.Add("@PeJu_PuntosDeReferencia", item.PeJu_PuntosDeReferencia);
                parameter.Add("@PeJu_Escritura", item.PeJu_Escritura);
                parameter.Add("@PeNa_Id", item.PeNa_Id);
                parameter.Add("@EsCi_RepresentanteLegal", item.EsCi_RepresentanteLegal);
                parameter.Add("@Prof_RepresentanteLegal", item.Prof_RepresentanteLegal);
                parameter.Add("@Ciud_RepresentanteLegal", item.Ciud_RepresentanteLegal);
                parameter.Add("@PeJu_AldeaRepresentanteLegal", item.PeJu_AldeaRepresentanteLegal);
                parameter.Add("@PeJu_CalleYavenidaRepresentanteLegal", item.PeJu_CalleYavenidaRepresentanteLegal);
                parameter.Add("@PeJu_BarrioOcoloniaRepresentanteLegal", item.PeJu_BarrioOcoloniaRepresentanteLegal);
                parameter.Add("@PeJu_EdificioYnumRepresentanteLegal", item.PeJu_EdificioYnumRepresentanteLegal);
                parameter.Add("@PeJu_PuntosDeReferenciaRepresentanteLegal", item.PeJu_PuntosDeReferenciaRepresentanteLegal);
                parameter.Add("@PeJu_RtnRepresentanteLegal", item.PeJu_RtnRepresentanteLegal);
                parameter.Add("@PeJu_DNIRepresentanteLegal", item.PeJu_DNIRepresentanteLegal);
                parameter.Add("@PeJu_Modifica", item.PeJu_Modifica);
                parameter.Add("@PeJu_FechaModifica", item.PeJu_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

    }
}
