using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class RolViewModel
    {
        public int Rol_Id { get; set; }
        public string Rol_Descripcion { get; set; }
        public bool? Rol_Estado { get; set; }
        public int Rol_Creacion { get; set; }
        public DateTime Rol_FechaCreacion { get; set; }
        public int? Rol_Modifica { get; set; }
        public DateTime? Rol_FechaModifica { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
        [NotMapped]
        public List<int> pantallasPorAgregar { get; set; }
    }
}
