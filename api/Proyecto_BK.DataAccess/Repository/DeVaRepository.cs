
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
    public class DeVaRepository : IRepository<tbDeclaracionDeValor>
    {
        public RequestStatus Delete(int? id, int usuario, DateTime fecha)
        {
            string sql = ScriptsDatabase.AduanasEliminar;
            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Adua_Id", id);
                parametro.Add("@Adua_Modifica", usuario);
                parametro.Add("@Adua_FechaModifica", fecha);

                var result = db.Execute(
                    sql, parametro,
                    commandType: CommandType.StoredProcedure
                );

                string mensaje = (result == 1) ? "exito" : "error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            };
        }

        public tbDeclaracionDeValor Find(int? id)
        {
            string sql = ScriptsDatabase.AduanasBuscar;

            tbDeclaracionDeValor result = new tbDeclaracionDeValor();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameters = new { Adua_Id = id };
                result = db.QueryFirstOrDefault<tbDeclaracionDeValor>(sql, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public RequestStatus Insert(tbDeclaracionDeValor item)
        {
            string sql = "Adua.sp_DeclaracionDeValor_crear";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@DeVa_AduanaIngreso", item.DeVa_AduanaIngreso);
                parameter.Add("@DeVa_AduanaDespacho", item.DeVa_AduanaDespacho);
                parameter.Add("@DeVa_FechaAceptacion", item.DeVa_FechaAceptacion);
                parameter.Add("@DeVa_RtnImportador", item.DeVa_RtnImportador);
                parameter.Add("@DeVa_LugarEntrega", item.DeVa_LugarEntrega);
                parameter.Add("@DeVa_PaisEntrega", item.DeVa_PaisEntrega);
                parameter.Add("@DeVa_NumeroContrado", item.DeVa_NumeroContrado);
                parameter.Add("@DeVa_FechaContrado", item.DeVa_FechaContrado);
                parameter.Add("@DeVa_PaisEmbarque", item.DeVa_PaisEmbarque);
                parameter.Add("@Deva_LugarEmbarque", item.Deva_LugarEmbarque);
                parameter.Add("@DeVa_PaisExportacion", item.DeVa_PaisExportacion);
                parameter.Add("@DeVa_FechaExportacion", item.DeVa_FechaExportacion);
                parameter.Add("@DeVa_Restricciones", item.DeVa_Restricciones);
                parameter.Add("@DeVa_CondicionContraprestacion", item.DeVa_CondicionContraprestacion);
                parameter.Add("@DeVa_MontoReversion", item.DeVa_MontoReversion);
                parameter.Add("@DeVa_TipoVinculacion", item.DeVa_TipoVinculacion);
                parameter.Add("@DeVa_InfluenciaPrecio", item.DeVa_InfluenciaPrecio);
                parameter.Add("@DeVa_PagosIndirectosDescuentos", item.DeVa_PagosIndirectosDescuentos);
                parameter.Add("@DeVa_CanonDerechosLicencia", item.DeVa_CanonDerechosLicencia);
                parameter.Add("@DeVa_PrecioFactura", item.DeVa_PrecioFactura);
                parameter.Add("@DeVa_PagosIndirectosDescuentosRetroactivos", item.DeVa_PagosIndirectosDescuentosRetroactivos);
                parameter.Add("@DeVa_PrecioRealPagado", item.DeVa_PrecioRealPagado);
                parameter.Add("@DeVa_MontoCondicionContraprestacion", item.DeVa_MontoCondicionContraprestacion);
                parameter.Add("@DeVa_MontoReversionCasilla", item.DeVa_MontoReversionCasilla);
                parameter.Add("@DeVa_GastosComisiones", item.DeVa_GastosComisiones);
                parameter.Add("@DeVa_GastosEnvasesEmbalajes", item.DeVa_GastosEnvasesEmbalajes);
                parameter.Add("@DeVa_ValorMaterialesConsumidos", item.DeVa_ValorMaterialesConsumidos);
                parameter.Add("@DeVa_ValorHerramientas", item.DeVa_ValorHerramientas);
                parameter.Add("@DeVa_ValorMaterialesConsumidos2", item.DeVa_ValorMaterialesConsumidos2);
                parameter.Add("@DeVa_ValorIngenieriaCreacion", item.DeVa_ValorIngenieriaCreacion);
                parameter.Add("@DeVa_ValorCanoDerechosLicencia", item.DeVa_ValorCanoDerechosLicencia);
                parameter.Add("@DeVa_GastosTransporteMercaderia", item.DeVa_GastosTransporteMercaderia);
                parameter.Add("@DeVa_GastosCargaDescarga", item.DeVa_GastosCargaDescarga);
                parameter.Add("@DeVa_CostosSeguro", item.DeVa_CostosSeguro);
                parameter.Add("@DeVa_TotalAjustes", item.DeVa_TotalAjustes);
                parameter.Add("@DeVa_GastosConstruccionArmado", item.DeVa_GastosConstruccionArmado);
                parameter.Add("@DeVa_CostosTransportePosterior", item.DeVa_CostosTransportePosterior);
                parameter.Add("@DeVa_DerechosImpuestos", item.DeVa_DerechosImpuestos);
                parameter.Add("@DeVa_MontoIntereses", item.DeVa_MontoIntereses);
                parameter.Add("@DeVa_OtrasDeducciones", item.DeVa_OtrasDeducciones);
                parameter.Add("@DeVa_TotalDeducciones", item.DeVa_TotalDeducciones);
                parameter.Add("@DeVa_ValorAduana", item.DeVa_ValorAduana);
                parameter.Add("@DeVa_Creacion", item.DeVa_Creacion);
                parameter.Add("@DeVa_FechaCreacion", DateTime.Now);

                try
                {
                    var result = db.QueryFirstOrDefault<int>(sql, parameter, commandType: CommandType.StoredProcedure);
                    string mensaje = (result != -1) ? "exito" : "error";
                    return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
                }
                catch (Exception ex)
                {
                    // Log the exception
                    Console.WriteLine(ex.Message);
                    return new RequestStatus { CodeStatus = -1, MessageStatus = "error" };
                }
            }
        }

        public IEnumerable<tbDeclaracionDeValor> List()
        {
            string sql = "[Adua].[sp_Aranceles_listar]";

            List<tbDeclaracionDeValor> result = new List<tbDeclaracionDeValor>();

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                result = db.Query<tbDeclaracionDeValor>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public RequestStatus Update(tbDeclaracionDeValor item)
        {
            string sql = "Adua.sp_Aranceles_actualizar";

            using (var db = new SqlConnection(sistema_aduanaContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                //parameter.Add("@Aran_Id", item.Aran_Id);
                //parameter.Add("@Aran_Descripcion", item.Aran_Descripcion);
                //parameter.Add("@Aran_Porcentaje", item.Aran_Porcentaje);
                //parameter.Add("@Aran_Modifica", item.Aran_Modifica);
                //parameter.Add("@Aran_FechaModifica", item.Aran_FechaModifica);

                try
                {
                    var result = db.QueryFirstOrDefault<int>(sql, parameter, commandType: CommandType.StoredProcedure);
                    string mensaje = (result == 1) ? "exito" : "error";
                    return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
                }
                catch (Exception ex)
                {
                    // Log the exception
                    Console.WriteLine(ex.Message);
                    return new RequestStatus { CodeStatus = -1, MessageStatus = "error" };
                }
            }
        }
    }
}
