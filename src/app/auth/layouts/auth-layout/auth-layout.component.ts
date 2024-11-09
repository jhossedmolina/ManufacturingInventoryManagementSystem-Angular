import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export default class AuthLayoutComponent {

}
