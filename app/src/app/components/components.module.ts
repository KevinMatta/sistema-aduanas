import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { FormUbicacionComponent } from "./form-ubicacion/form-ubicacion.component";
import { FormComercianteIndividualComponent } from "./form-comerciante-individual/form-comerciante-individual.component";
import { FormPersonaNaturalComponent } from "./form-persona-natural/form-persona-natural.component";
import { FormPersonaJuridicaComponent } from "./form-persona-juridica/form-persona-juridica.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { IndexListaComponent } from "./index-lista/index-lista.component";
import { LoginComponent } from "./login/login.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { BrowserModule } from "@angular/platform-browser";
import { FormContactoComponent } from "./form-contacto/form-contacto.component";
import { FormDeclaracionValorComponent } from "./form-declaracion-valor/form-declaracion-valor.component";
// import { FormUsuariosComponent } from "./form-usuarios/form-usuarios.component";
import { RolesPorPantallaComponent } from "./roles-por-pantalla/roles-por-pantalla.component";
import { MensajesComponent } from "./mensajes/mensajes.component";
import { PdfPersonaNaturalComponent } from "./pdf-persona-natural/pdf-persona-natural.component";
import { PdfComercianteIndividualComponent } from "./pdf-comerciante-individual/pdf-comerciante-individual.component";
import { FormUsuariosComponent } from "./form-usuarios/form-usuarios.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    BrowserModule,
    NgbModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormUbicacionComponent,
    FormContactoComponent,
    RolesPorPantallaComponent,
    FormPersonaNaturalComponent,
    PdfPersonaNaturalComponent,
    FormComercianteIndividualComponent,
    PdfComercianteIndividualComponent,
    FormPersonaJuridicaComponent,
    FormDeclaracionValorComponent,
    IndexListaComponent,
    MensajesComponent,
    LoginComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    RolesPorPantallaComponent,
    SidebarComponent,
    FormUbicacionComponent,
    FormContactoComponent,
    FormPersonaNaturalComponent,
    PdfPersonaNaturalComponent,
    FormComercianteIndividualComponent,
    FormPersonaJuridicaComponent,
    FormDeclaracionValorComponent,
    IndexListaComponent,
    MensajesComponent,
    LoginComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ComponentsModule {}
