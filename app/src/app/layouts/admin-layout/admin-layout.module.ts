import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
// import { FormPersonaNaturalComponent } from '../../components/form-persona-natural/form-persona-natural.component';
// import { FormComercianteIndividualComponent } from '../../components/form-comerciante-individual/form-comerciante-individual.component';
// import { FormPersonaJuridicaComponent } from '../../components/form-persona-juridica/form-persona-juridica.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
// import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    // ComponentsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    // ComponentsModule,
    // FormPersonaNaturalComponent,
    // FormComercianteIndividualComponent,
    // FormPersonaJuridicaComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class AdminLayoutModule {}
