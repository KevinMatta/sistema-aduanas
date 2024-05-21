import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Empleado } from "../../Models/EmpleadosViewModel";
import { ToastrService } from "ngx-toastr";
import { EmpleadosService } from "../../Services/empleados.service";
import { APIResponse } from "../../Models/APIResponseViewModel";
import { EstadoCivil } from "../../Models/EstadosCivilesViewModel";
import { EstadosCivilesService } from "../../Services/estados-civiles.service";
import { Empresa } from "../../Models/EmpresasViewModel";
import { EmpresasService } from "../../Services/empresas.service";
import { Estado } from "../../Models/EstadosViewModel";
import { Ciudad } from "../../Models/CiudadesViewModel";
import { EstadosService } from "../../Services/estados.service";
import { CiudadesService } from "../../Services/ciudades.service";

@Component({
  selector: "app-form-empleados",
  templateUrl: "./form-empleados.component.html",
  styleUrls: ["./form-empleados.component.css"],
})
export class FormEmpleadosComponent implements OnInit {
  objetoParaEditar: Empleado;

  estados: Estado[];
  ciudades: Ciudad[];
  ciudadesFiltradas: Ciudad[];
  empresas: Empresa[];
  empresasFiltradas: Empresa[];
  estadosCiviles: EstadoCivil[];

  empleado: Empleado = new Empleado();

  constructor(
    private estadosCivilesService: EstadosCivilesService,
    private estadosService: EstadosService,
    private toastr: ToastrService,
    private ciudadesService: CiudadesService,
    private location: Location,
    private empleadosService: EmpleadosService,
    private empresasService: EmpresasService
  ) { }

  isLoading = true;
  ngOnInit(): void {
    this.empleado.Nombre = "";
    this.empleado.Apellido = "";
    this.empleado.DNI = "";
    this.empleado.Email = "";
    this.empleado.Empresa = "- Seleccionar -";
    this.empleado.Estado_ = "- Seleccionar -";
    this.empleado.Ciudad_ = "- Seleccionar -";
    this.empleado["Estado Civil"] = "- Seleccionar -";
    this.empleado.Sexo = "FEMENINO";

    this.objetoParaEditar = this.empleadosService.getObjetoParaEditar()

    console.log(this.objetoParaEditar, 'this.objetoParaEditar');
    
    if (this.objetoParaEditar) {
      this.empleado.Id = this.objetoParaEditar.Id
      this.empleado.Nombre = this.objetoParaEditar.Nombre;
      this.empleado.Apellido = this.objetoParaEditar.Apellido;
      this.empleado.DNI = this.objetoParaEditar.DNI;
      this.empleado.Email = this.objetoParaEditar.Email;
      this.empleado.esta_Id = this.objetoParaEditar.esta_Id;
      this.empleado.Estado_ = this.objetoParaEditar.Estado_;
      this.empleado.ciud_Id = this.objetoParaEditar.ciud_Id;
      this.empleado.Ciudad_ = this.objetoParaEditar.Ciudad_;
      this.empleado._empr_Id = this.objetoParaEditar._empr_Id;
      this.empleado._esCi_Id = this.objetoParaEditar._esCi_Id;
      this.empleado["Estado Civil"] = this.objetoParaEditar["Estado Civil"];
      this.empleado.Empresa = this.objetoParaEditar.Empresa;
      this.empleado.Sexo = this.objetoParaEditar.Sexo;
    }


    this.estadosService.getData().subscribe(
      (data: Estado[]) => {
        this.estados = data.filter(esta=>esta.Pais === 'Honduras');
        this.ciudadesService.getData().subscribe(
          (data: Ciudad[]) => {
            this.ciudades = data;
            if (this.empleado.esta_Id) {
              this.filtrarCiudades(this.empleado.esta_Id);
            }
            this.empresasService.getData().subscribe(
              (data: Empresa[]) => {
                this.empresas = data;
                if (this.empleado.ciud_Id) {
                  this.filtrarEmpresas(this.empleado.ciud_Id);
                }
              },
              (error) => {
                console.log(error);
                this.isLoading = false;
              }
            );
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
    
    this.estadosCivilesService.getData().subscribe(
      (data: EstadoCivil[]) => {
        this.estadosCiviles = data;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
  
  
  nombreOnChange(event: any) {
    this.empleado.Nombre = event.target.value;
  }
  apellidoOnChange(event: any) {
    this.empleado.Apellido = event.target.value;
  }
  DNIOnChange(event: any) {
    this.empleado.DNI = event.target.value;
  }
  emailOnChange(event: any) {
    this.empleado.Email = event.target.value;
  }

  filtrarCiudades(esta_Id: number) {
    this.ciudadesFiltradas = this.ciudades.filter(
      (ciudad) => ciudad.esta_Id === esta_Id
    );
  }

  filtrarEmpresas(ciud_Id: number) {
    this.empresasFiltradas = this.empresas.filter(
      (empr) => empr.ciud_Id === ciud_Id
    );
  }

  estadosSelect(estaId: number, esta: string) {
    this.empleado.esta_Id = estaId;
    this.empleado.Estado_ = esta;
    this.empleado.ciud_Id = null;
    this.empleado.Ciudad_ = "- Seleccionar -";
    this.filtrarCiudades(this.empleado.esta_Id);
  }

  ciudadesSelect(ciudId: number, ciudad: string) {
    this.empleado.ciud_Id = ciudId;
    this.empleado.Ciudad_ = ciudad;
    this.empleado._empr_Id = null;
    this.empleado.Empresa = "- Seleccionar -";
    this.filtrarEmpresas(this.empleado.ciud_Id);
  }

  empresaSelect(emprId: number, empr: string) {
    this.empleado._empr_Id = emprId;
    this.empleado.Empresa = empr;
  }
  esCiSelect(esCiId: number, esCi: string) {
    this.empleado._esCi_Id = esCiId;
    this.empleado["Estado Civil"] = esCi;
  }
  sexoToggle() {
    this.empleado.Sexo = this.empleado.Sexo === 'FEMENINO' ? 'MASCULINO' : 'FEMENINO';
  }

  cancelar() {
    this.location.back();
  }

  async guardar() {
    if (!this.empleado.Nombre) {
      this.mostrarWarning("Por favor ingrese el nombre del empleado.");
      return;
    }
    if (!this.empleado.Apellido) {
      this.mostrarWarning("Por favor ingrese el apellido del empleado.");
      return;
    }
    if (!this.empleado.DNI) {
      this.mostrarWarning("Por favor ingrese su número de identidad.");
      return;
    }
    if (!this.empleado.Email) {
      this.mostrarWarning("Por favor ingrese su correo electrónico.");
      return;
    }
    if (!this.empleado._empr_Id) {
      this.mostrarWarning("Por favor seleccione la empresa en la que labura el empleado.");
      return;
    }
    if (!this.empleado._esCi_Id) {
      this.mostrarWarning("Por favor seleccione un estado civil.");
      return;
    }
    if (this.objetoParaEditar) {
      this.empleadosService.Editar(this.empleado).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Empleado editado con éxito.");
            this.location.back();
          } else {
            this.mostrarError("Ya existe ese empleado.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar el empleado.");
          console.log(error);
          this.isLoading = false;
        }
      );
      return;
    }
    this.empleadosService.Crear(this.empleado).subscribe(
      (data: any) => {
        if (data.code >= 200 && data.code <= 300) {
          this.mostrarSuccess("Empleado creado con éxito.");
          this.location.back();
        } else {
          this.mostrarError("Ya existe ese empleado.");
        }
      },
      (error) => {
        this.mostrarError("Error al crear el empleado.");
        console.log(error);
        this.isLoading = false;
      }
    );
  }
  mostrarSuccess(mensaje: string) {
    this.toastr.success(
      `<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`,
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-bottom-right",
      }
    );
  }
  mostrarWarning(mensaje: string) {
    this.toastr.warning(
      `<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`,
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: "toast-bottom-right",
      }
    );
  }
  mostrarError(mensaje: string) {
    this.toastr.error(
      `<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`,
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-error alert-with-icon",
        positionClass: "toast-bottom-right",
      }
    );
  }
}
