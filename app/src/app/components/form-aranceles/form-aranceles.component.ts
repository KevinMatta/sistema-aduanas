import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ArancelesService } from "../../Services/aranceles.service";
import { Pais } from "../../Models/PaisesViewModel";
import { Arancel } from "../../Models/ArancelesViewModel";
import { PaisesService } from "../../Services/paises.service";

@Component({
  selector: "app-form-aranceles",
  templateUrl: "./form-aranceles.component.html",
  styleUrls: ["./form-aranceles.component.css"],
})
export class FormArancelesComponent implements OnInit {
  @Input() objetoParaEditar: Arancel;
  arancel: Arancel = new Arancel();

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private arancelesService: ArancelesService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    if (this.objetoParaEditar) {
      this.arancel.Id = this.objetoParaEditar.Id;
      this.arancel.Arancel = this.objetoParaEditar.Arancel;
      this.arancel.Porcentaje = this.objetoParaEditar.Porcentaje;
    } else {
      this.arancel.Arancel = "";
      this.arancel.Porcentaje = 0.0;
    }
  }

  arancelOnChange(event: any) {
    this.arancel.Arancel = event.target.value;
  }

  porcentajeOnChange(event: any) {
    this.arancel.Porcentaje = event.target.value;
  }

  async guardar() {
    if (!this.arancel.Arancel) {
      this.mostrarWarning("Por favor ingrese el nombre del arancel.");
      return;
    }
    if (!this.arancel.Porcentaje) {
      this.mostrarWarning("Por favor ingrese el porcentaje del arancel.");
      return;
    }
    if (!this.objetoParaEditar) {
      await this.arancelesService.Crear(this.arancel).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("arancel creado con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Error al crear el arancel.");
          }
        },
        (error) => {
          this.mostrarError("Error al crear el arancel.");
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      await this.arancelesService.Editar(this.arancel).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("arancel editado con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Error al editar el arancel.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar el arancel.");
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
