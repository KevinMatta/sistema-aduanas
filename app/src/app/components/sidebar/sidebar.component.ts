import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "dashboard",
    title: "Dashboard",
    icon: "design_app",
    class: "",
  },
  {
    path: "layout/index-usuarios",
    title: "Acce.Usuarios",
    icon: "text_caps-small",
    class: "",
  },
  // {
  //   path: "layout/form-usuarios",
  //   title: "Acce.Usuarios",
  //   icon: "text_caps-small",
  //   class: "",
  // },
  {
    path: "layout/index-roles",
    title: "Acce.Roles",
    icon: "text_caps-small",
    class: "",
  },
  {
    path: "layout/index-aduanas",
    title: "Adua.Aduanas",
    icon: "text_caps-small",
    class: "",
  },
  {
    path: "layout/index-empleados",
    title: "Gral.Empleados",
    icon: "text_caps-small",
    class: "",
  },
  {
    path: "layout/index-paises",
    title: "Gral.Paises",
    icon: "text_caps-small",
    class: "",
  },
  {
    path: "layout/index-estados",
    title: "Gral.Estados",
    icon: "text_caps-small",
    class: "",
  },
  {
    path: "layout/index-ciudades",
    title: "Gral.Ciudades",
    icon: "text_caps-small",
    class: "",
  },
  {
    path: "layout/index-empresas",
    title: "Adua.Empresas",
    icon: "text_caps-small",
    class: "",
  },
  {
    path: "layout/index-estados-civiles",
    title: "Gral.Estados Civiles",
    icon: "text_caps-small",
    class: "",
  },
  { path: "layout/icons", title: "Icons", icon: "education_atom", class: "" },
  { path: "layout/maps", title: "Maps", icon: "location_map-big", class: "" },
  {
    path: "layout/notifications",
    title: "Notifications",
    icon: "ui-1_bell-53",
    class: "",
  },
  {
    path: "layout/form-persona-natural",
    title: "Adua.Persona Natural",
    icon: "users_single-02",
    class: "",
  },
  {
    path: "layout/form-comerciante-individual",
    title: "Adua.Comerciante individual",
    icon: "users_single-02",
    class: "",
  },
  {
    path: "layout/form-persona-juridica",
    title: "Adua.Persona Juridica",
    icon: "shopping_shop",
    class: "",
  },
  {
    path: "layout/form-declaracion-valor",
    title: "Adua.Declaración de valor",
    icon: "files_single-copy-04",
    class: "",
  },
  {
    path: "layout/boletin",
    title: "Adua.Boletín de pago",
    icon: "files_paper",
    class: "",
  },
  {
    path: "layout/table-list",
    title: "Table List",
    icon: "design_bullet-list-67",
    class: "",
  },
  // { path: '/login', title: 'Iniciar Sesión',  icon:'objects_spaceship', class: 'active active-pro' }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
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

  esquemasMap:Map<string, string> = new Map<string, string>();

  toggleCollapse(schema: string) {
    this.isCollapsed[schema] = !this.isCollapsed[schema];
  }

  belongsToSchema(menuItem: RouteInfo, schema: string): boolean {
    return menuItem.title.includes(schema);
  }

  belongsToAnySchema(menuItem: RouteInfo): boolean {
    return !["Acce", "Gral", "Adua"].some((schema) => {
      // console.log(this.belongsToSchema(menuItem, schema), menuItem, schema);
      return this.belongsToSchema(menuItem, schema);
    });
  }

  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.esquemasMap.set('Acce', "Acceso");
    this.esquemasMap.set('Gral', "General");
    this.esquemasMap.set('Adua', "Aduana");
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
