import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course, CourseLevel, CreateCourseRequest, UpdateCourseRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor() {
    // Initialise avec des cours de test
    this.loadMockCourses();
  }

  get coursesValue(): Course[] {
    return this.coursesSubject.value;
  }

  getAllCourses(): Observable<Course[]> {
    return this.courses$;
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === id))
    );
  }

  getCoursesByTeacher(teacherId: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses.filter(course => course.teacherId === teacherId))
    );
  }

  getEnrolledCourses(studentId: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses.filter(course => 
        course.enrolledStudents.includes(studentId)
      ))
    );
  }

  createCourse(courseData: CreateCourseRequest, teacherId: string): Observable<Course> {
    const newCourse: Course = {
      id: this.generateId(),
      ...courseData,
      teacherId,
      teacherName: 'Professeur Martin', // À récupérer depuis le service utilisateur
      enrolledStudents: [],
      resources: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const currentCourses = this.coursesValue;
    this.coursesSubject.next([...currentCourses, newCourse]);

    return of(newCourse);
  }

  updateCourse(courseData: UpdateCourseRequest): Observable<Course> {
    const currentCourses = this.coursesValue;
    const courseIndex = currentCourses.findIndex(c => c.id === courseData.id);

    if (courseIndex === -1) {
      throw new Error('Cours non trouvé');
    }

    const updatedCourse: Course = {
      ...currentCourses[courseIndex],
      ...courseData,
      updatedAt: new Date()
    };

    const updatedCourses = [...currentCourses];
    updatedCourses[courseIndex] = updatedCourse;
    this.coursesSubject.next(updatedCourses);

    return of(updatedCourse);
  }

  deleteCourse(courseId: string): Observable<boolean> {
    const currentCourses = this.coursesValue;
    const filteredCourses = currentCourses.filter(c => c.id !== courseId);
    this.coursesSubject.next(filteredCourses);
    return of(true);
  }

  enrollStudent(courseId: string, studentId: string): Observable<boolean> {
    const currentCourses = this.coursesValue;
    const courseIndex = currentCourses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
      throw new Error('Cours non trouvé');
    }

    const course = currentCourses[courseIndex];
    
    if (course.enrolledStudents.includes(studentId)) {
      throw new Error('Étudiant déjà inscrit');
    }

    if (course.enrolledStudents.length >= course.maxStudents) {
      throw new Error('Cours complet');
    }

    const updatedCourse: Course = {
      ...course,
      enrolledStudents: [...course.enrolledStudents, studentId],
      updatedAt: new Date()
    };

    const updatedCourses = [...currentCourses];
    updatedCourses[courseIndex] = updatedCourse;
    this.coursesSubject.next(updatedCourses);

    return of(true);
  }

  unenrollStudent(courseId: string, studentId: string): Observable<boolean> {
    const currentCourses = this.coursesValue;
    const courseIndex = currentCourses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
      throw new Error('Cours non trouvé');
    }

    const course = currentCourses[courseIndex];
    const updatedCourse: Course = {
      ...course,
      enrolledStudents: course.enrolledStudents.filter(id => id !== studentId),
      updatedAt: new Date()
    };

    const updatedCourses = [...currentCourses];
    updatedCourses[courseIndex] = updatedCourse;
    this.coursesSubject.next(updatedCourses);

    return of(true);
  }

  private loadMockCourses(): void {
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Introduction à Angular',
        description: 'Apprenez les bases du framework Angular',
        content: 'Contenu détaillé du cours Angular...',
        teacherId: '2',
        teacherName: 'Professeur Martin',
        category: 'Développement Web',
        level: CourseLevel.BEGINNER,
        duration: 20,
        maxStudents: 25,
        enrolledStudents: ['3'],
        resources: [],
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        title: 'React Avancé',
        description: 'Techniques avancées en React',
        content: 'Contenu détaillé du cours React avancé...',
        teacherId: '2',
        teacherName: 'Professeur Martin',
        category: 'Développement Web',
        level: CourseLevel.ADVANCED,
        duration: 30,
        maxStudents: 20,
        enrolledStudents: [],
        resources: [],
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '3',
        title: 'Python pour Débutants',
        description: 'Initiez-vous à la programmation Python',
        content: 'Contenu détaillé du cours Python...',
        teacherId: '2',
        teacherName: 'Professeur Martin',
        category: 'Programmation',
        level: CourseLevel.BEGINNER,
        duration: 25,
        maxStudents: 30,
        enrolledStudents: ['3'],
        resources: [],
        isActive: true,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      }
    ];

    this.coursesSubject.next(mockCourses);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
