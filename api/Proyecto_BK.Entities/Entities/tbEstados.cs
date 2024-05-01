﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace sistema_aduana.Entities.Entities
{
    public partial class tbEstados
    {
        public tbEstados()
        {
            tbCiudades = new HashSet<tbCiudades>();
        }

        public int Esta_Id { get; set; }
        public string Esta_Descripcion { get; set; }
        public int? Pais_Id { get; set; }
        public bool? Esta_Estado { get; set; }
        public int Esta_Creacion { get; set; }
        public DateTime Esta_FechaCreacion { get; set; }
        public int? Esta_Modifica { get; set; }
        public DateTime? Esta_FechaModifica { get; set; }
        [NotMapped]
        public string Pais_Descripcion { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }

        public virtual tbUsuarios Esta_CreacionNavigation { get; set; }
        public virtual tbUsuarios Esta_ModificaNavigation { get; set; }
        public virtual tbPaises Pais { get; set; }
        public virtual ICollection<tbCiudades> tbCiudades { get; set; }
    }
}