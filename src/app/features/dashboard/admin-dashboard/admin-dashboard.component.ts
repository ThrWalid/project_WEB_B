import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  userStats = {
    total: 0,
    teachers: 0,
    students: 0,
    admins: 0,
    active: 0
  };
  totalCourses = 0;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    // Charger les statistiques des utilisateurs
    this.userService.getUserStats().subscribe(stats => {
      this.userStats = stats;
    });

    // Charger le nombre de cours
    this.courseService.getAllCourses().subscribe(courses => {
      this.totalCourses = courses.length;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
