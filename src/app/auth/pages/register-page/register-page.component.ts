import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { UpperCasePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApplicationUser } from '../../interfaces/applicationUser.interface';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [MaterialModule, UpperCasePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export default class RegisterPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );

  title: string = 'Registro';
  matcher = new MyErrorStateMatcher();

  public registerForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: [ '', [ Validators.required, Validators.minLength(6), this.hasUppercase(), this.hasLowerCase(),
      this.hasNumber(), this.hasSpecialCharacter()
     ]]
  });

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  };

  get password() {
    return this.registerForm.get('password');
  };

  hasUppercase(): Validators {
    return (control: AbstractControl): { [ key: string ]: boolean } | null => {
      const hasUpper = /[A-Z]/.test(control.value);
      return !hasUpper ? { 'upperCase': true } : null;
    };
  };

  hasLowerCase(): Validators {
    return (control: AbstractControl): { [ key: string ]: boolean } | null => {
      const hasLower = /[a-z]/.test(control.value);
      return !hasLower ? { 'lowerCase': true } : null;
    };
  };

  hasNumber(): Validators {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const hasNumber = /[0-9]/.test(control.value);
      return !hasNumber ? { 'number': true } : null;
    };
  };

  hasSpecialCharacter(): Validators {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const hasSpecial = /[^a-zA-Z0-9]/.test(control.value);
      return !hasSpecial ? { 'specialCharacter': true } : null;
    };
  };

  registerUser(){
    const { name, email, password } = this.registerForm.value;
    const appUser: ApplicationUser = {
      name: name,
      email: email,
      password: password
    };

    this.authService.register(appUser)
    .subscribe({
      next: () => {
        Swal.fire('Completado', 'Usuario creado correctamente', 'success');
        this.router.navigate(['/autenticacion/iniciar-sesion']);
      },
      error: (errorMessage) => {
        Swal.fire('Error', 'Se produjo un error al intentar registrarse', 'error')
      }
    });
  }
}
