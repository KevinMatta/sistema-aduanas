using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class CiudadViewModel
    {
        public int Ciud_Id { get; set; }
        public string Ciud_Descripcion { get; set; }
        public int Esta_Id { get; set; }
        public bool? Ciud_Estado { get; set; }
        public int Ciud_Creacion { get; set; }
        public DateTime Ciud_FechaCreacion { get; set; }
        public int? Ciud_Modifica { get; set; }
        public DateTime? Ciud_FechaModifica { get; set; }
        [NotMapped]
        public string Esta_Descripcion { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
