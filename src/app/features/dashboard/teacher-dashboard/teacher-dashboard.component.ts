import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  myCourses: Course[] = [];
  totalStudents = 0;
  totalAssignments = 0;
  averageRating = 4.5;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeacherData();
  }

  private loadTeacherData(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.courseService.getCoursesByTeacher(currentUser.id).subscribe(courses => {
        this.myCourses = courses;
        this.totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0);
        this.totalAssignments = courses.length * 3; // Simulation
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
