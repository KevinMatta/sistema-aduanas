import { Component, OnInit } from '@angular/core';
import {PersonaNaturalService} from '../../Services/persona-natural.service'
import { Router } from '@angular/router';
// import { PersonaNatural } from 'src/app/Models/PersonaNaturalViewModel';

@Component({
  selector: 'app-index-persona-natural',
  templateUrl: './index-persona-natural.component.html',
  styleUrls: ['./index-persona-natural.component.css']
})
export class IndexPersonaNaturalComponent implements OnInit {

  // personasNaturales:PersonaNatural[];
  constructor(private service: PersonaNaturalService, private router: Router) { }

  ngOnInit(): void {
    this.service.getPersonasNaturales().subscribe((data:any) => {
      console.log(data);
      // this.personasNaturales = data;
    }, error=>{
      console.log(error);
      
    });
  }

}
