import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  enrolledCourses: Course[] = [];
  completedAssignments = 0;
  averageGrade = 85;
  nextDeadline = 5;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  private loadStudentData(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.courseService.getEnrolledCourses(currentUser.id).subscribe(courses => {
        this.enrolledCourses = courses.map(course => ({
          ...course,
          progress: Math.floor(Math.random() * 100) // Simulation du progrès
        }));
        this.completedAssignments = courses.length * 2; // Simulation
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
