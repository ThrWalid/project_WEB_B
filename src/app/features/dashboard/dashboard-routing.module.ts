import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../core/guards/role.guard';
import { UserRole } from '../../core/models';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.ADMIN] }
  },
  {
    path: 'teacher',
    component: TeacherDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.TEACHER] }
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.STUDENT] }
  },
  {
    path: '',
    redirectTo: 'student',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
