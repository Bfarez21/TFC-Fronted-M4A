import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AtencionMedicaComponent } from './atencion-medica/atencion-medica.component';
import { FichaMedicaComponent } from './ficha-medica/ficha-medica.component';
import { ReferenciaMedicaComponent } from './referencia-medica/referencia-medica.component';
import { EnfermedadesComponent } from './enfermedades/enfermedades.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SettingComponent } from './setting/setting.component';
import { FormComponent } from './ficha-medica/form.component';
import { FormRefMedicaComponent } from './referencia-medica/form-ref-medica/form-ref-medica.component';
import { FormDocComponent } from './doctor/formdoc.component';
import { FormAtencionMedicaComponent } from './atencion-medica/form-atencion-medica.component';
import { InstitutoComponent } from './setting/instituto.component';
import { FormEnfermedadesComponent } from './enfermedades/form.enfermedades.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: '/home' }  // Ruta por defecto

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
