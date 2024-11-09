import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialModule, UpperCasePipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})

export class ToolbarComponent {
  title: string = 'Sistema gestor de inventarios'
}
