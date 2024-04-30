import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { FormUbicacionComponent } from './form-ubicacion/form-ubicacion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
    // ,
    // FormUbicacionComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
    // ,
    // FormUbicacionComponent
  ]
})
export class ComponentsModule { }
