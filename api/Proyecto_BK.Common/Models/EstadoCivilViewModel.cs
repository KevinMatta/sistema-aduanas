using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class EstadoCivilViewModel
    {
        public int EsCi_Id { get; set; }
        public string EsCi_Descripcion { get; set; }
        public bool? EsCi_Estado { get; set; }
        public int EsCi_Creacion { get; set; }
        public DateTime EsCi_FechaCreacion { get; set; }
        public int? EsCi_Modifica { get; set; }
        public DateTime? EsCi_FechaModifica { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
