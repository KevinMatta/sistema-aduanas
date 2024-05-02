import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/index-usuarios', title: 'Usuarios',  icon:'text_caps-small', class: '', },
    { path: '/index-roles', title: 'Roles',  icon:'text_caps-small', class: '', },
    { path: '/index-aduanas', title: 'Aduanas',  icon:'text_caps-small', class: '', },
    { path: '/index-empleados', title: 'Empleados',  icon:'text_caps-small', class: '', },
    { path: '/index-paises', title: 'Paises',  icon:'text_caps-small', class: '', },
    { path: '/index-estados', title: 'Estados',  icon:'text_caps-small', class: '', },
    { path: '/index-ciudades', title: 'Ciudades',  icon:'text_caps-small', class: '', },
    { path: '/index-empresas', title: 'Empresas',  icon:'text_caps-small', class: '', },
    { path: '/index-estados-civiles', title: 'Estados Civiles',  icon:'text_caps-small', class: '', },
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/form-persona-natural', title: 'Persona Natural',  icon:'users_single-02', class: '' },
    { path: '/form-comerciante-individual', title: 'Comerciante individual',  icon:'users_single-02', class: '' },
    { path: '/form-persona-juridica', title: 'Persona Juridica',  icon:'shopping_shop', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    // { path: '/login', title: 'Iniciar Sesión',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
