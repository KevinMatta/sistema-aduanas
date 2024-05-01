using Dapper;
using Microsoft.Data.SqlClient;
using sistema_aduana.DataAcces;
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
    public class PaisRepository
    {
        public IEnumerable<tbPaises> List()
        {
            string sql = ScriptsDatabase.PaisesListar;

            List<tbPaises> result = new List<tbPaises>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbPaises>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }
    }
}
