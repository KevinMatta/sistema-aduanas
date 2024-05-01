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
    public class EmpresaRepository
    {
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
    }
}
