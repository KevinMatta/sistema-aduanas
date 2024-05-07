import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, Injectable, Input } from '@angular/core';
import { DataService } from './data.service';
import { APIResponse } from '../Models/APIResponseViewModel';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Pais } from '../Models/PaisesViewModel';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class MensajesService{
    constructor(private componente:Component, private toastr: ToastrService,) {}

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
