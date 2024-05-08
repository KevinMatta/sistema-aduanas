using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class AduanaViewModel
    {
        public int Adua_Id { get; set; }
        public string Adua_Descripcion { get; set; }
        public bool? Adua_Estado { get; set; }
        public int Adua_Creacion { get; set; }
        public DateTime Adua_FechaCreacion { get; set; }
        public int? Adua_Modifica { get; set; }
        public DateTime? Adua_FechaModifica { get; set; }
        public int? Ciud_Id { get; set; }
        [NotMapped]
        public string Ciud_Descripcion { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
