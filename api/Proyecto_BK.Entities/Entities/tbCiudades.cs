﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace sistema_aduana.Entities.Entities
{
    public partial class tbCiudades
    {
        public tbCiudades()
        {
            tbAduanas = new HashSet<tbAduanas>();
            tbComerciantesIndividualesCiud = new HashSet<tbComerciantesIndividuales>();
            tbComerciantesIndividualesCiud_RepresentanteLegalNavigation = new HashSet<tbComerciantesIndividuales>();
            tbPersonasJuridicas = new HashSet<tbPersonasJuridicas>();
            tbPersonasNaturales = new HashSet<tbPersonasNaturales>();
        }

        public int Ciud_Id { get; set; }
        public string Ciud_Descripcion { get; set; }
        public int Esta_Id { get; set; }
        public bool? Ciud_Estado { get; set; }
        public int Ciud_Creacion { get; set; }
        public DateTime Ciud_FechaCreacion { get; set; }
        public int? Ciud_Modifica { get; set; }
        public DateTime? Ciud_FechaModifica { get; set; }

        public virtual tbUsuarios Ciud_CreacionNavigation { get; set; }
        public virtual tbUsuarios Ciud_ModificaNavigation { get; set; }
        public virtual tbEstados Esta { get; set; }
        public virtual ICollection<tbAduanas> tbAduanas { get; set; }
        public virtual ICollection<tbComerciantesIndividuales> tbComerciantesIndividualesCiud { get; set; }
        public virtual ICollection<tbComerciantesIndividuales> tbComerciantesIndividualesCiud_RepresentanteLegalNavigation { get; set; }
        public virtual ICollection<tbPersonasJuridicas> tbPersonasJuridicas { get; set; }
        public virtual ICollection<tbPersonasNaturales> tbPersonasNaturales { get; set; }
    }
}