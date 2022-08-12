import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoleComponent } from './components/pages/role/role.component';
import { StaffPositionComponent } from './components/pages/staff-position/staff-position.component';
import { StaffComponent } from './components/pages/staff/staff.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: LoginComponent },

  { path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      {
        path: 'staff',
        component: StaffComponent
      }
    ],
    canActivate: [AuthenticationGuard],
    data: {
      role: 'Admin'
    } },
    
  { path: 'userdashboard', 
  component: UserDashboardComponent, 
  canActivate: [AuthenticationGuard],
  data: {
    role: ['Admin', 'User']
  }},
  { path: 'staff', 
  component: StaffComponent, 
  canActivate: [AuthenticationGuard],
  data: {
    role: ['Admin']
  }},
  { path: 'staff-position', 
  component: StaffPositionComponent, 
  canActivate: [AuthenticationGuard],
  data: {
    role: ['Admin']
  }},
  { path: 'role', 
  component: RoleComponent, 
  canActivate: [AuthenticationGuard],
  data: {
    role: ['Admin']
  }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
