import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-contacto',
  templateUrl: './form-contacto.component.html',
  styleUrls: ['./form-contacto.component.css']
})
export class FormContactoComponent implements OnInit {

  @Input('entidad') entidad: string = "DE LA ???";

  constructor() { }

  ngOnInit() {
  }

}
