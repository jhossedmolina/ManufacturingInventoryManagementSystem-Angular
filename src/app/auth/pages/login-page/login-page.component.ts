import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { UpperCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MaterialModule, UpperCasePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export default class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );

  title: string = 'Iniciar sesion';

  public myForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    password: [ '', [ Validators.required, Validators.minLength(6) ]]
  })

  login() {
    const { email, password } = this.myForm.value;

    const user: User = {
      email: email,
      password: password
    };

    this.authService.login(user)
      .subscribe({
        next: () => {
          console.log('Usuario logeado correctamente')
        },
        error: (errorMessage) => {
          Swal.fire('Error', 'Ingrese un usuario y una contraseña validas', 'error');
        }
      });
  }
}
