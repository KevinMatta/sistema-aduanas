import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../Services/auth.service";
import { RolesService } from "../../Services/roles.service";
import { Rol } from "../../Models/RolesViewModel";
import { APIResponse } from "../../Models/APIResponseViewModel";
import { PantallasService } from "../../Services/pantallas.service";
import { Pantalla } from "../../Models/PantallasViewModel";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "dashboard",
    title: "Gráficos",
    icon: "design_app",
    class: "",
  },
  {
    path: "layout/index-usuarios",
    title: "Acce.Usuarios",
    icon: "users_circle-08",
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
    icon: "ui-1_lock-circle-open",
    class: "",
  },
  {
    path: "layout/index-aduanas",
    title: "Adua.Aduanas",
    icon: "shopping_box",
    class: "",
  },
  {
    path: "layout/index-categorias",
    title: "Adua.Categorias",
    icon: "design_bullet-list-67",
    class: "",
  },
  {
    path: "layout/index-aranceles",
    title: "Adua.Aranceles",
    icon: "business_money-coins",
    class: "",
  },
  {
    path: "layout/index-items",
    title: "Adua.Productos",
    icon: "shopping_bag-16",
    class: "",
  },
  {
    path: "layout/index-paises",
    title: "Gral.Paises",
    icon: "location_world",
    class: "",
  },
  {
    path: "layout/index-estados",
    title: "Gral.Estados",
    icon: "location_world",
    class: "",
  },
  {
    path: "layout/index-ciudades",
    title: "Gral.Ciudades",
    icon: "location_world",
    class: "",
  },
  {
    path: "layout/index-estados-civiles",
    title: "Gral.Estados Civiles",
    icon: "travel_info",
    class: "",
  },
  {
    path: "layout/index-profesiones",
    title: "Gral.Profesiones",
    icon: "ui-2_settings-90",
    class: "",
  },
  {
    path: "layout/index-empresas",
    title: "Gral.Empresas",
    icon: "shopping_shop",
    class: "",
  },
  {
    path: "layout/index-empleados",
    title: "Gral.Empleados",
    icon: "business_badge",
    class: "",
  },
  { path: "layout/icons", title: "Icons", icon: "education_atom", class: "" },
  {
    path: "layout/maps",
    title: "Reportes",
    icon: "location_map-big",
    class: "",
  },
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
    title: "Adua.Comerciante Individual",
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
    title: "Adua.Declaración De Valor",
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

  pantallasDelUsuario: Pantalla[];

  esquemasMap: Map<string, string> = new Map<string, string>();

  toggleCollapse(schema: string) {
    this.isCollapsed[schema] = !this.isCollapsed[schema];
  }

  rolDelUsuario: Rol;

  belongsToSchema(menuItem: RouteInfo, schema: string): boolean {
    return menuItem.title.includes(schema);
  }

  menuItems: any[];

  constructor(
    private authenticationService: AuthenticationService,
    private rolesService: RolesService,
    private pantallasService: PantallasService
  ) {}

  ngOnInit() {
    const user = this.authenticationService.userValue;
    console.log(user, "user from sidebar component");

    this.pantallasService.getData().subscribe(
      (pantallas) => {
        console.log(pantallas, "data pantallas");

        this.rolesService.getData().subscribe(
          (roles) => {
            this.esquemasMap.set("Acce", "Acceso.ui-1_lock-circle-open");
            this.esquemasMap.set("Gral", "General.ui-1_settings-gear-63");
            this.esquemasMap.set("Adua", "Aduana.shopping_box");
            this.rolDelUsuario = roles.find((rol) => rol.Rol === user.Rol);

            if (this.rolDelUsuario) {
              this.pantallasDelUsuario = pantallas.filter((pant) =>
                this.rolDelUsuario._pantallas.includes(pant.Id)
              );
              this.menuItems = ROUTES.filter((menuItem) => {
                if (menuItem.title && menuItem.title.includes(".")) {
                  return this.pantallasDelUsuario.some(
                    (pant) => pant.Pantalla === menuItem.title.split(".")[1]
                  );
                } else {
                  return true;
                }
              });
            } else {
              this.menuItems = ROUTES.slice();
            }
            console.log(this.rolDelUsuario);
          },
          (err) => {
            console.log(err, "Error al obtener roles en el sidebar component");
          }
        );
      },
      (err) => {
        console.log(
          err,
          "Error al obtener las pantallas en el sidebar component"
        );
      }
    );
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
