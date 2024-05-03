import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from '../../Services/utilitarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-persona-natural',
  templateUrl: './form-persona-natural.component.html',
  styleUrls: ['./form-persona-natural.component.css']
})
export class FormPersonaNaturalComponent implements OnInit {
  
  endpointSubirRTN = "/API/PersonaNatural/SubirRTN";

  constructor(
    private utilitariosService: UtilitariosService,
    private toastr: ToastrService) {}
  
  ngOnInit() {
  }

  async subirArchivo(event:any){
    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append('pdf', pdf);
      const res = await this.utilitariosService.subirImagen(this.endpointSubirRTN, formData);
      console.log(res);
      
      if (res) {
        console.log('d');
        
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
