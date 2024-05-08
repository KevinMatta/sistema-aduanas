import { Component, OnInit } from '@angular/core';
// import {} from '../components/form-ubicacion/form-ubicacion.component';

@Component({
  selector: 'app-form-comerciante-individual',
  templateUrl: './form-comerciante-individual.component.html',
  styleUrls: ['./form-comerciante-individual.component.css']
})
export class FormComercianteIndividualComponent implements OnInit {

  tituloUbicacionComerciante = "DOMICILIO DEL COMERCIANTE (PARA EFECTO DE UBICACION, EN EL CONTRATO DE ADHESION SE MOSTRARA EL DOMICILIO FISCAL REGISTRADO EN LA ADMINISTRACION TRIBUTARIA)";
  tituloUbicacionRepresentante = "DOMICILIO DEL REPRESENTANTE LEGAL (SI HUBIESE INFORMADO REPRESENTACION BAJO UN REPRESENTANTE LEGAL)";
  constructor() { }

  ngOnInit() {
  }

}
