using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class PersonaNaturalViewModel
    {
        public int PeNa_Id { get; set; }
        public string PeNa_Rtn { get; set; }
        public string PeNa_RtnUrlPdf { get; set; }
        public string PeNa_DNI { get; set; }
        public string PeNa_DNIurlPdf { get; set; }
        public string PeNa_NumReciboPublico { get; set; }
        public string PeNa_NumReciboPublicoUrlPdf { get; set; }
        public int? Ofic_Id { get; set; }
        public int EsCi_Id { get; set; }
        public int Prof_Id { get; set; }
        public int Ciud_Id { get; set; }
        public string PeNa_Direccion { get; set; }
        public string PeNa_TelefonoFijo { get; set; }
        public string PeNa_TelefonoCelular { get; set; }
        public string PeNa_Correo { get; set; }
        public string PeNa_CodigoCorreo { get; set; }
        public string PeNa_CorreoAlternativa { get; set; }
        public string PeNa_CodigoCorreoAlternativa { get; set; }
        public bool? PeNa_Estado { get; set; }
        public int PeNa_Creacion { get; set; }
        public DateTime PeNa_FechaCreacion { get; set; }
        public int? PeNa_Modifica { get; set; }
        public DateTime? PeNa_FechaModifica { get; set; }
        public string PeNa_Nombre { get; set; }
        public string PeNa_Apellido { get; set; }
        [NotMapped]

        public int Adua_Id { get; set; }

    }
}
