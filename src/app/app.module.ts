import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from "@auth0/angular-jwt";
import { AppComponent } from './app.component';
import { CalendarMonthViewComponent } from './shared/modules/calendar-module/month/calendar-month-view/calendar-month-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarMonthViewHeaderComponent } from './shared/modules/calendar-module/month/calendar-month-view-header/calendar-month-view-header.component';
import { CalendarMonthCellComponent } from './shared/modules/calendar-module/month/calendar-month-cell/calendar-month-cell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MoreeventscartComponent } from './shared/modals/moreeventscart/moreeventscart.component';
import { AddLeaveComponent } from './shared/modals/leaves/add-leave/add-leave.component'; 
import { ShowLeaveComponent } from './shared/modals/leaves/show-leave/show-leave.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthguardServiceService } from './services/authguard-service.service';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { StaffComponent } from './components/pages/staff/staff.component';
import { AddEditStaffComponent } from './shared/modals/staffs/add-edit-staff/add-edit-staff.component';
import { StaffPositionComponent } from './components/pages/staff-position/staff-position.component';
import { AddEditStaffPositionComponent } from './shared/modals/staff-position/add-edit-staff-position/add-edit-staff-position.component';
import { RoleComponent } from './components/pages/role/role.component';
import { AddEditRoleComponent } from './shared/modals/role/add-edit-role/add-edit-role.component';

export function tokenGetter() {
  return localStorage.getItem('Session-User');
}
@NgModule({
  declarations: [
    AppComponent,
    CalendarMonthViewComponent,
    DashboardComponent,
    CalendarMonthViewHeaderComponent,
    CalendarMonthCellComponent,
    MoreeventscartComponent,
    AddLeaveComponent,
    ShowLeaveComponent,
    LoginComponent,
    UserDashboardComponent,
    StaffComponent,
    AddEditStaffComponent,
    StaffPositionComponent,
    AddEditStaffPositionComponent,
    RoleComponent,
    AddEditRoleComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    AuthguardServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
