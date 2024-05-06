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
   public class PantallaRepository
    {
        public IEnumerable<tbPantallas> List()
        {
            string sql = ScriptsDatabase.PantallasListar;

            List<tbPantallas> result = new List<tbPantallas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbPantallas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }
        public IEnumerable<tbEsquemas> ListEsqu()
        {
            string sql = ScriptsDatabase.EsquemasListar;

            List<tbEsquemas> result = new List<tbEsquemas>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbEsquemas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }
    }
}
