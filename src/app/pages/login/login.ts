import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { Auth } from '../../services/auth';


@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  mensajeError: string = '';
  constructor(private authService: Auth, private router: Router) {}

  iniciarSesion(): void {
    this.mensajeError = ''; 
    this.authService.login(this.email, this.password).subscribe({
      next: (token: string) => {
        this.authService.guardarToken(token);
        this.router.navigate(['/contacts']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.mensajeError = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      } 
    });
  } 
}
