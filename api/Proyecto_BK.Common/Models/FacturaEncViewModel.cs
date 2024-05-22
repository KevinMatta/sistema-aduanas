using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class FacturaEncViewModel
    {
        public int Fact_Id { get; set; }
        public string Fact_NumeroFactura { get; set; }
        public DateTime? Fact_Fecha { get; set; }
        public int Deva_Id { get; set; }
        public bool? Fact_Estado { get; set; }
        public int Fact_Creacion { get; set; }
        public int? Fact_Modifica { get; set; }
    }
}
