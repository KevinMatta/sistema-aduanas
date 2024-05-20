using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    class BoletinDePagoViewModel
    {
        public int BoPa_Id { get; set; }
        public int? DeVa_Id { get; set; }
        public string BoPa_Liquidacion { get; set; }
        public string BoPa_NumeroDeclaracion { get; set; }
        public string BoPa_TipoLiquidacion { get; set; }
        public DateTime? BoPa_FechaEmision { get; set; }
        public string BoPa_TipoEstado { get; set; }
        public string BoPa_Observaciones { get; set; }
        public string BoPa_Preimpreso { get; set; }
        public string BoPa_Declarante { get; set; }
        public bool? BoPa_Estado { get; set; }
        public int BoPa_Creacion { get; set; }
        public DateTime BoPa_FechaCreacion { get; set; }
        public int? BoPa_Modifica { get; set; }
        public DateTime? BoPa_FechaModifica { get; set; }
    }
}
