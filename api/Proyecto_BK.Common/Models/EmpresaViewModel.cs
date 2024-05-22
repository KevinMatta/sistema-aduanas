using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class EmpresaViewModel
    {
        public int Empr_Id { get; set; }
        public string Empr_Descripcion { get; set; }
        public int? Ciud_Id { get; set; }
        public bool? Empr_Estado { get; set; }
        public int Empr_Creacion { get; set; }
        public DateTime Empr_FechaCreacion { get; set; }
        public int? Empr_Modifica { get; set; }
        public DateTime? Empr_FechaModifica { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
