using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class ArancelesViewModel
    {
        public int Aran_Id { get; set; }
        public string Aran_Descripcion { get; set; }
        public decimal? Aran_Porcentaje { get; set; }
        public bool? Aran_Estado { get; set; }
        public int Aran_Creacion { get; set; }
        public DateTime Aran_FechaCreacion { get; set; }
        public int? Aran_Modifica { get; set; }
        public DateTime? Aran_FechaModifica { get; set; }
    }
}
