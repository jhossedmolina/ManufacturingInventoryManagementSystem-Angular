import { Component, computed, inject } from '@angular/core';
import { JsonPipe, UpperCasePipe } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialModule, UpperCasePipe, JsonPipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})

export class ToolbarComponent {

  private authService = inject( AuthService );

  title: string = 'Sistema gestor de inventarios';

  public currentUser = computed( () => this.authService.currentUser() );
}
