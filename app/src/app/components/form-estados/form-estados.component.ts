import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { ToastrService } from "ngx-toastr";
import { EstadosService } from "../../Services/estados.service";
import { Pais } from "../../Models/PaisesViewModel";
import { Estado } from "../../Models/EstadosViewModel";
import { PaisesService } from "../../Services/paises.service";
// import { MensajesService } from "../../Services/mensajes.service";

@Component({
  selector: "app-form-estados",
  templateUrl: "./form-estados.component.html",
  styleUrls: ["./form-estados.component.css"],
})
export class FormEstadosComponent implements OnInit {
  @Input() objetoParaEditar: Estado;
  paises: Pais[];

  estado: Estado = new Estado();
  confirmarClave: string;

  constructor(
    public activeModal: NgbActiveModal,
    private paisesService: PaisesService,
    private toastr: ToastrService,
    private estadosService: EstadosService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    console.log(this.objetoParaEditar);

    if (this.objetoParaEditar) {
      this.estado.Id = this.objetoParaEditar.Id;
      this.estado.Estado = this.objetoParaEditar.Estado;
      this.estado.Pais = this.objetoParaEditar.Pais ?? "- Seleccionar -";
    } else {
      this.estado.Estado = "";
      this.estado.Pais = "- Seleccionar -";
    }

    this.paisesService.getData().subscribe(
      (data: Pais[]) => {
        this.paises = data;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  paisSelect(paisId: number, pais: string) {
    this.estado.pais_Id = paisId;
    this.estado.Pais = pais;
  }
  estadoOnChange(event: any) {
    this.estado.Estado = event.target.value;
  }

  async guardar() {
    if (!this.estado.Estado) {
      this.mostrarWarning("Por favor ingrese el nombre del Estado.");
      return;
    }
    if (!this.estado.pais_Id) {
      this.mostrarWarning("Por favor seleccione un país.");
      return;
    }
    if (!this.objetoParaEditar) {
      await this.estadosService.Crear(this.estado).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("estado creado con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Error al crear el estado.");
          }
        },
        (error) => {
          this.mostrarError("Error al crear el estado.");
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      await this.estadosService.Editar(this.estado).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("estado editado con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Error al editar el estado.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar el estado.");
          console.log(error);
          this.isLoading = false;
        }
      );
    }
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
