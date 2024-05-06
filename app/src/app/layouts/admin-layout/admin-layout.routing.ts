import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
// import { FormUbicacionComponent } from '../../components/form-ubicacion/form-ubicacion.component';
import { FormPersonaNaturalComponent } from '../../components/form-persona-natural/form-persona-natural.component';
import { FormComercianteIndividualComponent } from '../../components/form-comerciante-individual/form-comerciante-individual.component';
import { FormPersonaJuridicaComponent } from '../../components/form-persona-juridica/form-persona-juridica.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { IndexListaComponent } from '../../components/index-lista/index-lista.component';
import { LoginComponent } from '../../components/login/login.component';
import { FormDeclaracionValorComponent } from '../../components/form-declaracion-valor/form-declaracion-valor.component';
import { BoletinComponent } from '../../components/boletin/boletin.component';
import { FormUsuariosComponent } from '../../components/form-usuarios/form-usuarios.component';
import { RolesPorPantallaComponent } from '../../components/roles-por-pantalla/roles-por-pantalla.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'index-usuarios',     component: IndexListaComponent, data: { titulo: 'Usuarios' }},
    { path: 'form-usuarios',     component: FormUsuariosComponent},
    { path: 'index-roles',     component: IndexListaComponent, data: { titulo: 'Roles' }},
    { path: 'roles-por-pantalla',     component: RolesPorPantallaComponent},
    { path: 'index-aduanas',     component: IndexListaComponent, data: { titulo: 'Aduanas' }},
    { path: 'index-empresas',     component: IndexListaComponent, data: { titulo: 'Empresas' }},
    { path: 'index-paises',     component: IndexListaComponent, data: { titulo: 'Paises' }},
    { path: 'index-estados',     component: IndexListaComponent, data: { titulo: 'Estados' }},
    { path: 'index-ciudades',     component: IndexListaComponent, data: { titulo: 'Ciudades' }},
    { path: 'index-empleados',     component: IndexListaComponent, data: { titulo: 'Empleados' }},
    { path: 'index-estados-civiles',     component: IndexListaComponent, data: { titulo: 'Estados Civiles' }},
    // { path: 'form-ubicacion',   component: FormUbicacionComponent },
    { path: 'form-persona-natural',   component: FormPersonaNaturalComponent },
    { path: 'form-comerciante-individual',   component: FormComercianteIndividualComponent },
    { path: 'form-persona-juridica',   component: FormPersonaJuridicaComponent },
    { path: 'form-declaracion-valor',   component: FormDeclaracionValorComponent },
    { path: 'boletin',   component: BoletinComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'login',        component: LoginComponent }
];
