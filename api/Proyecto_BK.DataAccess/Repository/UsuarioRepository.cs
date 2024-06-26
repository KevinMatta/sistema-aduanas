﻿using Dapper;
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
    public class UsuarioRepository : IRepository<tbUsuarios>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.UsuariosEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Usua_Id", id);
                parametro.Add("@Usua_Modifica", usuario);
                parametro.Add("@Usua_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            };
        }

        public tbUsuarios Find(int? Usua_Id)
        {
            string sql = ScriptsDatabase.UsuariosBuscar;

            tbUsuarios result = new tbUsuarios();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Usua_Id };
                result = db.QueryFirstOrDefault<tbUsuarios>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            string sql = ScriptsDatabase.UsuariosCrear;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Usua_Usuario", item.Usua_Usuario);
                parameter.Add("@Usua_Clave", item.Usua_Clave);
                parameter.Add("@Rol_Id", item.Rol_Id);
                parameter.Add("@Usua_IsAdmin", item.Usua_IsAdmin);
                parameter.Add("@Usua_Creacion", item.Usua_Creacion);
                parameter.Add("@Usua_FechaCreacion", item.Usua_FechaCreacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbUsuarios> List()
        {
            string sql = ScriptsDatabase.UsuariosListar;

            List<tbUsuarios> result = new List<tbUsuarios>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbUsuarios>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbUsuarios item)
        {
            string sql = ScriptsDatabase.UsuariosActualizar;

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Usua_Id", item.Usua_Id);
                parameter.Add("@Usua_Usuario", item.Usua_Usuario);
                parameter.Add("@Usua_IsAdmin", item.Usua_IsAdmin);
                parameter.Add("@Rol_Id", item.Rol_Id);
                parameter.Add("@Usua_Modifica", item.Usua_Modifica);
                parameter.Add("@Usua_FechaModifica", item.Usua_FechaModifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
    }
}
