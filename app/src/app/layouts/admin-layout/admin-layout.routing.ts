import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FormUbicacionComponent } from '../../components/form-ubicacion/form-ubicacion.component';
import { FormPersonaNaturalComponent } from '../../components/form-persona-natural/form-persona-natural.component';
import { FormComercianteIndividualComponent } from '../../components/form-comerciante-individual/form-comerciante-individual.component';
import { FormPersonaJuridicaComponent } from '../../components/form-persona-juridica/form-persona-juridica.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'form-ubicacion',   component: FormUbicacionComponent },
    { path: 'form-persona-natural',   component: FormPersonaNaturalComponent },
    { path: 'form-comerciante-individual',   component: FormComercianteIndividualComponent },
    { path: 'form-persona-juridica',   component: FormPersonaJuridicaComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
