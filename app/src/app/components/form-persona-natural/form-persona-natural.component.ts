import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from 'src/app/Services/utilitarios.service';

@Component({
  selector: 'app-form-persona-natural',
  templateUrl: './form-persona-natural.component.html',
  styleUrls: ['./form-persona-natural.component.css']
})
export class FormPersonaNaturalComponent implements OnInit {
  
  constructor(
    private utilitariosService: UtilitariosService) {}
  
  ngOnInit() {
  }

  subirArchivo(){
    this.utilitariosService.subirImagen();
  }

}
