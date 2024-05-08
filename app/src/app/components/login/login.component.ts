import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  login(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/layout']);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
