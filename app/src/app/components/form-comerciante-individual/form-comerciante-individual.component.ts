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

  endpointSubirRTN = "/API/comercianteIndividual/SubirRTNsolicitante";

  comercianteIndividual: ComercianteIndividual = new ComercianteIndividual();

  trustedUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private utilitariosService: UtilitariosService,
    private estadosService: EstadosService,
    private ciudadesService: CiudadesService,
    private aduanasService: AduanasService,
    private estadosCivilesService: EstadosCivilesService,
    private profesionesService: ProfesionesService,
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

  sanitizarUrl(url: string) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
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

  DNIOnChange(event: any) {
    const val = event.target.value;
    this.comercianteIndividual.Dni = val;
  }

  DeclaracionOnChange(event: any) {
    const val = event.target.value;
    this.comercianteIndividual.Declaracion = val;
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

  async subirArchivo(event: any) {
    if (this.comercianteIndividual.RtnSolicitante == "") {
      this.toastr.warning(
        '<span class="now-ui-icons ui-1_bell-53"></span> Por favor ingrese el RTN del solicitante.',
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: "toast-bottom-right",
        }
      );
      event.target.value = null;
      return;
    }

    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append("pdf", pdf);
      const keyName =
        this.comercianteIndividual.RtnSolicitante + "_RTNsolicitante_PeNa.pdf";
      formData.append("keyName", keyName);
      const res = await this.utilitariosService.subirArchivo(
        this.endpointSubirRTN,
        formData
      );
      console.log(res);

      if (res) {
        this.comercianteIndividual.RtnUrl =
          "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName;
        this.sanitizarUrl(this.comercianteIndividual.RtnUrl);
        console.log(this.trustedUrl, "trustedUrl");

        this.toastr.success(
          '<span class="now-ui-icons ui-1_bell-53"></span> RTN guardado con éxito.',
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
    }
  }
}
