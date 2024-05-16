﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace sistema_aduana.Entities.Entities
{
    public partial class tbAduanas
    {
        public tbAduanas()
        {
            tbComerciantesIndividuales = new HashSet<tbComerciantesIndividuales>();
            tbPersonasNaturales = new HashSet<tbPersonasNaturales>();
        }

        public int Adua_Id { get; set; }
        public string Adua_Descripcion { get; set; }
        public bool? Adua_Estado { get; set; }
        public int Adua_Creacion { get; set; }
        public DateTime Adua_FechaCreacion { get; set; }
        public int? Adua_Modifica { get; set; }
        public DateTime? Adua_FechaModifica { get; set; }
        public int? Ciud_Id { get; set; }

        public virtual tbUsuarios Adua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Adua_ModificaNavigation { get; set; }
        public virtual tbCiudades Ciud { get; set; }
        public virtual ICollection<tbComerciantesIndividuales> tbComerciantesIndividuales { get; set; }
        public virtual ICollection<tbPersonasNaturales> tbPersonasNaturales { get; set; }
    }
}