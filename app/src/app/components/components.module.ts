import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { FormUbicacionComponent } from './form-ubicacion/form-ubicacion.component';
import { FormComercianteIndividualComponent } from './form-comerciante-individual/form-comerciante-individual.component';
import { FormPersonaNaturalComponent } from './form-persona-natural/form-persona-natural.component';
import { FormPersonaJuridicaComponent } from './form-persona-juridica/form-persona-juridica.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IndexListaComponent } from './index-lista/index-lista.component';
import { LoginComponent } from './login/login.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { FormContactoComponent } from './form-contacto/form-contacto.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    BrowserModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormUbicacionComponent,
    FormContactoComponent,
    FormPersonaNaturalComponent,
    FormComercianteIndividualComponent,
    FormPersonaJuridicaComponent,
    IndexListaComponent,
    LoginComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormUbicacionComponent,
    FormContactoComponent,
    FormPersonaNaturalComponent,
    FormComercianteIndividualComponent,
    FormPersonaJuridicaComponent,
    IndexListaComponent,
    LoginComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ComponentsModule { }
