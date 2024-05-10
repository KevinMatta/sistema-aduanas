using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class PersonaJuridicaViewModel
    {
        public int PeJu_Id { get; set; }
        public string PeJu_RtnSolicitante { get; set; }
        public string PeJu_Aldea { get; set; }
        public string PeJu_CalleYavenida { get; set; }
        public string PeJu_BarrioOcolonia { get; set; }
        public string PeJu_EdificioYnum { get; set; }
        public string PeJu_PuntosDeReferencia { get; set; }
        public string PeJu_Escritura { get; set; }
        public int PeNa_Id { get; set; }
        public int? EsCi_RepresentanteLegal { get; set; }
        public int? Prof_RepresentanteLegal { get; set; }
        public int? Ciud_RepresentanteLegal { get; set; }
        public string PeJu_AldeaRepresentanteLegal { get; set; }
        public string PeJu_CalleYavenidaRepresentanteLegal { get; set; }
        public string PeJu_BarrioOcoloniaRepresentanteLegal { get; set; }
        public string PeJu_EdificioYnumRepresentanteLegal { get; set; }
        public string PeJu_PuntosDeReferenciaRepresentanteLegal { get; set; }
        public string PeJu_RtnRepresentanteLegal { get; set; }
        public string PeJu_DNIRepresentanteLegal { get; set; }
        public bool? PeJu_Estado { get; set; }
        public int PeJu_Creacion { get; set; }
        public DateTime PeJu_FechaCreacion { get; set; }
        public int? PeJu_Modifica { get; set; }
        public DateTime? PeJu_FechaModifica { get; set; }
    }
}
