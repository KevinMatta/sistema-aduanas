import { Component, Input, OnInit } from '@angular/core';
import { PaisesService } from "../../Services/paises.service";
import { Pais } from "../../Models/PaisesViewModel";
@Component({
  selector: 'app-form-aduanas',
  templateUrl: './form-aduanas.component.html',
  styleUrls: ['./form-aduanas.component.css']
})
export class FormAduanasComponent implements OnInit {
  paises: Pais[];
  constructor(
    private paisesService: PaisesService,
    ) { }

  ngOnInit() {

    this.paisesService.getData().subscribe(
      (data: Pais[]) => {
        this.paises = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
