import { Component, Input, OnInit, SecurityContext } from "@angular/core";
import { UtilitariosService } from "../../Services/utilitarios.service";
import { ToastrService } from "ngx-toastr";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ComercianteIndividual } from "../../Models/ComercianteIndividualViewModel";
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
import { ComercianteIndividualService } from "../../Services/comercianteIndividual.service";
import { ModalPdfComponent } from "../modal-pdf/modal-pdf.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-form-comerciante-individual",
  templateUrl: "./form-comerciante-individual.component.html",
  styleUrls: ["./form-comerciante-individual.component.css"],
})
export class FormComercianteIndividualComponent implements OnInit {
  // @Input() objetoParaEditar: ComercianteIndividual;
  estados: Estado[];
  ciudades: Ciudad[];
  ciudadesFiltradas: Ciudad[];
  ciudadesFiltradas_RepresentanteLegal: Ciudad[];
  aduanas: Aduana[];
  aduanasFiltradas: Aduana[];
  estadosCiviles: EstadoCivil[];
  profesiones: Profesion[];

  endpointSubirArchivo = "/API/ComercianteIndividual/SubirArchivo";

  comercianteIndividual: ComercianteIndividual = new ComercianteIndividual();

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private utilitariosService: UtilitariosService,
    private estadosService: EstadosService,
    private ciudadesService: CiudadesService,
    private aduanasService: AduanasService,
    private estadosCivilesService: EstadosCivilesService,
    private profesionesService: ProfesionesService,
    private comercianteIndividualService: ComercianteIndividualService,
    private toastr: ToastrService
  ) {}

  isLoading = true;
  ngOnInit() {
    // console.log(this.objetoParaEditar, "Persona natural");

    // if (this.objetoParaEditar) {
    //   this.comercianteIndividual.Id = this.objetoParaEditar.Id;
    //   this.comercianteIndividual.RtnSolicitante =
    //     this.objetoParaEditar.RtnSolicitante;
    //   this.comercianteIndividual.DNI = this.objetoParaEditar.DNI;
    //   this.comercianteIndividual.NumReciboPublico =
    //     this.objetoParaEditar.NumReciboPublico;
    //   this.comercianteIndividual.Estado =
    //     this.objetoParaEditar.Estado ?? "- Seleccionar -";
    //   this.comercianteIndividual.Ciudad =
    //     this.objetoParaEditar.Ciudad ?? "- Seleccionar -";
    //   this.comercianteIndividual.DireccionCompleta =
    //     this.objetoParaEditar.DireccionCompleta;
    //   this.comercianteIndividual.Aduana =
    //     this.objetoParaEditar.Aduana ?? "- Seleccionar -";
    //   this.comercianteIndividual.esCi =
    //     this.objetoParaEditar.esCi ?? "- Seleccionar -";
    //   this.comercianteIndividual.Profesion =
    //     this.objetoParaEditar.Profesion ?? "- Seleccionar -";
    // } else {
    this.comercianteIndividual.RtnSolicitante = "";
    this.comercianteIndividual.esCi = "- Seleccionar -";
    this.comercianteIndividual.Profesion = "- Seleccionar -";
    this.comercianteIndividual.foRe = false;
    this.comercianteIndividual.esCi_RepresentanteLegal = "- Seleccionar -";
    this.comercianteIndividual.Profesion_RepresentanteLegal = "- Seleccionar -";

    this.comercianteIndividual.Estado = "- Seleccionar -";
    this.comercianteIndividual.Ciudad = "- Seleccionar -";
    this.comercianteIndividual.DireccionCompleta = "";

    this.comercianteIndividual.Estado_RepresentanteLegal = "- Seleccionar -";
    this.comercianteIndividual.Ciudad_RepresentanteLegal = "- Seleccionar -";
    this.comercianteIndividual.DireccionCompleta_RepresentanteLegal = "";

    this.comercianteIndividual.Aduana = "- Seleccionar -";

    this.comercianteIndividual.Rtn = "";
    this.comercianteIndividual.Dni = "";

    this.comercianteIndividual.Rtn_RepresentanteLegal = "";
    this.comercianteIndividual.Dni_RepresentanteLegal = "";

    this.comercianteIndividual.Declaracion = "";
    // }

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

  verPdf(prop: string) {
    let modalRef = this.modalService.open(ModalPdfComponent, { size: "lg" });

    console.log(
      this.comercianteIndividual[prop],
      "this.comercianteIndividual[prop]"
    );

    modalRef.componentInstance.pdfUrl = this.sanitizarUrl(
      this.comercianteIndividual[prop]
    );
  }

  sanitizarUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sanitizer.sanitize(SecurityContext.URL, url)
    );
  }

  RtnSolicitanteOnChange(event: any) {
    const val = event.target.value;
    this.comercianteIndividual.RtnSolicitante = val;
  }
  estadoCivilSelect(
    esCiId: number,
    esCi: string,
    EsRepresentanteLegal: boolean
  ) {
    if (EsRepresentanteLegal) {
      this.comercianteIndividual.esCi_Id_RepresentanteLegal = esCiId;
      this.comercianteIndividual.esCi_RepresentanteLegal = esCi;
    } else {
      this.comercianteIndividual.esCi_Id = esCiId;
      this.comercianteIndividual.esCi = esCi;
    }
  }

  profesionSelect(
    profId: number,
    profesion: string,
    EsRepresentanteLegal: boolean
  ) {
    if (EsRepresentanteLegal) {
      this.comercianteIndividual.prof_Id_RepresentanteLegal = profId;
      this.comercianteIndividual.Profesion_RepresentanteLegal = profesion;
    } else {
      this.comercianteIndividual.prof_Id = profId;
      this.comercianteIndividual.Profesion = profesion;
    }
  }

  foReOnChange(val: boolean) {
    this.comercianteIndividual.foRe = val;
  }

  filtrarCiudades(esta_Id: number, EsRepresentanteLegal: boolean) {
    EsRepresentanteLegal
      ? (this.ciudadesFiltradas_RepresentanteLegal = this.ciudades.filter(
          (estado) => estado.esta_Id === esta_Id
        ))
      : (this.ciudadesFiltradas = this.ciudades.filter(
          (estado) => estado.esta_Id === esta_Id
        ));
  }

  estadoSelect(
    estadoId: number,
    estado: string,
    EsRepresentanteLegal: boolean
  ) {
    if (EsRepresentanteLegal) {
      this.comercianteIndividual.esta_Id_RepresentanteLegal = estadoId;
      this.comercianteIndividual.Estado_RepresentanteLegal = estado;
      this.filtrarCiudades(
        this.comercianteIndividual.esta_Id_RepresentanteLegal,
        true
      );
    } else {
      this.comercianteIndividual.esta_Id = estadoId;
      this.comercianteIndividual.Estado = estado;
      this.filtrarCiudades(this.comercianteIndividual.esta_Id, false);
    }
  }

  filtrarAduanas(ciud_Id: number) {
    this.aduanasFiltradas = this.aduanas.filter(
      (adua) => adua.ciud_Id === ciud_Id
    );
  }

  ciudadSelect(ciudId: number, ciudad: string, EsRepresentanteLegal: boolean) {
    if (EsRepresentanteLegal) {
      this.comercianteIndividual.ciud_Id_RepresentanteLegal = ciudId;
      this.comercianteIndividual.Ciudad_RepresentanteLegal = ciudad;
    } else {
      this.comercianteIndividual.ciud_Id = ciudId;
      this.comercianteIndividual.Ciudad = ciudad;
      this.filtrarAduanas(this.comercianteIndividual.ciud_Id);
    }
  }

  DireccionOnChange(event: any, EsRepresentanteLegal: boolean) {
    const val = event.target.value;
    if (EsRepresentanteLegal) {
      this.comercianteIndividual.DireccionCompleta_RepresentanteLegal = val;
    } else {
      this.comercianteIndividual.DireccionCompleta = val;
    }
  }

  aduanaSelect(aduaId: number, aduana: string) {
    this.comercianteIndividual.adua_Id = aduaId;
    this.comercianteIndividual.Aduana = aduana;
  }

  onTelefonoFijoChange(telefonoFijo: string) {
    this.comercianteIndividual.TelefonoFijo = telefonoFijo;
  }

  onTelefonoCelularChange(telefonoCelular: string) {
    this.comercianteIndividual.TelefonoCelular = telefonoCelular;
  }
  onCorreoChange(telefonoFijo: string) {
    this.comercianteIndividual.Correo = telefonoFijo;
  }
  onCorreoAlternativoChange(correoAlternativo: string) {
    this.comercianteIndividual.CorreoAlternativo = correoAlternativo;
  }

  RtnOnChange(event: any, EsRepresentanteLegal: boolean) {
    const val = event.target.value;

    EsRepresentanteLegal
      ? (this.comercianteIndividual.Rtn_RepresentanteLegal = val)
      : (this.comercianteIndividual.Rtn = val);
  }

  DNIOnChange(event: any, EsRepresentanteLegal: boolean) {
    const val = event.target.value;

    EsRepresentanteLegal
      ? (this.comercianteIndividual.Dni_RepresentanteLegal = val)
      : (this.comercianteIndividual.Dni = val);
  }

  DeclaracionOnChange(event: any) {
    const val = event.target.value;

    this.comercianteIndividual.Declaracion = val;
  }

  async subirRtn(event: any, EsRepresentanteLegal: boolean) {
    if (
      EsRepresentanteLegal
        ? this.comercianteIndividual.Rtn_RepresentanteLegal === ""
        : this.comercianteIndividual.Rtn === ""
    ) {
      this.mostrarWarning(
        `Por favor ingrese el RTN del ${
          EsRepresentanteLegal
            ? "Representante Legal"
            : "comerciante individual"
        }.`
      );
      event.target.value = null;
      return;
    }

    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append("pdf", pdf);
      const keyName = EsRepresentanteLegal
        ? this.comercianteIndividual.Rtn_RepresentanteLegal +
          "_RTN_Representante_CoIn.pdf"
        : this.comercianteIndividual.Rtn + "_RTN_CoIn.pdf";
      formData.append("keyName", keyName);
      const res = await this.utilitariosService.subirArchivo(
        this.endpointSubirArchivo,
        formData
      );

      if (res) {
        EsRepresentanteLegal
          ? (this.comercianteIndividual.RtnUrl_RepresentanteLegal =
              "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName)
          : (this.comercianteIndividual.RtnUrl =
              "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName);
        this.sanitizarUrl(
          EsRepresentanteLegal
            ? this.comercianteIndividual.RtnUrl_RepresentanteLegal
            : this.comercianteIndividual.RtnUrl
        );
        this.mostrarSuccess("PDF RTN guardado con éxito.");
      }
    }
  }

  async subirDni(event: any, EsRepresentanteLegal: boolean) {
    if (
      EsRepresentanteLegal
        ? this.comercianteIndividual.Dni_RepresentanteLegal === ""
        : this.comercianteIndividual.Dni === ""
    ) {
      this.mostrarWarning(
        `Por favor ingrese el DNI del ${
          EsRepresentanteLegal
            ? "Representante Legal"
            : "comerciante individual"
        }.`
      );
      event.target.value = null;
      return;
    }

    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append("pdf", pdf);
      const keyName = EsRepresentanteLegal
        ? this.comercianteIndividual.Dni_RepresentanteLegal +
          "_DNI_Representante_CoIn.pdf"
        : this.comercianteIndividual.Dni + "_DNI_CoIn.pdf";
      formData.append("keyName", keyName);
      const res = await this.utilitariosService.subirArchivo(
        this.endpointSubirArchivo,
        formData
      );

      if (res) {
        EsRepresentanteLegal
          ? (this.comercianteIndividual.DniUrl_RepresentanteLegal =
              "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName)
          : (this.comercianteIndividual.DniUrl =
              "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName);
        this.sanitizarUrl(
          EsRepresentanteLegal
            ? this.comercianteIndividual.DniUrl_RepresentanteLegal
            : this.comercianteIndividual.DniUrl
        );
        this.mostrarSuccess("PDF DNI guardado con éxito.");
      }
    }
  }

  async subirDeclaracion(event: any) {
    if (this.comercianteIndividual.Declaracion === "") {
      this.mostrarWarning(
        "Por favor ingrese el número de Declaración de Comerciante Individual."
      );
      event.target.value = null;
      return;
    }

    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append("pdf", pdf);
      const keyName =
        this.comercianteIndividual.Declaracion + "_Declaracion_CoIn.pdf";
      formData.append("keyName", keyName);
      const res = await this.utilitariosService.subirArchivo(
        this.endpointSubirArchivo,
        formData
      );

      if (res) {
        this.comercianteIndividual.DeclaracionUrl =
          "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName;
        this.sanitizarUrl(this.comercianteIndividual.DeclaracionUrl);
        this.mostrarSuccess("Declaración de comerciante guardada con éxito.");
      }
    }
  }

  async guardar() {
    if (!this.comercianteIndividual.RtnSolicitante) {
      this.mostrarWarning("Por favor ingrese el RTN del solicitante.");
      return;
    }
    if (!this.comercianteIndividual.esCi_Id) {
      this.mostrarWarning(
        "Por favor seleccione el estado civil del Comerciante individual."
      );
      return;
    }
    if (!this.comercianteIndividual.prof_Id) {
      this.mostrarWarning(
        "Por favor seleccione la profesión del Comerciante individual."
      );
      return;
    }
    if (!this.comercianteIndividual.esta_Id) {
      this.mostrarWarning("Por favor seleccione un Estado.");
      return;
    }
    if (!this.comercianteIndividual.ciud_Id) {
      this.mostrarWarning("Por favor seleccione una ciudad.");
      return;
    }
    if (!this.comercianteIndividual.DireccionCompleta) {
      this.mostrarWarning(
        "Por favor ingrese la dirección completa del Comerciante individual."
      );
      return;
    }

    if (!this.comercianteIndividual.TelefonoFijo) {
      this.mostrarWarning(
        "Por favor ingrese el teléfono fijo del Comerciante individual."
      );
      return;
    }
    if (!this.comercianteIndividual.TelefonoCelular) {
      this.mostrarWarning(
        "Por favor ingrese el teléfono celular del Comerciante individual."
      );
      return;
    }
    if (!this.comercianteIndividual.Correo) {
      this.mostrarWarning(
        "Por favor ingrese el correo del Comerciante individual."
      );
      return;
    }
    if (!this.comercianteIndividual.CorreoAlternativo) {
      this.mostrarWarning(
        "Por favor ingrese un correo alternativo del Comerciante individual."
      );
      return;
    }
    if (!this.comercianteIndividual.adua_Id) {
      this.mostrarWarning(
        "Por favor seleccione la oficina regional de aduana más cercana al Comerciante individual."
      );
      return;
    }

    if (!this.comercianteIndividual.Rtn) {
      this.mostrarWarning(
        "Por favor ingrese el RTN del Comerciante Individual."
      );
      return;
    }
    if (!this.comercianteIndividual.RtnUrl) {
      this.mostrarWarning(
        "Por favor adjunte el PDF del RTN del Comerciante Individual."
      );
      return;
    }
    if (!this.comercianteIndividual.Dni) {
      this.mostrarWarning(
        "Por favor ingrese el DNI del Comerciante Individual."
      );
      return;
    }
    if (!this.comercianteIndividual.DniUrl) {
      this.mostrarWarning(
        "Por favor adjunte el PDF del DNI del Comerciante Individual."
      );
      return;
    }
    if (!this.comercianteIndividual.Declaracion) {
      this.mostrarWarning(
        "Por favor ingrese el número de Declaración de Comerciante Individual."
      );
      return;
    }
    if (!this.comercianteIndividual.DeclaracionUrl) {
      this.mostrarWarning(
        "Por favor adjunte el PDF de la Declaración de Comerciante Individual."
      );
      return;
    }
    if (this.comercianteIndividual.foRe) {
      if (!this.comercianteIndividual.esCi_Id_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor seleccione el estado civil del representante legal."
        );
        return;
      }
      if (!this.comercianteIndividual.prof_Id_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor seleccione la profesión del representante legal."
        );
        return;
      }
      if (!this.comercianteIndividual.esta_Id_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor seleccione el Estado del representante legal."
        );
        return;
      }
      if (!this.comercianteIndividual.ciud_Id_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor seleccione la ciudad del representante legal."
        );
        return;
      }
      if (!this.comercianteIndividual.DireccionCompleta_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor ingrese la dirección completa del representante legal."
        );
        return;
      }
      if (!this.comercianteIndividual.Rtn_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor ingrese el RTN del Representante Legal."
        );
        return;
      }
      if (!this.comercianteIndividual.RtnUrl_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor adjunte el PDF del RTN del Representante Legal."
        );
        return;
      }
      if (!this.comercianteIndividual.Dni_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor ingrese el DNI del Representante Legal."
        );
        return;
      }
      if (!this.comercianteIndividual.DniUrl_RepresentanteLegal) {
        this.mostrarWarning(
          "Por favor adjunte el PDF del DNI del Representante Legal."
        );
        return;
      }
    }

    await this.comercianteIndividualService
      .Crear(this.comercianteIndividual)
      .subscribe(
        (data: any) => {
          if (data.code >= 200 && data.code <= 300) {
            this.mostrarSuccess("Comerciante individual registrado con éxito.");
          } else {
            this.mostrarError("Ya existe este Comerciante individual.");
          }
        },
        (error) => {
          this.mostrarError("Error al registrar el Comerciante individual.");
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
