import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { FrmEmployeeComponent } from './frm-employee/frm-employee.component';
import { FrmEmpAddrComponent } from './frm-emp-addr/frm-emp-addr.component';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeService } from './frm-employee/employee.service';
import { EmpAddrService } from './frm-emp-addr/emp-addr.service';
import { CoreModule } from './core/core.module';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EmployeesComponent,
    FrmEmployeeComponent,
    FrmEmpAddrComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    NgSelectModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'employee', component: EmployeesComponent }
    ])
  ],
  providers: [
    EmployeeService,
    EmpAddrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
