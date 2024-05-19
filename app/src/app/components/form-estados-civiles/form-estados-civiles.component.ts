import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { ToastrService } from "ngx-toastr";
import { EstadosCivilesService } from "../../Services/estados-civiles.service";
import { EstadoCivil } from "../../Models/EstadosCivilesViewModel";
// import { MensajesService } from "../../Services/mensajes.service";

@Component({
  selector: "app-form-estados-civiles",
  templateUrl: "./form-estados-civiles.component.html",
  styleUrls: ["./form-estados-civiles.component.css"],
})
export class FormEstadosCivilesComponent implements OnInit {
  @Input() objetoParaEditar: EstadoCivil;
  roles: Rol[];

  estadoCivil: EstadoCivil = new EstadoCivil();
  confirmarClave: string;

  constructor(
    public activeModal: NgbActiveModal,
    private rolesService: RolesService,
    private toastr: ToastrService,
    private estadosCivilesService: EstadosCivilesService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    if (this.objetoParaEditar) {
      this.estadoCivil.Id = this.objetoParaEditar.Id;
      this.estadoCivil["Estado Civil"] = this.objetoParaEditar["Estado Civil"];
    } else {
      this.estadoCivil["Estado Civil"] = "";
    }

    this.rolesService.getData().subscribe(
      (data: Rol[]) => {
        this.roles = data;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  estadoCivilOnChange(event: any) {
    this.estadoCivil["Estado Civil"] = event.target.value;
  }

  async guardar() {
    if (!this.estadoCivil["Estado Civil"]) {
      this.mostrarWarning("Por favor ingrese el nombre del Estado civil.");
      return;
    }
    if (!this.objetoParaEditar) {
      await this.estadosCivilesService.Crear(this.estadoCivil).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Estado Civil creado con éxito.");
            this.activeModal.close(true);
          } else {
            this.mostrarError("Ya existe un Estado Civil.");
          }
        },
        (error) => {
          console.log(error);
          this.mostrarError("Error al crear el estado civil.");
          this.isLoading = false;
        }
      );
    } else {
      await this.estadosCivilesService.Editar(this.estadoCivil).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Estado civil editado con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Error al editar el Estado civil.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar el Estado civil.");
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
