import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from '../../Services/utilitarios.service';

@Component({
  selector: 'app-form-persona-natural',
  templateUrl: './form-persona-natural.component.html',
  styleUrls: ['./form-persona-natural.component.css']
})
export class FormPersonaNaturalComponent implements OnInit {
  
  endpointSubirRTN = "/PersonaNatural/SubirRTN";

  constructor(
    private utilitariosService: UtilitariosService) {}
  
  ngOnInit() {
  }

  subirArchivo(event:any){
    if (event.target.files.length > 0) {
      const pdf = event.target.files[0];
      const formData = new FormData();
      formData.append('pdf', pdf);
      this.utilitariosService.subirImagen(this.endpointSubirRTN, formData);
    }
  }

}
