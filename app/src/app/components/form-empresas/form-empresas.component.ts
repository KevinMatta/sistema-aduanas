import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { EstadosService } from "../../Services/estados.service";
import { Estado } from "../../Models/EstadosViewModel";
import { Ciudad } from "../../Models/CiudadesViewModel";
import { CiudadesService } from "../../Services/ciudades.service";
import { Empresa } from "../../Models/EmpresasViewModel";
import { EmpresasService } from "../../Services/empresas.service";

@Component({
  selector: "app-form-empresas",
  templateUrl: "./form-empresas.component.html",
  styleUrls: ["./form-empresas.component.css"],
})
export class FormEmpresasComponent implements OnInit {
  @Input() objetoParaEditar: Empresa;
  estados: Estado[];
  ciudades: Ciudad[];
  ciudadesFiltrados: Ciudad[];

  empresa: Empresa = new Empresa();
  confirmarClave: string;

  constructor(
    public activeModal: NgbActiveModal,
    private estadosService: EstadosService,
    private toastr: ToastrService,
    private ciudadesService: CiudadesService,
    private empresasService: EmpresasService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    console.log(this.objetoParaEditar);

    if (this.objetoParaEditar) {
      this.empresa.Id = this.objetoParaEditar.Id;
      this.empresa.Empresa = this.objetoParaEditar.Empresa;
      this.empresa.Estado = this.objetoParaEditar.Estado ?? "- Seleccionar -";
      this.empresa.Ciudad = this.objetoParaEditar.Ciudad ?? "- Seleccionar -";
    } else {
      this.empresa.Empresa = "";
      this.empresa.Estado = "- Seleccionar -";
      this.empresa.Ciudad = "- Seleccionar -";
    }

    this.estadosService.getData().subscribe(
      (data: Estado[]) => {
        this.estados = data;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );

    this.ciudadesService.getData().subscribe(
      (data: Ciudad[]) => {
        this.ciudades = data;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  filtrarCiudades(esta_Id: number) {
    console.log(esta_Id, "esta_Id", this.ciudades, "this.ciudades");

    this.ciudadesFiltrados = this.ciudades.filter(
      (ciudad) => ciudad.esta_Id === esta_Id
    );
  }

  estadosSelect(estaId: number, esta: string) {
    this.empresa.esta_Id = estaId;
    this.empresa.Estado = esta;
    this.filtrarCiudades(this.empresa.esta_Id);
  }

  ciudadesSelect(ciudId: number, ciudad: string) {
    this.empresa.ciud_Id = ciudId;
    this.empresa.Ciudad = ciudad;
  }

  empresaOnChange(event: any) {
    this.empresa.Empresa = event.target.value;
  }

  async guardar() {
    if (!this.empresa.esta_Id) {
      this.mostrarWarning("Por favor seleccione un Estado.");
      return;
    }
    if (!this.empresa.ciud_Id) {
      this.mostrarWarning("Por favor seleccione un ciudad.");
      return;
    }
    if (!this.empresa.Empresa) {
      this.mostrarWarning("Por favor ingrese el nombre de la aduana.");
      return;
    }
    // if (!this.objetoParaEditar) {
    //   await this.empresasService.Crear(this.empresa).subscribe(
    //     (data: any) => {
    //       if (data.code >= 200 && data.code <= 300) {
    //         this.mostrarSuccess("Aduana creada con éxito.");
    //         this.activeModal.close(true);
    //       } else {
    //         this.activeModal.close(false);
    //         this.mostrarError("Ya existe una aduana con este nombre.");
    //       }
    //     },
    //     (error) => {
    //       this.mostrarError("Error al crear la aduana.");
    //       console.log(error);
    //       this.isLoading = false;
    //     }
    //   );
    // } else {
    //   await this.empresasService.Editar(this.empresa).subscribe(
    //     (data: any) => {
    //       if (data.code >= 200 && data.code <= 300) {
    //         this.mostrarSuccess("Aduana editada con éxito.");
    //         this.activeModal.close(true);
    //       } else {
    //         this.activeModal.close(false);
    //         this.mostrarError("Ya existe una aduana con este nombre.");
    //       }
    //     },
    //     (error) => {
    //       this.mostrarError("Error al editar la aduana.");
    //       console.log(error);
    //       this.isLoading = false;
    //     }
    //   );
    // }
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
