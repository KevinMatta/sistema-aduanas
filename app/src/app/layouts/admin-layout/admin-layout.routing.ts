import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
// import { FormUbicacionComponent } from '../../components/form-ubicacion/form-ubicacion.component';
import { FormPersonaNaturalComponent } from "../../components/form-persona-natural/form-persona-natural.component";
import { FormComercianteIndividualComponent } from "../../components/form-comerciante-individual/form-comerciante-individual.component";
import { FormPersonaJuridicaComponent } from "../../components/form-persona-juridica/form-persona-juridica.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { IndexListaComponent } from "../../components/index-lista/index-lista.component";
// import { LoginComponent } from '../../components/login/login.component';
import { FormDeclaracionValorComponent } from "../../components/form-declaracion-valor/form-declaracion-valor.component";
import { BoletinComponent } from "../../components/boletin/boletin.component";
import { FormUsuariosComponent } from "../../components/form-usuarios/form-usuarios.component";
import { RolesPorPantallaComponent } from "../../components/roles-por-pantalla/roles-por-pantalla.component";
// import { LoginComponent } from "../../components/login/login.component";

export const AdminLayoutRoutes: Routes = [
  { path: "layout/dashboard", component: DashboardComponent },
  {
    path: "layout/index-usuarios",
    component: IndexListaComponent,
    data: { titulo: "Usuarios" },
  },
  // { path: "layout/form-usuarios", component: FormUsuariosComponent },
  {
    path: "layout/index-roles",
    component: IndexListaComponent,
    data: { titulo: "Roles" },
  },
  { path: "layout/roles-por-pantalla", component: RolesPorPantallaComponent },
  {
    path: "layout/index-aduanas",
    component: IndexListaComponent,
    data: { titulo: "Aduanas" },
  },
  {
    path: "layout/index-empresas",
    component: IndexListaComponent,
    data: { titulo: "Empresas" },
  },
  {
    path: "layout/index-paises",
    component: IndexListaComponent,
    data: { titulo: "Paises" },
  },
  {
    path: "layout/index-estados",
    component: IndexListaComponent,
    data: { titulo: "Estados" },
  },
  {
    path: "layout/index-ciudades",
    component: IndexListaComponent,
    data: { titulo: "Ciudades" },
  },
  {
    path: "layout/index-profesiones",
    component: IndexListaComponent,
    data: { titulo: "Profesiones" },
  },
  {
    path: "layout/index-empleados",
    component: IndexListaComponent,
    data: { titulo: "Empleados" },
  },
  {
    path: "layout/index-estados-civiles",
    component: IndexListaComponent,
    data: { titulo: "Estados Civiles" },
  },
  // { path: 'form-ubicacion',   component: FormUbicacionComponent },
  {
    path: "layout/form-persona-natural",
    component: FormPersonaNaturalComponent,
  },
  {
    path: "layout/form-comerciante-individual",
    component: FormComercianteIndividualComponent,
  },
  {
    path: "layout/form-persona-juridica",
    component: FormPersonaJuridicaComponent,
  },
  {
    path: "layout/form-declaracion-valor",
    component: FormDeclaracionValorComponent,
  },
  { path: "layout/boletin", component: BoletinComponent },
  { path: "layout/table-list", component: TableListComponent },
  { path: "layout/icons", component: IconsComponent },
  { path: "layout/maps", component: MapsComponent },
  { path: "layout/notifications", component: NotificationsComponent },
  // { path: "login", component: LoginComponent },
];
