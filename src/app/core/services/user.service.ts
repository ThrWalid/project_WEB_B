import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor() {
    // Initialise avec des utilisateurs de test
    this.loadMockUsers();
  }

  get usersValue(): User[] {
    return this.usersSubject.value;
  }

  getAllUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.users$.pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  getUsersByRole(role: UserRole): Observable<User[]> {
    return this.users$.pipe(
      map(users => users.filter(user => user.role === role))
    );
  }

  getTeachers(): Observable<User[]> {
    return this.getUsersByRole(UserRole.TEACHER);
  }

  getStudents(): Observable<User[]> {
    return this.getUsersByRole(UserRole.STUDENT);
  }

  getAdmins(): Observable<User[]> {
    return this.getUsersByRole(UserRole.ADMIN);
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    const currentUsers = this.usersValue;
    const userIndex = currentUsers.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Utilisateur non trouvé');
    }

    const updatedUser: User = {
      ...currentUsers[userIndex],
      ...userData,
      updatedAt: new Date()
    };

    const updatedUsers = [...currentUsers];
    updatedUsers[userIndex] = updatedUser;
    this.usersSubject.next(updatedUsers);

    return of(updatedUser);
  }

  deleteUser(userId: string): Observable<boolean> {
    const currentUsers = this.usersValue;
    const filteredUsers = currentUsers.filter(u => u.id !== userId);
    this.usersSubject.next(filteredUsers);
    return of(true);
  }

  activateUser(userId: string): Observable<boolean> {
    return this.updateUser(userId, { isActive: true }).pipe(
      map(() => true)
    );
  }

  deactivateUser(userId: string): Observable<boolean> {
    return this.updateUser(userId, { isActive: false }).pipe(
      map(() => true)
    );
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    return this.users$.pipe(
      map(users => users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }

  getUserStats(): Observable<{total: number, admins: number, teachers: number, students: number, active: number}> {
    return this.users$.pipe(
      map(users => ({
        total: users.length,
        admins: users.filter(u => u.role === UserRole.ADMIN).length,
        teachers: users.filter(u => u.role === UserRole.TEACHER).length,
        students: users.filter(u => u.role === UserRole.STUDENT).length,
        active: users.filter(u => u.isActive).length
      }))
    );
  }

  private loadMockUsers(): void {
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'admin@plateforme.com',
        firstName: 'Admin',
        lastName: 'System',
        role: UserRole.ADMIN,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        email: 'prof@plateforme.com',
        firstName: 'Professeur',
        lastName: 'Martin',
        role: UserRole.TEACHER,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '3',
        email: 'etudiant@plateforme.com',
        firstName: 'Étudiant',
        lastName: 'Dupont',
        role: UserRole.STUDENT,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '4',
        email: 'marie.prof@plateforme.com',
        firstName: 'Marie',
        lastName: 'Dubois',
        role: UserRole.TEACHER,
        isActive: true,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      },
      {
        id: '5',
        email: 'paul.etudiant@plateforme.com',
        firstName: 'Paul',
        lastName: 'Bernard',
        role: UserRole.STUDENT,
        isActive: true,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      }
    ];

    this.usersSubject.next(mockUsers);
  }
}
