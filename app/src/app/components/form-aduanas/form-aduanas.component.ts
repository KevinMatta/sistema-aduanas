import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { EstadosService } from "../../Services/estados.service";
import { Estado } from "../../Models/EstadosViewModel";
import { Ciudad } from "../../Models/CiudadesViewModel";
import { CiudadesService } from "../../Services/ciudades.service";
import { Aduana } from "../../Models/AduanasViewModel";
import { AduanasService } from "../../Services/aduanas.service";
// import { MensajesService } from "../../Services/mensajes.service";

@Component({
  selector: "app-form-aduanas",
  templateUrl: "./form-aduanas.component.html",
  styleUrls: ["./form-aduanas.component.css"],
})
export class FormAduanasComponent implements OnInit {
  @Input() objetoParaEditar: Aduana;
  estados: Estado[];
  ciudades: Ciudad[];
  ciudadesFiltradas: Ciudad[];

  aduana: Aduana = new Aduana();
  confirmarClave: string;

  constructor(
    public activeModal: NgbActiveModal,
    private estadosService: EstadosService,
    private toastr: ToastrService,
    private ciudadesService: CiudadesService,
    private aduanasService: AduanasService
  ) {}

  isLoading = true;
  ngOnInit(): void {
    if (this.objetoParaEditar) {
      this.aduana.Id = this.objetoParaEditar.Id;
      this.aduana.Aduana = this.objetoParaEditar.Aduana;
      this.aduana.esta_Id = this.objetoParaEditar.esta_Id;
      this.aduana.ciud_Id = this.objetoParaEditar.ciud_Id;
      this.aduana.Estado = this.objetoParaEditar.Estado ?? "- Seleccionar -";
      this.aduana.Ciudad = this.objetoParaEditar.Ciudad ?? "- Seleccionar -";
    } else {
      this.aduana.Aduana = "";
      this.aduana.Estado = "- Seleccionar -";
      this.aduana.Ciudad = "- Seleccionar -";
    }
    
    this.estadosService.getData().subscribe(
      (data: Estado[]) => {
        this.estados = data.filter(esta=>esta.Pais === 'Honduras');
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
    this.ciudadesService.getData().subscribe(
      (data: Ciudad[]) => {
        this.ciudades = data;
        if (this.aduana.esta_Id) {
          this.filtrarCiudades(this.aduana.esta_Id);
        }
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );

  }

  filtrarCiudades(esta_Id: number) {
    console.log(esta_Id, "esta_Id", this.ciudades, "this.ciudades");

    this.ciudadesFiltradas = this.ciudades.filter(
      (ciudad) => ciudad.esta_Id === esta_Id
    );
  }

  estadosSelect(estaId: number, esta: string) {
    this.aduana.esta_Id = estaId;
    this.aduana.Estado = esta;
    this.aduana.ciud_Id = null;
    this.aduana.Ciudad = "- Seleccionar -";
    this.filtrarCiudades(this.aduana.esta_Id);
  }

  ciudadesSelect(ciudId: number, ciudad: string) {
    this.aduana.ciud_Id = ciudId;
    this.aduana.Ciudad = ciudad;
  }

  aduanaOnChange(event: any) {
    this.aduana.Aduana = event.target.value;
  }

  async guardar() {
    if (!this.aduana.esta_Id) {
      this.mostrarWarning("Por favor seleccione un Estado.");
      return;
    }
    if (!this.aduana.ciud_Id) {
      this.mostrarWarning("Por favor seleccione un ciudad.");
      return;
    }
    if (!this.aduana.Aduana) {
      this.mostrarWarning("Por favor ingrese el nombre de la aduana.");
      return;
    }
    if (!this.objetoParaEditar) {
      await this.aduanasService.Crear(this.aduana).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Aduana creada con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Ya existe una aduana con este nombre.");
          }
        },
        (error) => {
          this.mostrarError("Error al crear la aduana.");
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      await this.estadosService.Editar(this.aduana).subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Aduana editada con éxito.");
            this.activeModal.close(true);
          } else {
            this.activeModal.close(false);
            this.mostrarError("Ya existe una aduana con este nombre.");
          }
        },
        (error) => {
          this.mostrarError("Error al editar la aduana.");
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
