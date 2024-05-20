using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class FacturaDetalleViewModel
    {
        public int FaDe_Id { get; set; }
        public int? Fact_Id { get; set; }
        public int? Item_Id { get; set; }
        public int? FaDe_NumeroItem { get; set; }
        public int? FaDe_Cantidad { get; set; }
        public string FaDe_UnidadMedida { get; set; }
        public string FaDe_Caracteristicas { get; set; }
        public int? Pais_Id { get; set; }
        public decimal? FaDe_ValorUnitario { get; set; }
        public decimal? FaDe_TotalFactura { get; set; }
        public bool? FaDe_Estado { get; set; }
        public int FaDe_Creacion { get; set; }
        public DateTime FaDe_FechaCreacion { get; set; }
        public int? FaDe_Modifica { get; set; }
        public DateTime? FaDe_FechaModifica { get; set; }
    }
}
