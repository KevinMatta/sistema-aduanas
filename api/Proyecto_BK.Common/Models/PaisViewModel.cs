using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class PaisViewModel
    {
        public int Pais_Id { get; set; }
        public string Pais_Descripcion { get; set; }
        public bool? Pais_Estado { get; set; }
        public int Pais_Creacion { get; set; }
        public DateTime Pais_FechaCreacion { get; set; }
        public int? Pais_Modifica { get; set; }
        public DateTime? Pais_FechaModifica { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
