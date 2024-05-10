using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class UsuarioViewModel
    {
        public int Usua_Id { get; set; }
        public string Usua_Usuario { get; set; }
        public string Usua_Clave { get; set; }
        public int? Rol_Id { get; set; }
        public bool? Usua_IsAdmin { get; set; }
        public bool? Usua_Estado { get; set; }
        public int Usua_Creacion { get; set; }
        public DateTime Usua_FechaCreacion { get; set; }
        public int? Usua_Modifica { get; set; }
        public DateTime? Usua_FechaModifica { get; set; }
        [NotMapped]
        public string Rol_Descripcion { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }
    }
}
