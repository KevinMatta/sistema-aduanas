import { Component, OnInit, SecurityContext } from '@angular/core';
import { UtilitariosService } from '../../Services/utilitarios.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PersonaNatural } from "../../Models/PersonaNaturalViewModel";
// import * as html2pdf from "html2pdf.js";

@Component({
  selector: 'app-form-persona-natural',
  templateUrl: './form-persona-natural.component.html',
  styleUrls: ['./form-persona-natural.component.css']
})
export class FormPersonaNaturalComponent implements OnInit {

  endpointSubirRTN = "/API/PersonaNatural/SubirRTNsolicitante";

  personaNatural:PersonaNatural = new PersonaNatural();

  trustedUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private utilitariosService: UtilitariosService,
    private toastr: ToastrService) {
  }
  ngOnInit() {
  }

  sanitizarUrl(url: string) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sanitizer.sanitize(SecurityContext.URL, url)
    );
  }

  // convertHtml2Pdf() {
  //   const options = {
  //     filename: 'boletin',
  //     image: { type: 'jpeg' },
  //     html2canvas: {},
  //     jsPDF: { orientation: 'vertical' },
  //   };
  //   const content: Element = document.getElementById('boletin');
  //   // html2pdf().from(content).set(options).save();
  // }

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
      const keyName = this.personaNatural.RtnSolicitante + '_RTNsolicitante_PeNa.pdf'
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
