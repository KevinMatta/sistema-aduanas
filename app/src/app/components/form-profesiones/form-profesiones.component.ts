import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Rol } from "../../Models/RolesViewModel";
import { RolesService } from "../../Services/roles.service";
import { ToastrService } from "ngx-toastr";
import { Profesion } from "../../Models/ProfesionesViewModel";
import { ProfesionesService } from "../../Services/profesiones.service";

@Component({
  selector: "app-form-profesiones",
  templateUrl: "./form-profesiones.component.html",
  styleUrls: ["./form-profesiones.component.css"],
})
export class FormProfesionesComponent implements OnInit {
  @Input() objetoParaEditar: Profesion;
  roles: Rol[];

  profesion: Profesion = new Profesion();
  confirmarClave: string;

  constructor(
    public activeModal: NgbActiveModal,
    private rolesService: RolesService,
    private toastr: ToastrService,
    private profesionService: ProfesionesService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    if (this.objetoParaEditar) {
      this.profesion.Id = this.objetoParaEditar.Id;
      this.profesion.Profesion = this.objetoParaEditar.Profesion;
    } else {
      this.profesion.Profesion = "";
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

  profesionOnChange(event: any) {
    this.profesion.Profesion = event.target.value;
  }

  async guardar() {
    if (!this.profesion.Profesion) {
      this.mostrarWarning("Por favor ingrese el nombre del Profesión.");
      return;
    }
    if (!this.objetoParaEditar) {
      await this.profesionService.Crear(this.profesion).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Profesión creado con éxito.");
            this.activeModal.close(true);
          } else {
            this.mostrarError("Ya existe ese Profesión.");
          }
        },
        (error) => {
          this.mostrarError("Error al crear el profesion.");
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      await this.profesionService.Editar(this.profesion).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Profesión editado con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Error al editar el Profesión.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar el Profesión.");
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
