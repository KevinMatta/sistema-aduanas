using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class EmpleadoViewModel
    {
        public int Empl_Id { get; set; }
        public string Empl_DNI { get; set; }
        public string Empl_PrimerNombre { get; set; }
        public string Empl_PrimerApellido { get; set; }
        public string Empl_Sexo { get; set; }
        public int EsCi_Id { get; set; }
        public int Empr_Id { get; set; }
        public bool? Empl_Estado { get; set; }
        public int Empl_Creacion { get; set; }
        public DateTime Empl_FechaCreacion { get; set; }
        public int? Empl_Modifica { get; set; }
        public DateTime? Empl_FechaModifica { get; set; }
        public string Empl_Email { get; set; }

        [NotMapped]
        public string Usua_Usuario { get; set; }
        [NotMapped]
        public string EsCi_Descripcion { get; set; }
        [NotMapped]
        public string Empr_Descripcion { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
