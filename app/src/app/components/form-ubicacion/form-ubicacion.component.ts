import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-ubicacion',
  templateUrl: './form-ubicacion.component.html',
  styleUrls: ['./form-ubicacion.component.css']
})
export class FormUbicacionComponent implements OnInit {

  @Input('titulo') titulo: string = "Titulo";
  constructor() { }

  ngOnInit() {
  }

}
