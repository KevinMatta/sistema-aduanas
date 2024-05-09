import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-form-contacto',
  templateUrl: './form-contacto.component.html',
  styleUrls: ['./form-contacto.component.css']
})
export class FormContactoComponent implements OnInit {

  @Input('entidad') entidad: string = "DE LA ???";
  @Output() telefonoFijoEmpresa: EventEmitter<string> = new EventEmitter();
  @Output() telefonoFijo: EventEmitter<string> = new EventEmitter();
  @Output() telefonoCelular: EventEmitter<string> = new EventEmitter();
  @Output() correo: EventEmitter<string> = new EventEmitter();
  @Output() correoAlternativo: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  telefonoFijoEmpresaOnChange(event:any) {
    this.telefonoFijoEmpresa.emit(event.target.value);
  }
  telefonoFijoOnChange(event:any) {
    this.telefonoFijo.emit(event.target.value);
  }

  telefonoCelularOnChange(event:any) {
    this.telefonoCelular.emit(event.target.value);
  }
  correoOnChange(event:any) {
    this.correo.emit(event.target.value);
  }
  correoAlternativoOnChange(event:any) {
    this.correoAlternativo.emit(event.target.value);
  }

}
