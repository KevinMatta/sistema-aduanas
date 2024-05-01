using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class EstadoViewModel
    {
        public int Esta_Id { get; set; }
        public string Esta_Descripcion { get; set; }
        public int? Pais_Id { get; set; }
        public bool? Esta_Estado { get; set; }
        public int Esta_Creacion { get; set; }
        public DateTime Esta_FechaCreacion { get; set; }
        public int? Esta_Modifica { get; set; }
        public DateTime? Esta_FechaModifica { get; set; }
        [NotMapped]
        public string Pais_Descripcion { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
