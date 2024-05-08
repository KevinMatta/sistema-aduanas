using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class PantallaViewModel
    {
        public int Pant_Id { get; set; }
        public string Pant_Descripcion { get; set; }
        public bool? Pant_Estado { get; set; }
        public int Pant_Creacion { get; set; }
        public DateTime Pant_FechaCreacion { get; set; }
        public int? Pant_Modifica { get; set; }
        public DateTime? Pant_FechaModifica { get; set; }
        [NotMapped]
        public int Esqu_Id { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
