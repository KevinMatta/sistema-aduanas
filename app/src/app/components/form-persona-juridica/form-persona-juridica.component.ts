import { Component, Input, OnInit, SecurityContext } from "@angular/core";
import { UtilitariosService } from "../../Services/utilitarios.service";
import { ToastrService } from "ngx-toastr";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PersonaJuridica } from "../../Models/PersonaJuridicaViewModel";
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
  selector: "app-form-persona-juridica",
  templateUrl: "./form-persona-juridica.component.html",
  styleUrls: ["./form-persona-juridica.component.css"],
})
export class FormPersonaJuridicaComponent implements OnInit {
  // @Input() objetoParaEditar: PersonaJuridica;
  estados: Estado[];
  ciudades: Ciudad[];
  ciudadesFiltradas: Ciudad[];
  ciudadesFiltradas_RepresentanteLegal: Ciudad[];
  aduanas: Aduana[];
  aduanasFiltradas: Aduana[];
  estadosCiviles: EstadoCivil[];
  profesiones: Profesion[];

  endpointSubirRTN = "/API/PersonaJuridica/SubirRTNsolicitante";

  personaJuridica: PersonaJuridica = new PersonaJuridica();

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
    //   this.personaJuridica.Id = this.objetoParaEditar.Id;
    //   this.personaJuridica.RtnSolicitante =
    //     this.objetoParaEditar.RtnSolicitante;
    //   this.personaJuridica.DNI = this.objetoParaEditar.DNI;
    //   this.personaJuridica.NumReciboPublico =
    //     this.objetoParaEditar.NumReciboPublico;
    //   this.personaJuridica.Estado =
    //     this.objetoParaEditar.Estado ?? "- Seleccionar -";
    //   this.personaJuridica.Ciudad =
    //     this.objetoParaEditar.Ciudad ?? "- Seleccionar -";
    //   this.personaJuridica.DireccionCompleta =
    //     this.objetoParaEditar.DireccionCompleta;
    //   this.personaJuridica.Aduana =
    //     this.objetoParaEditar.Aduana ?? "- Seleccionar -";
    //   this.personaJuridica.esCi =
    //     this.objetoParaEditar.esCi ?? "- Seleccionar -";
    //   this.personaJuridica.Profesion =
    //     this.objetoParaEditar.Profesion ?? "- Seleccionar -";
    // } else {
    this.personaJuridica.RtnSolicitante = "";
    this.personaJuridica.esCi_RepresentanteLegal = "- Seleccionar -";
    this.personaJuridica.Profesion_RepresentanteLegal = "- Seleccionar -";

    this.personaJuridica.Estado = "- Seleccionar -";
    this.personaJuridica.Ciudad = "- Seleccionar -";
    this.personaJuridica.DireccionCompleta = "";

    this.personaJuridica.Estado_RepresentanteLegal = "- Seleccionar -";
    this.personaJuridica.Ciudad_RepresentanteLegal = "- Seleccionar -";
    this.personaJuridica.DireccionCompleta_RepresentanteLegal = "";

    this.personaJuridica.Aduana = "- Seleccionar -";

    this.personaJuridica.Rtn = "";
    this.personaJuridica.Rtn_RepresentanteLegal = "";
    this.personaJuridica.Dni_RepresentanteLegal = "";

    this.personaJuridica.EscrituraPublica = "";
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
    this.personaJuridica.RtnSolicitante = val;
  }
  estadoCivilSelect(esCiId: number, esCi: string) {
    this.personaJuridica.esCi_Id_RepresentanteLegal = esCiId;
    this.personaJuridica.esCi_RepresentanteLegal = esCi;
  }

  profesionSelect(profId: number, profesion: string) {
    this.personaJuridica.prof_Id_RepresentanteLegal = profId;
    this.personaJuridica.Profesion_RepresentanteLegal = profesion;
  }

  DNIOnChange(event: any) {
    const val = event.target.value;
    this.personaJuridica.Dni_RepresentanteLegal = val;
  }

  EscrituraPublicaOnChange(event: any) {
    const val = event.target.value;
    this.personaJuridica.EscrituraPublica = val;
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
      this.personaJuridica.esta_Id_RepresentanteLegal = estadoId;
      this.personaJuridica.Estado_RepresentanteLegal = estado;
      this.filtrarCiudades(
        this.personaJuridica.esta_Id_RepresentanteLegal,
        true
      );
    } else {
      this.personaJuridica.esta_Id = estadoId;
      this.personaJuridica.Estado = estado;
      this.filtrarCiudades(this.personaJuridica.esta_Id, false);
    }
  }

  filtrarAduanas(ciud_Id: number) {
    this.aduanasFiltradas = this.aduanas.filter(
      (adua) => adua.ciud_Id === ciud_Id
    );
  }

  ciudadSelect(ciudId: number, ciudad: string, EsRepresentanteLegal: boolean) {
    if (EsRepresentanteLegal) {
      this.personaJuridica.ciud_Id_RepresentanteLegal = ciudId;
      this.personaJuridica.Ciudad_RepresentanteLegal = ciudad;
    } else {
      this.personaJuridica.ciud_Id = ciudId;
      this.personaJuridica.Ciudad = ciudad;
      this.filtrarAduanas(this.personaJuridica.ciud_Id);
    }
  }

  DireccionOnChange(event: any, EsRepresentanteLegal: boolean) {
    const val = event.target.value;
    if (EsRepresentanteLegal) {
      this.personaJuridica.DireccionCompleta_RepresentanteLegal = val;
    } else {
      this.personaJuridica.DireccionCompleta = val;
    }
  }

  aduanaSelect(aduaId: number, aduana: string) {
    this.personaJuridica.adua_Id = aduaId;
    this.personaJuridica.Aduana = aduana;
  }

  onTelefonoFijoChange(telefonoFijo: string) {
    this.personaJuridica.TelefonoFijo = telefonoFijo;
  }

  onTelefonoCelularChange(telefonoCelular: string) {
    this.personaJuridica.TelefonoCelular = telefonoCelular;
  }
  onCorreoChange(telefonoFijo: string) {
    this.personaJuridica.Correo = telefonoFijo;
  }
  onCorreoAlternativoChange(correoAlternativo: string) {
    this.personaJuridica.CorreoAlternativo = correoAlternativo;
  }

  async subirArchivo(event: any) {
    if (this.personaJuridica.RtnSolicitante == "") {
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
        this.personaJuridica.RtnSolicitante + "_RTNsolicitante_PeNa.pdf";
      formData.append("keyName", keyName);
      const res = await this.utilitariosService.subirArchivo(
        this.endpointSubirRTN,
        formData
      );
      console.log(res);

      if (res) {
        this.personaJuridica.RtnUrl =
          "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName;
        this.sanitizarUrl(this.personaJuridica.RtnUrl);
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
