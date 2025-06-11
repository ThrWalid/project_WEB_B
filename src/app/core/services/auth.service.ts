import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { User, UserRole, LoginRequest, LoginResponse, RegisterRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Vérifie s'il y a un utilisateur en localStorage au démarrage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  get userRole(): UserRole | null {
    return this.currentUserValue?.role || null;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulation d'une API - À remplacer par un vrai appel HTTP
    return this.simulateApiCall(credentials).pipe(
      tap(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  register(userData: RegisterRequest): Observable<User> {
    // Simulation d'une API - À remplacer par un vrai appel HTTP
    const newUser: User = {
      id: this.generateId(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(newUser).pipe(
      tap(user => {
        // Sauvegarde simulation
        console.log('Utilisateur créé:', user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    return this.userRole === UserRole.ADMIN;
  }

  isTeacher(): boolean {
    return this.userRole === UserRole.TEACHER;
  }

  isStudent(): boolean {
    return this.userRole === UserRole.STUDENT;
  }

  hasRole(role: UserRole): boolean {
    return this.userRole === role;
  }

  private simulateApiCall(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulation d'utilisateurs de test
    const testUsers: User[] = [
      {
        id: '1',
        email: 'admin@plateforme.com',
        firstName: 'Admin',
        lastName: 'System',
        role: UserRole.ADMIN,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        email: 'prof@plateforme.com',
        firstName: 'Professeur',
        lastName: 'Martin',
        role: UserRole.TEACHER,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        email: 'etudiant@plateforme.com',
        firstName: 'Étudiant',
        lastName: 'Dupont',
        role: UserRole.STUDENT,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const user = testUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === 'password123') {
      const response: LoginResponse = {
        user,
        token: this.generateToken(),
        refreshToken: this.generateToken()
      };
      // Ajouter un petit délai pour simuler un appel réseau
      return of(response).pipe(delay(1000));
    } else {
      // Retourner un Observable d'erreur au lieu de lancer une exception
      return throwError(() => new Error('Identifiants invalides'));
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateToken(): string {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  }
}
