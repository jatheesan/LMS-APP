import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HolidayComponent } from './components/pages/holiday/holiday.component';
import { LeavetypeComponent } from './components/pages/leavetype/leavetype.component';
import { RoleComponent } from './components/pages/role/role.component';
import { StaffPositionComponent } from './components/pages/staff-position/staff-position.component';
import { StaffComponent } from './components/pages/staff/staff.component';
import { TeamComponent } from './components/pages/team/team.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
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
      role: ['Admin', 'User']
    } },
    
  { path: 'userdashboard', 
  component: UserDashboardComponent, 
  canActivate: [AuthenticationGuard],
  data: {
    role: []
  }},
  { path: 'profile', 
  component: UserProfileComponent, 
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
  { path: 'team', 
  component: TeamComponent, 
  canActivate: [AuthenticationGuard],
  data: {
    role: ['Admin']
  }},
  { path: 'leavetype', 
  component: LeavetypeComponent, 
  canActivate: [AuthenticationGuard],
  data: {
    role: ['Admin']
  }},
  { path: 'holiday', 
  component: HolidayComponent, 
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
