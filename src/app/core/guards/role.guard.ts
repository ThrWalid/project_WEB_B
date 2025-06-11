import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Vérifie d'abord si l'utilisateur est connecté
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Récupère les rôles autorisés depuis les données de la route
    const allowedRoles = route.data['roles'] as UserRole[];
    
    if (!allowedRoles || allowedRoles.length === 0) {
      return true; // Pas de restriction de rôle
    }

    const userRole = this.authService.userRole;
    
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // Redirection vers une page d'accès refusé ou dashboard selon le rôle
    this.redirectBasedOnRole();
    return false;
  }

  private redirectBasedOnRole(): void {
    const userRole = this.authService.userRole;
    
    switch (userRole) {
      case UserRole.ADMIN:
        this.router.navigate(['/dashboard/admin']);
        break;
      case UserRole.TEACHER:
        this.router.navigate(['/dashboard/teacher']);
        break;
      case UserRole.STUDENT:
        this.router.navigate(['/dashboard/student']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }
}
