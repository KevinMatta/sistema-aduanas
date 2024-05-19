import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { EstadosService } from "../../Services/estados.service";
import { Pais } from "../../Models/PaisesViewModel";
import { Estado } from "../../Models/EstadosViewModel";
import { Ciudad } from "../../Models/CiudadesViewModel";
import { PaisesService } from "../../Services/paises.service";
// import { MensajesService } from "../../Services/mensajes.service";

@Component({
  selector: "app-form-ciudades",
  templateUrl: "./form-ciudades.component.html",
  styleUrls: ["./form-ciudades.component.css"],
})
export class FormCiudadesComponent implements OnInit {
  @Input() objetoParaEditar: Ciudad;
  paises: Pais[];
  estados: Estado[];
  estadosFiltrados: Estado[];

  ciudad: Ciudad = new Ciudad();
  confirmarClave: string;

  constructor(
    public activeModal: NgbActiveModal,
    private paisesService: PaisesService,
    private toastr: ToastrService,
    private estadosService: EstadosService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    if (this.objetoParaEditar) {
      this.ciudad.Id = this.objetoParaEditar.Id;
      this.ciudad.Ciudad = this.objetoParaEditar.Ciudad;
      this.ciudad.Pais = this.objetoParaEditar.Pais ?? "- Seleccionar -";
      this.ciudad.Estado = this.objetoParaEditar.Estado ?? "- Seleccionar -";
    } else {
      this.ciudad.Ciudad = "";
      this.ciudad.Pais = "- Seleccionar -";
      this.ciudad.Estado = "- Seleccionar -";
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
    this.estadosService.getData().subscribe(
      (data: Estado[]) => {
        this.estados = data;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  filtrarEstados(pais_Id: number) {
    console.log(pais_Id, "pais_Id", this.estados, "this.estados");

    this.estadosFiltrados = this.estados.filter(
      (estado) => estado.pais_Id === pais_Id
    );
  }

  paisSelect(paisId: number, pais: string) {
    this.ciudad.pais_Id = paisId;
    this.ciudad.Pais = pais;
    this.filtrarEstados(this.ciudad.pais_Id);
  }

  estadoSelect(estadoId: number, estado: string) {
    this.ciudad.esta_Id = estadoId;
    this.ciudad.Estado = estado;
  }

  ciudadOnChange(event: any) {
    this.ciudad.Ciudad = event.target.value;
  }

  async guardar() {
    if (!this.ciudad.pais_Id) {
      this.mostrarWarning("Por favor seleccione un país.");
      return;
    }
    if (!this.ciudad.esta_Id) {
      this.mostrarWarning("Por favor seleccione un Estado.");
      return;
    }
    if (!this.ciudad.Ciudad) {
      this.mostrarWarning("Por favor ingrese el nombre de la ciudad.");
      return;
    }
    if (!this.objetoParaEditar) {
      await this.estadosService.Crear(this.ciudad).subscribe(
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
      await this.estadosService.Editar(this.ciudad).subscribe(
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
