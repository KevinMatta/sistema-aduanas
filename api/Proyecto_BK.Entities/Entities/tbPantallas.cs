﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace sistema_aduana.Entities.Entities
{
    public partial class tbPantallas
    {
        public tbPantallas()
        {
            tbPantallasPorRoles = new HashSet<tbPantallasPorRoles>();
        }

        public int Pant_Id { get; set; }
        public string Pant_Descripcion { get; set; }
        public bool? Pant_Estado { get; set; }
        public int Pant_Creacion { get; set; }
        public DateTime Pant_FechaCreacion { get; set; }
        public int? Pant_Modifica { get; set; }
        public DateTime? Pant_FechaModifica { get; set; }
        [NotMapped]
        public int Esqu_Id { get; set; }
        [NotMapped]
        public string Creacion { get; set; }
        [NotMapped]
        public string Modifica { get; set; }

        public virtual tbUsuarios Pant_CreacionNavigation { get; set; }
        public virtual tbUsuarios Pant_ModificaNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRoles { get; set; }
    }
}