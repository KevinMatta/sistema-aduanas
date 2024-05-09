import { Component, OnInit, SecurityContext, Input } from '@angular/core';
import { UtilitariosService } from '../../Services/utilitarios.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PersonaNatural } from "../../Models/PersonaNaturalViewModel";
import { Estado } from "../../Models/EstadosViewModel";
import { Ciudad } from "../../Models/CiudadesViewModel";
import { EstadoCivil } from "../../Models/EstadosCivilesViewModel";
import { Aduana } from '../../Models/AduanasViewModel';
import { EstadosService } from "../../Services/estados.service";
import { CiudadesService } from '../../Services/ciudades.service';
import { AduanasService } from '../../Services/aduanas.service';
import { EstadosCivilesService } from '../../Services/estados-civiles.service';
import { ProfesionesService } from '../../Services/profesiones.service';
import { Profesion } from '../../Models/ProfesionesViewModel';
// import * as html2pdf from "html2pdf.js";

@Component({
  selector: 'app-form-persona-natural',
  templateUrl: './form-persona-natural.component.html',
  styleUrls: ['./form-persona-natural.component.css']
})
export class FormPersonaNaturalComponent implements OnInit {
  @Input() objetoParaEditar: PersonaNatural;
  estados: Estado[];
  ciudades: Ciudad[];
  ciudadesFiltradas: Ciudad[];
  aduanas: Aduana[];
  estadosCiviles: EstadoCivil[];
  profesiones: Profesion[];

  endpointSubirRTN = "/API/PersonaNatural/SubirRTNsolicitante";

  personaNatural: PersonaNatural = new PersonaNatural();

  trustedUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private utilitariosService: UtilitariosService,
    private estadosService: EstadosService,
    private ciudadesService: CiudadesService,
    private aduanasService: AduanasService,
    private estadosCivilesService: EstadosCivilesService,
    private profesionesService: ProfesionesService,
    private toastr: ToastrService) {
  }

  isLoading = true;
  ngOnInit() {
    console.log(this.objetoParaEditar, 'Persona natural');

    if (this.objetoParaEditar) {
      this.personaNatural.Id = this.objetoParaEditar.Id;
      this.personaNatural.RtnSolicitante = this.objetoParaEditar.RtnSolicitante;
      this.personaNatural.DNI = this.objetoParaEditar.DNI;
      this.personaNatural.NumReciboPublico = this.objetoParaEditar.NumReciboPublico;
      this.personaNatural.Estado = this.objetoParaEditar.Estado ?? "- Seleccionar -";
      this.personaNatural.Ciudad = this.objetoParaEditar.Ciudad ?? "- Seleccionar -";
      this.personaNatural.DireccionCompleta = this.objetoParaEditar.DireccionCompleta;
      this.personaNatural.Aduana = this.objetoParaEditar.Aduana ?? "- Seleccionar -";
      this.personaNatural['Estado Civil'] = this.objetoParaEditar['Estado Civil'] ?? "- Seleccionar -";
      this.personaNatural.Profesion = this.objetoParaEditar.Profesion ?? "- Seleccionar -";
    } else {
      this.personaNatural.RtnSolicitante = "";
      this.personaNatural.DNI = "";
      this.personaNatural.NumReciboPublico = "";
      this.personaNatural.Estado = "- Seleccionar -";
      this.personaNatural.Ciudad = "- Seleccionar -";
      this.personaNatural.DireccionCompleta = "";
      this.personaNatural.Aduana = "- Seleccionar -";
      this.personaNatural['Estado Civil'] = "- Seleccionar -";
      this.personaNatural.Profesion = "- Seleccionar -";
    }

    this.estadosService.getData().subscribe(
      (data: Estado[]) => {
        this.estados = data.filter(esta=>esta.Pais === "Honduras");
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
    this.personaNatural.RtnSolicitante = val;
  }

  DNIOnChange(event: any) {
    const val = event.target.value;
    this.personaNatural.DNI = val;
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

  ciudadSelect(ciudId: number, ciudad: string) {
    this.personaNatural.ciud_Id = ciudId;
    this.personaNatural.Ciudad = ciudad;
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
    this.personaNatural['Estado Civil'] = esCi;
  }

  onTelefonoFijoChange(telefonoFijo:string) {
    this.personaNatural.TelefonoFijo = telefonoFijo;
  }

  onTelefonoCelularChange(telefonoCelular:string) {
    this.personaNatural.TelefonoCelular = telefonoCelular;
  }
  onCorreoChange(telefonoFijo:string) {
    this.personaNatural.Correo = telefonoFijo;
  }
  onCorreoAlternativoChange(correoAlternativo:string) {
    this.personaNatural.CorreoAlternativo = correoAlternativo;
  }

  async subirArchivo(event: any) {
    if (this.personaNatural.RtnSolicitante == "") {
      this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> Por favor ingrese el RTN del solicitante.', '', {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: 'toast-bottom-right'
      });
      event.target.value = null;
      return;
    }

    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append('pdf', pdf);
      const keyName = this.personaNatural.RtnSolicitante + '_RTNsolicitante_PeNa.pdf';
      formData.append('keyName', keyName);
      const res = await this.utilitariosService.subirArchivo(this.endpointSubirRTN, formData);
      console.log(res);

      if (res) {
        this.personaNatural.RtnSolicitanteUrl = "https://kobybucketvjeb.s3.us-east-2.amazonaws.com/" + keyName;
        this.sanitizarUrl(this.personaNatural.RtnSolicitanteUrl);
        console.log(this.trustedUrl, 'trustedUrl');


        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> RTN guardado con éxito.', '', {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-bottom-right'
        });
      }
    }
  }
}
