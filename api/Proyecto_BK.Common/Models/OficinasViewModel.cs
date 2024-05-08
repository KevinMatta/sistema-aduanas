using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class OficinasViewModel
    {
        public int Ofic_Id { get; set; }
        public string Ofic_Descripcion { get; set; }
        public int Adua_Id { get; set; }
        public bool? Ofic_Estado { get; set; }
        public int Ofic_Creacion { get; set; }
        public DateTime Ofic_FechaCreacion { get; set; }
        public int? Ofic_Modifica { get; set; }
        public DateTime? Ofic_FechaModifica { get; set; }
        [NotMapped]
        public string Adua_Descripcion { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
