import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  showPassword = false;
  rememberMe = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.error = '';
    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/catalogue';
          this.router.navigateByUrl(returnUrl);
        } else {
          this.error = 'Email ou mot de passe incorrect';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        this.error = 'Une erreur est survenue. Veuillez réessayer.';
        this.loading = false;
      },
    });
  }
}
