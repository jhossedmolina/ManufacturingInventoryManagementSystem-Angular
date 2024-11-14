import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../../../shared/toolbar/toolbar.component';

@Component({
  selector: 'app-product-layout',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './product-layout.component.html',
  styleUrl: './product-layout.component.scss'
})
export default class ProductLayoutComponent {

}
