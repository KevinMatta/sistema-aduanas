using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class ProfesionViewModel
    {
        public int Prof_Id { get; set; }
        public string Prof_Descripcion { get; set; }
        public bool? Prof_Estado { get; set; }
        public int Prof_Creacion { get; set; }
        public DateTime Prof_FechaCreacion { get; set; }
        public int? Prof_Modifica { get; set; }
        public DateTime? Prof_FechaModifica { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
