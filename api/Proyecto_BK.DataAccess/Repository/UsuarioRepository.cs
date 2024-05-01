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
    public class UsuarioRepository : IRepository<tbUsuarios>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbUsuarios> Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
    }
}
