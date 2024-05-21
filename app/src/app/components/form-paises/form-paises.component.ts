import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Pais } from "../../Models/PaisesViewModel";
import { ToastrService } from "ngx-toastr";
import { PaisesService } from "../../Services/paises.service";
// import { MensajesService } from "../../Services/mensajes.service";

@Component({
  selector: "app-form-paises",
  templateUrl: "./form-paises.component.html",
  styleUrls: ["./form-paises.component.css"],
})
export class FormPaisesComponent implements OnInit {
  @Input() objetoParaEditar: Pais;

  pais: Pais = new Pais();

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private paisService: PaisesService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    if (this.objetoParaEditar) {
      this.pais.Id = this.objetoParaEditar.Id;
      this.pais.Pais = this.objetoParaEditar.Pais;
    } else {
      this.pais.Pais = "";
    }
  }

  paisOnChange(event: any) {
    this.pais.Pais = event.target.value;
  }

  async guardar() {
    if (!this.pais.Pais) {
      this.mostrarWarning("Por favor ingrese el nombre del país.");
      return;
    }
    if (!this.objetoParaEditar) {
      await this.paisService.Crear(this.pais).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("País creado con éxito.");
            this.activeModal.close(true);
          } else {
            this.mostrarError("Ya existe ese país.");
          }
        },
        (error) => {
          this.mostrarError("Error al crear el pais.");
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      await this.paisService.Editar(this.pais).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("País editado con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Error al editar el país.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar el país.");
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
