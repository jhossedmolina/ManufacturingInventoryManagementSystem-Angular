import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { ProductionType } from '../../enums/production-type.enum';
import { ProductStatus } from '../../enums/product-status.enum';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule ],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.scss'
})
export default class AddProductPageComponent {
  //title:string = 'Agregar nuevo producto';

}
