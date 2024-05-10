﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class ComercianteIndividualViewModel
    {
        public int CoIn_Id { get; set; }
        public string CoIn_RtnSolicitante { get; set; }
        public int PeNa_Id { get; set; }
        public string CoIn_Aldea { get; set; }
        public string CoIn_CalleYavenida { get; set; }
        public string CoIn_BarrioOcolonia { get; set; }
        public string CoIn_EdificioYnum { get; set; }
        public string CoIn_PuntosDeReferencia { get; set; }
        public string CoIn_Declaracion { get; set; }
        public bool? CoIn_RepresentanteLegal { get; set; }
        public int? EsCi_RepresentanteLegal { get; set; }
        public int? Prof_RepresentanteLegal { get; set; }
        public int? Ciud_RepresentanteLegal { get; set; }
        public string CoIn_AldeaRepresentanteLegal { get; set; }
        public string CoIn_CalleYavenidaRepresentanteLegal { get; set; }
        public string CoIn_BarrioOcoloniaRepresentanteLegal { get; set; }
        public string CoIn_EdificioYnumRepresentanteLegal { get; set; }
        public string CoIn_PuntosDeReferenciaRepresentanteLegal { get; set; }
        public string CoIn_RtnRepresentanteLegal { get; set; }
        public string CoIn_DNIRepresentanteLegal { get; set; }
        public bool? CoIn_Estado { get; set; }
        public int CoIn_Creacion { get; set; }
        public DateTime CoIn_FechaCreacion { get; set; }
        public int? CoIn_Modifica { get; set; }
        public DateTime? CoIn_FechaModifica { get; set; }
    }
}