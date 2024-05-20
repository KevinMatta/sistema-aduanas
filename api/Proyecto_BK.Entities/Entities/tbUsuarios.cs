﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace sistema_aduana.Entities.Entities
{
    public partial class tbUsuarios
    {
        public tbUsuarios()
        {
            InverseUsua_CreacionNavigation = new HashSet<tbUsuarios>();
            InverseUsua_ModificaNavigation = new HashSet<tbUsuarios>();
            tbAduanasAdua_CreacionNavigation = new HashSet<tbAduanas>();
            tbAduanasAdua_ModificaNavigation = new HashSet<tbAduanas>();
            tbArancelesAran_CreacionNavigation = new HashSet<tbAranceles>();
            tbArancelesAran_ModificaNavigation = new HashSet<tbAranceles>();
            tbArancelesPorItemsArIt_CreacionNavigation = new HashSet<tbArancelesPorItems>();
            tbArancelesPorItemsArIt_ModificaNavigation = new HashSet<tbArancelesPorItems>();
            tbBoletinDePagoBoPa_CreacionNavigation = new HashSet<tbBoletinDePago>();
            tbBoletinDePagoBoPa_ModificaNavigation = new HashSet<tbBoletinDePago>();
            tbCategoriasCate_CreacionNavigation = new HashSet<tbCategorias>();
            tbCategoriasCate_ModificaNavigation = new HashSet<tbCategorias>();
            tbCiudadesCiud_CreacionNavigation = new HashSet<tbCiudades>();
            tbCiudadesCiud_ModificaNavigation = new HashSet<tbCiudades>();
            tbComerciantesIndividualesCoIn_CreacionNavigation = new HashSet<tbComerciantesIndividuales>();
            tbComerciantesIndividualesCoIn_ModificaNavigation = new HashSet<tbComerciantesIndividuales>();
            tbDeclaracionDeValorDeVa_CreacionNavigation = new HashSet<tbDeclaracionDeValor>();
            tbDeclaracionDeValorDeVa_ModificaNavigation = new HashSet<tbDeclaracionDeValor>();
            tbEmpleadosEmpl_CreacionNavigation = new HashSet<tbEmpleados>();
            tbEmpleadosEmpl_ModificaNavigation = new HashSet<tbEmpleados>();
            tbEmpleadosUsua = new HashSet<tbEmpleados>();
            tbEmpresasEmpr_CreacionNavigation = new HashSet<tbEmpresas>();
            tbEmpresasEmpr_ModificaNavigation = new HashSet<tbEmpresas>();
            tbEsquemasEsqu_CreacionNavigation = new HashSet<tbEsquemas>();
            tbEsquemasEsqu_ModificaNavigation = new HashSet<tbEsquemas>();
            tbEstadosCivilesEsCi_CreacionNavigation = new HashSet<tbEstadosCiviles>();
            tbEstadosCivilesEsCi_ModificaNavigation = new HashSet<tbEstadosCiviles>();
            tbEstadosEsta_CreacionNavigation = new HashSet<tbEstados>();
            tbEstadosEsta_ModificaNavigation = new HashSet<tbEstados>();
            tbFacturaDetalleFaDe_CreacionNavigation = new HashSet<tbFacturaDetalle>();
            tbFacturaDetalleFaDe_ModificaNavigation = new HashSet<tbFacturaDetalle>();
            tbFacturasFact_CreacionNavigation = new HashSet<tbFacturas>();
            tbFacturasFact_ModificaNavigation = new HashSet<tbFacturas>();
            tbItemsItem_CreacionNavigation = new HashSet<tbItems>();
            tbItemsItem_ModificaNavigation = new HashSet<tbItems>();
            tbPaisesPais_CreacionNavigation = new HashSet<tbPaises>();
            tbPaisesPais_ModificaNavigation = new HashSet<tbPaises>();
            tbPantallasPant_CreacionNavigation = new HashSet<tbPantallas>();
            tbPantallasPant_ModificaNavigation = new HashSet<tbPantallas>();
            tbPantallasPorRolesPaRo_CreacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbPantallasPorRolesPaRo_ModificaNavigation = new HashSet<tbPantallasPorRoles>();
            tbPersonasJuridicasPeJu_CreacionNavigation = new HashSet<tbPersonasJuridicas>();
            tbPersonasJuridicasPeJu_ModificaNavigation = new HashSet<tbPersonasJuridicas>();
            tbPersonasNaturalesPeNa_CreacionNavigation = new HashSet<tbPersonasNaturales>();
            tbPersonasNaturalesPeNa_ModificaNavigation = new HashSet<tbPersonasNaturales>();
            tbProfesionesProf_CreacionNavigation = new HashSet<tbProfesiones>();
            tbProfesionesProf_ModificaNavigation = new HashSet<tbProfesiones>();
            tbRolesRol_CreacionNavigation = new HashSet<tbRoles>();
            tbRolesRol_ModificaNavigation = new HashSet<tbRoles>();
        }

        public int Usua_Id { get; set; }
        public string Usua_Usuario { get; set; }
        public string Usua_Clave { get; set; }
        public int? Rol_Id { get; set; }
        public int? Empl_Id { get; set; }
        public bool? Usua_IsAdmin { get; set; }
        public bool? Usua_Estado { get; set; }
        public int Usua_Creacion { get; set; }
        public DateTime Usua_FechaCreacion { get; set; }
        public int? Usua_Modifica { get; set; }
        public DateTime? Usua_FechaModifica { get; set; }
        public string Usua_Email { get; set; }
        public string Usua_CodigoVerificacion { get; set; }

        [NotMapped]
        public string Empl_NombreCompleto { get; set; }
        [NotMapped]
        public string Empl_Email { get; set; }
        [NotMapped]
        public string Empl_DNI { get; set; }
        [NotMapped]
        public bool? Rol_Estado { get; set; }

        public virtual tbRoles Rol { get; set; }
        public virtual tbUsuarios Usua_CreacionNavigation { get; set; }
        public virtual tbUsuarios Usua_ModificaNavigation { get; set; }
        public virtual ICollection<tbUsuarios> InverseUsua_CreacionNavigation { get; set; }
        public virtual ICollection<tbUsuarios> InverseUsua_ModificaNavigation { get; set; }
        public virtual ICollection<tbAduanas> tbAduanasAdua_CreacionNavigation { get; set; }
        public virtual ICollection<tbAduanas> tbAduanasAdua_ModificaNavigation { get; set; }
        public virtual ICollection<tbAranceles> tbArancelesAran_CreacionNavigation { get; set; }
        public virtual ICollection<tbAranceles> tbArancelesAran_ModificaNavigation { get; set; }
        public virtual ICollection<tbArancelesPorItems> tbArancelesPorItemsArIt_CreacionNavigation { get; set; }
        public virtual ICollection<tbArancelesPorItems> tbArancelesPorItemsArIt_ModificaNavigation { get; set; }
        public virtual ICollection<tbBoletinDePago> tbBoletinDePagoBoPa_CreacionNavigation { get; set; }
        public virtual ICollection<tbBoletinDePago> tbBoletinDePagoBoPa_ModificaNavigation { get; set; }
        public virtual ICollection<tbCategorias> tbCategoriasCate_CreacionNavigation { get; set; }
        public virtual ICollection<tbCategorias> tbCategoriasCate_ModificaNavigation { get; set; }
        public virtual ICollection<tbCiudades> tbCiudadesCiud_CreacionNavigation { get; set; }
        public virtual ICollection<tbCiudades> tbCiudadesCiud_ModificaNavigation { get; set; }
        public virtual ICollection<tbComerciantesIndividuales> tbComerciantesIndividualesCoIn_CreacionNavigation { get; set; }
        public virtual ICollection<tbComerciantesIndividuales> tbComerciantesIndividualesCoIn_ModificaNavigation { get; set; }
        public virtual ICollection<tbDeclaracionDeValor> tbDeclaracionDeValorDeVa_CreacionNavigation { get; set; }
        public virtual ICollection<tbDeclaracionDeValor> tbDeclaracionDeValorDeVa_ModificaNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosEmpl_CreacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosEmpl_ModificaNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosUsua { get; set; }
        public virtual ICollection<tbEmpresas> tbEmpresasEmpr_CreacionNavigation { get; set; }
        public virtual ICollection<tbEmpresas> tbEmpresasEmpr_ModificaNavigation { get; set; }
        public virtual ICollection<tbEsquemas> tbEsquemasEsqu_CreacionNavigation { get; set; }
        public virtual ICollection<tbEsquemas> tbEsquemasEsqu_ModificaNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivilesEsCi_CreacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivilesEsCi_ModificaNavigation { get; set; }
        public virtual ICollection<tbEstados> tbEstadosEsta_CreacionNavigation { get; set; }
        public virtual ICollection<tbEstados> tbEstadosEsta_ModificaNavigation { get; set; }
        public virtual ICollection<tbFacturaDetalle> tbFacturaDetalleFaDe_CreacionNavigation { get; set; }
        public virtual ICollection<tbFacturaDetalle> tbFacturaDetalleFaDe_ModificaNavigation { get; set; }
        public virtual ICollection<tbFacturas> tbFacturasFact_CreacionNavigation { get; set; }
        public virtual ICollection<tbFacturas> tbFacturasFact_ModificaNavigation { get; set; }
        public virtual ICollection<tbItems> tbItemsItem_CreacionNavigation { get; set; }
        public virtual ICollection<tbItems> tbItemsItem_ModificaNavigation { get; set; }
        public virtual ICollection<tbPaises> tbPaisesPais_CreacionNavigation { get; set; }
        public virtual ICollection<tbPaises> tbPaisesPais_ModificaNavigation { get; set; }
        public virtual ICollection<tbPantallas> tbPantallasPant_CreacionNavigation { get; set; }
        public virtual ICollection<tbPantallas> tbPantallasPant_ModificaNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolesPaRo_CreacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolesPaRo_ModificaNavigation { get; set; }
        public virtual ICollection<tbPersonasJuridicas> tbPersonasJuridicasPeJu_CreacionNavigation { get; set; }
        public virtual ICollection<tbPersonasJuridicas> tbPersonasJuridicasPeJu_ModificaNavigation { get; set; }
        public virtual ICollection<tbPersonasNaturales> tbPersonasNaturalesPeNa_CreacionNavigation { get; set; }
        public virtual ICollection<tbPersonasNaturales> tbPersonasNaturalesPeNa_ModificaNavigation { get; set; }
        public virtual ICollection<tbProfesiones> tbProfesionesProf_CreacionNavigation { get; set; }
        public virtual ICollection<tbProfesiones> tbProfesionesProf_ModificaNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesRol_CreacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesRol_ModificaNavigation { get; set; }
    }
}