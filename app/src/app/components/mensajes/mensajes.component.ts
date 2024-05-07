import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  @Input('titulo') titulo: string = "Titulo";
  constructor(private toastr: ToastrService,) { }

  ngOnInit() {
  }
  mostrarSuccess(mensaje:string) {
    this.toastr.success(`<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`, '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }
  mostrarWarning(mensaje: string){
    this.toastr.warning(`<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`, '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }
  mostrarError(mensaje:string) {
    this.toastr.error(`<span class="now-ui-icons ui-1_bell-53"></span> ${mensaje}`, '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-error alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }
}
