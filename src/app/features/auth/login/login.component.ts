import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Récupère l'URL de retour ou utilise '/' par défaut
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Getter pour un accès facile aux champs du formulaire
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    // Arrête si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          // Redirection basée sur le rôle de l'utilisateur
          this.redirectBasedOnRole(response.user.role);
        },
        error: (error) => {
          this.error = error.message || 'Erreur de connexion';
          this.loading = false;
        }
      });
  }

  private redirectBasedOnRole(role: UserRole): void {
    switch (role) {
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
        this.router.navigate(['/']);
    }
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
