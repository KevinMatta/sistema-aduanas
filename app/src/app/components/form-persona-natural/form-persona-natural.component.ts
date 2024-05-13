import { Component, OnInit, SecurityContext, Input } from "@angular/core";
import { UtilitariosService } from "../../Services/utilitarios.service";
import { ToastrService } from "ngx-toastr";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PersonaNatural } from "../../Models/PersonaNaturalViewModel";
import { Estado } from "../../Models/EstadosViewModel";
import { Ciudad } from "../../Models/CiudadesViewModel";
import { EstadoCivil } from "../../Models/EstadosCivilesViewModel";
import { Aduana } from "../../Models/AduanasViewModel";
import { EstadosService } from "../../Services/estados.service";
import { CiudadesService } from "../../Services/ciudades.service";
import { AduanasService } from "../../Services/aduanas.service";
import { EstadosCivilesService } from "../../Services/estados-civiles.service";
import { ProfesionesService } from "../../Services/profesiones.service";
import { Profesion } from "../../Models/ProfesionesViewModel";
import { PersonaNaturalService } from "../../Services/personaNatural.service";
import { ModalPdfComponent } from "../modal-pdf/modal-pdf.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import * as html2pdf from "html2pdf.js";

@Component({
  selector: "app-form-persona-natural",
  templateUrl: "./form-persona-natural.component.html",
  styleUrls: ["./form-persona-natural.component.css"],
})
export class FormPersonaNaturalComponent implements OnInit {
  estados: Estado[];
  ciudades: Ciudad[];
  ciudadesFiltradas: Ciudad[];
  aduanas: Aduana[];
  aduanasFiltradas: Aduana[];
  estadosCiviles: EstadoCivil[];
  profesiones: Profesion[];

  endpointSubirRTN = "/API/PersonaNatural/SubirRTNsolicitante";
  endpointSubirDNI = "/API/PersonaNatural/SubirDNI";
  endpointSubirReciboPublico = "/API/PersonaNatural/SubirReciboPublico";

  personaNatural: PersonaNatural = new PersonaNatural();

  constructor(
    private sanitizer: DomSanitizer,
    private utilitariosService: UtilitariosService,
    private estadosService: EstadosService,
    private ciudadesService: CiudadesService,
    private aduanasService: AduanasService,
    private estadosCivilesService: EstadosCivilesService,
    private profesionesService: ProfesionesService,
    private modalService: NgbModal,
    private personaNaturalService: PersonaNaturalService,
    private toastr: ToastrService
  ) {}

  isLoading = true;
  ngOnInit() {
    this.personaNatural.Estado = "- Seleccionar -";
    this.personaNatural.Ciudad = "- Seleccionar -";
    this.personaNatural.Aduana = "- Seleccionar -";
    this.personaNatural["Estado Civil"] = "- Seleccionar -";
    this.personaNatural.Profesion = "- Seleccionar -";

    this.estadosService.getData().subscribe(
      (data: Estado[]) => {
        this.estados = data.filter((esta) => esta.Pais === "Honduras");
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

    this.aduanasService.getData().subscribe(
      (data: Aduana[]) => {
        this.aduanas = data;
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

    this.profesionesService.getData().subscribe(
      (data: Profesion[]) => {
        this.profesiones = data;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  sanitizarUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sanitizer.sanitize(SecurityContext.URL, url)
    );
  }

  RtnSolicitanteOnChange(event: any) {
    const val = event.target.value;
    this.personaNatural.RtnSolicitante = val;
  }

  DNIOnChange(event: any) {
    const val = event.target.value;
    this.personaNatural.DNI = val;
  }
  NombreOnChange(event: any) {
    const val = event.target.value;
    this.personaNatural.Nombre = val;
  }
  ApellidoOnChange(event: any) {
    const val = event.target.value;
    this.personaNatural.Apellido = val;
  }

  ReciboPublicoOnChange(event: any) {
    const val = event.target.value;
    this.personaNatural.NumReciboPublico = val;
  }

  filtrarCiudades(esta_Id: number) {
    this.ciudadesFiltradas = this.ciudades.filter(
      (estado) => estado.esta_Id === esta_Id
    );
  }

  estadoSelect(estadoId: number, estado: string) {
    this.personaNatural.esta_Id = estadoId;
    this.personaNatural.Estado = estado;
    this.filtrarCiudades(this.personaNatural.esta_Id);
  }

  filtrarAduanas(ciud_Id: number) {
    this.aduanasFiltradas = this.aduanas.filter(
      (adua) => adua.ciud_Id === ciud_Id
    );
  }

  ciudadSelect(ciudId: number, ciudad: string) {
    this.personaNatural.ciud_Id = ciudId;
    this.personaNatural.Ciudad = ciudad;
    this.filtrarAduanas(this.personaNatural.ciud_Id);
  }

  DireccionOnChange(event: any) {
    const val = event.target.value;
    this.personaNatural.DireccionCompleta = val;
  }

  aduanaSelect(aduaId: number, aduana: string) {
    this.personaNatural.adua_Id = aduaId;
    this.personaNatural.Aduana = aduana;
  }

  profesionSelect(profId: number, profesion: string) {
    this.personaNatural.prof_Id = profId;
    this.personaNatural.Profesion = profesion;
  }

  estadoCivilSelect(esCiId: number, esCi: string) {
    this.personaNatural.esCi_Id = esCiId;
    this.personaNatural["Estado Civil"] = esCi;
  }

  onTelefonoFijoChange(telefonoFijo: string) {
    this.personaNatural.TelefonoFijo = telefonoFijo;
  }

  onTelefonoCelularChange(telefonoCelular: string) {
    this.personaNatural.TelefonoCelular = telefonoCelular;
  }
  onCorreoChange(telefonoFijo: string) {
    this.personaNatural.Correo = telefonoFijo;
  }
  onCorreoAlternativoChange(correoAlternativo: string) {
    this.personaNatural.CorreoAlternativo = correoAlternativo;
  }

  async subirRtnSolicitanteArchivo(event: any) {
    if (this.personaNatural.RtnSolicitante === "") {
      this.mostrarWarning("Por favor ingrese el RTN del solicitante.");
      event.target.value = null;
      return;
    }

    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append("pdf", pdf);
      const keyName =
        this.personaNatural.RtnSolicitante + "_RTNsolicitante_PeNa.pdf";
      formData.append("keyName", keyName);
      const res = await this.utilitariosService.subirArchivo(
        this.endpointSubirRTN,
        formData
      );

      if (res) {
        this.personaNatural.RtnSolicitanteUrl =
          "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName;
        this.sanitizarUrl(this.personaNatural.RtnSolicitanteUrl);
        this.mostrarSuccess("PDF RTN guardado con éxito.");
      }
    }
  }

  async subirDni(event: any) {
    if (this.personaNatural.DNI === "") {
      this.mostrarWarning("Por favor ingrese el DNI de la persona.");
      event.target.value = null;
      return;
    }

    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append("pdf", pdf);
      const keyName = this.personaNatural.DNI + "_DNI_PeNa.pdf";
      formData.append("keyName", keyName);
      const res = await this.utilitariosService.subirArchivo(
        this.endpointSubirDNI,
        formData
      );

      console.log(res, "res");
      if (res) {
        this.personaNatural.DNIUrl =
          "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName;
        console.log(this.personaNatural.DNIUrl, "DNIUrl");
        this.mostrarSuccess("PDF DNI guardado con éxito.");
      }
    }
  }

  async subirReciboPublico(event: any) {
    if (this.personaNatural.NumReciboPublico === "") {
      this.mostrarWarning("Por favor ingrese el DNI de la persona.");
      event.target.value = null;
      return;
    }

    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append("pdf", pdf);
      const keyName = this.personaNatural.NumReciboPublico + "_DNI_PeNa.pdf";
      formData.append("keyName", keyName);
      const res = await this.utilitariosService.subirArchivo(
        this.endpointSubirReciboPublico,
        formData
      );

      if (res) {
        this.personaNatural.NumReciboPublicoUrl =
          "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName;
        this.sanitizarUrl(this.personaNatural.NumReciboPublicoUrl);
        this.mostrarSuccess("Recibo público guardado con éxito.");
      }
    }
  }

  verPdf(prop: string) {
    let modalRef = this.modalService.open(ModalPdfComponent, { size: "lg" });
    modalRef.componentInstance.pdfUrl = this.sanitizarUrl(
      this.personaNatural[prop]
    );
  }

  async guardar() {
    if (!this.personaNatural.RtnSolicitante) {
      this.mostrarWarning("Por favor ingrese el RTN del solicitante.");
      return;
    }
    if (!this.personaNatural.RtnSolicitanteUrl) {
      this.mostrarWarning("Por favor adjunte el PDF del RTN del solicitante.");
      return;
    }
    if (!this.personaNatural.DNI) {
      this.mostrarWarning("Por favor ingrese el DNI de la persona.");
      return;
    }
    if (!this.personaNatural.DNIUrl) {
      this.mostrarWarning("Por favor adjunte el PDF del DNI de la persona.");
      return;
    }
    if (!this.personaNatural.Nombre) {
      this.mostrarWarning("Por favor ingrese el nombre de la persona.");
      return;
    }
    if (!this.personaNatural.Apellido) {
      this.mostrarWarning("Por favor ingrese el apellido de la persona.");
      return;
    }
    if (!this.personaNatural.NumReciboPublico) {
      this.mostrarWarning(
        "Por favor ingrese el número de algún recibo público de la persona."
      );
      return;
    }
    if (!this.personaNatural.NumReciboPublicoUrl) {
      this.mostrarWarning(
        "Por favor adjunte el PDF de algún recibo público de la persona."
      );
      return;
    }
    if (!this.personaNatural.esta_Id) {
      this.mostrarWarning("Por favor seleccione un Estado.");
      return;
    }
    if (!this.personaNatural.ciud_Id) {
      this.mostrarWarning("Por favor seleccione una ciudad.");
      return;
    }
    if (!this.personaNatural.DireccionCompleta) {
      this.mostrarWarning(
        "Por favor ingrese la dirección completa de la persona."
      );
      return;
    }
    if (!this.personaNatural.adua_Id) {
      this.mostrarWarning(
        "Por favor seleccione la oficina regional de aduana más cercana a la persona."
      );
      return;
    }
    if (!this.personaNatural.esCi_Id) {
      this.mostrarWarning(
        "Por favor seleccione el estado civil de la persona."
      );
      return;
    }
    if (!this.personaNatural.prof_Id) {
      this.mostrarWarning("Por favor seleccione la profesión de la persona.");
      return;
    }

    if (!this.personaNatural.TelefonoFijo) {
      this.mostrarWarning("Por favor ingrese el teléfono fijo de la persona.");
      return;
    }
    if (!this.personaNatural.TelefonoCelular) {
      this.mostrarWarning(
        "Por favor ingrese el teléfono celular de la persona."
      );
      return;
    }
    if (!this.personaNatural.Correo) {
      this.mostrarWarning("Por favor ingrese el correo de la persona.");
      return;
    }
    if (!this.personaNatural.CorreoAlternativo) {
      this.mostrarWarning(
        "Por favor ingrese un correo alternativo de la persona."
      );
      return;
    }

    await this.personaNaturalService.Crear(this.personaNatural).subscribe(
      (data: any) => {
        if (data.code >= 200 && data.code <= 300) {
          this.mostrarSuccess("Persona natural registrada con éxito.");
        } else {
          this.mostrarError("Ya existe esta persona natural.");
        }
      },
      (error) => {
        this.mostrarError("Error al registrar a la persona.");
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
