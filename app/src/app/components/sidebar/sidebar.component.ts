import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/index-usuarios', title: 'Acce.Usuarios',  icon:'text_caps-small', class: '', },
    { path: '/form-usuarios', title: 'Acce.Usuarios',  icon:'text_caps-small', class: '', },
    { path: '/index-roles', title: 'Acce.Roles',  icon:'text_caps-small', class: '', },
    { path: '/index-aduanas', title: 'Adua.Aduanas',  icon:'text_caps-small', class: '', },
    { path: '/index-empleados', title: 'Gral.Empleados',  icon:'text_caps-small', class: '', },
    { path: '/index-paises', title: 'Gral.Paises',  icon:'text_caps-small', class: '', },
    { path: '/index-estados', title: 'Gral.Estados',  icon:'text_caps-small', class: '', },
    { path: '/index-ciudades', title: 'Gral.Ciudades',  icon:'text_caps-small', class: '', },
    { path: '/index-empresas', title: 'Adua.Empresas',  icon:'text_caps-small', class: '', },
    { path: '/index-estados-civiles', title: 'Gral.Estados Civiles',  icon:'text_caps-small', class: '', },
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/form-persona-natural', title: 'Adua.Persona Natural',  icon:'users_single-02', class: '' },
    { path: '/form-comerciante-individual', title: 'Adua.Comerciante individual',  icon:'users_single-02', class: '' },
    { path: '/form-persona-juridica', title: 'Adua.Persona Juridica',  icon:'shopping_shop', class: '' },
    { path: '/form-declaracion-valor', title: 'Adua.Declaración de valor',  icon:'files_single-copy-04', class: '' },
    { path: '/boletin', title: 'Adua.Boletín de pago',  icon:'files_paper', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    // { path: '/login', title: 'Iniciar Sesión',  icon:'objects_spaceship', class: 'active active-pro' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isCollapsed: { [key: string]: boolean } = {
    Acce: true,
    Gral: true,
    Adua: true,
  };
  // public isAccesoCollapsed = true;
  // public isGeneralCollapsed = true;
  // public isAduanaCollapsed = true;

  toggleCollapse(schema: string) {
    this.isCollapsed[schema] = !this.isCollapsed[schema];
  }

  belongsToSchema(menuItem: RouteInfo, schema: string): boolean {
    return menuItem.title.includes(schema);
  }

  belongsToAnySchema(menuItem: RouteInfo): boolean {
    return !['Acce', 'Gral', 'Adua'].some((schema) =>{ 
        // console.log(this.belongsToSchema(menuItem, schema), menuItem, schema);
        return this.belongsToSchema(menuItem, schema)
      }
    );
  }  

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
