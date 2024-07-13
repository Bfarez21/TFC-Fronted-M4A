import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { AtencionMedicaComponent } from './atencion-medica/atencion-medica.component';
import { FichaMedicaComponent } from './ficha-medica/ficha-medica.component';
import { ReferenciaMedicaComponent } from './referencia-medica/referencia-medica.component';
import { EnfermedadesComponent } from './enfermedades/enfermedades.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SettingComponent } from './setting/setting.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

// ventana de registro paciente
import { FormComponent } from './ficha-medica/form.component';
import { FormRefMedicaComponent } from './referencia-medica/form-ref-medica/form-ref-medica.component';


const routes: Routes=[
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component: HomeComponent},
  {path:'atencion-medica',component: AtencionMedicaComponent},
  {path:'ficha-medica',component:FichaMedicaComponent},
  {path:'referencia-medica',component:ReferenciaMedicaComponent},
  {path:'enfermedades',component:EnfermedadesComponent},
  {path:'doctor',component:DoctorComponent},
  {path:'reportes',component:ReportesComponent},
  {path:'setting',component:SettingComponent},
  // creo ruta para llamar al formulario registro paciente
  {path:'ficha-medica/form',component:FormComponent},
  {path:'form-ref-medica',component:FormRefMedicaComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomeComponent,
    AtencionMedicaComponent,
    FichaMedicaComponent,
    ReferenciaMedicaComponent,
    EnfermedadesComponent,
    DoctorComponent,
    ReportesComponent,
    SettingComponent,
    LoginComponent,
    FormComponent,
    FormRefMedicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
