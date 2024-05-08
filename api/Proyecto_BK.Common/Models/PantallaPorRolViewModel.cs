using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class PantallaPorRolViewModel
    {
        public int PaRo_Id { get; set; }
        public int Pant_Id { get; set; }
        public int Rol_Id { get; set; }
        public bool? PaRo_Estado { get; set; }
        public int PaRo_Creacion { get; set; }
        public DateTime PaRo_FechaCreacion { get; set; }
        public int? PaRo_Modifica { get; set; }
        public DateTime? PaRo_FechaModifica { get; set; }
    }
}
