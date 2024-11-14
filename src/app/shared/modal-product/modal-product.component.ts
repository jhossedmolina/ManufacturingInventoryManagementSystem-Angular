import { Component, inject, OnInit } from '@angular/core';
import { ProductStatus } from '../../product/enums/product-status.enum';
import { ProductionType } from '../../product/enums/production-type.enum';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../product/services/product.service';
import { ModalProductService } from './services/modal-product.service';
import { Product } from '../../product/interfaces/product.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-product',
  standalone: true,
  imports: [ MaterialModule, ReactiveFormsModule ],
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.scss'
})
export class ModalProductComponent implements OnInit {

  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _productService = inject(ProductService);
  private readonly _modalProductService = inject(ModalProductService);

  productStatusOptions = Object.entries(ProductStatus)
  .filter(([key, value]) => typeof value === 'number') // Solo valores numéricos
  .map(([key, value]) => ({ key, value }));

  productionTypeOptions = Object.entries(ProductionType)
  .filter(([key, value]) => typeof value === 'number') // Solo valores numéricos
  .map(([key, value]) => ({ key, value }));

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    productionType: new FormControl(ProductionType.Elaborado_A_Mano),
    productStatus: new FormControl(ProductStatus.En_Stock)
  });

  ngOnInit(): void {
   if(this._matDialog.isEditing){
    //this.productForm.patchValue(this._matDialog.data);
    const productData = {
      name: this._matDialog.data.name,
      productionType: this._matDialog.data.productionType, // Ya es el valor numérico del enum
      productStatus: this._matDialog.data.status
    };
    console.log(productData)

    this.productForm.patchValue(productData);
   }
  }

  getButtonTitle(): string {
    return this._matDialog.data ? 'Editar producto' : 'Agregar producto';
  }

  private _disabledForm(): void {
    this.productForm.disable();
  }

  onSubmit() {
    const productFormValue = this.productForm.value;
    const { name, productionType, productStatus } = productFormValue;
    const product: Product = {
      name: name!,
      productionType: productionType!,
      status: productStatus!
    };

    if (this._matDialog.data)
    {
      this._productService.updateProduct(this._matDialog.data.id, product)
      .subscribe({
        next: (data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "El producto se ha editado correctamente",
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    } else {
      if (this.productForm.valid) {

        this._productService.addNewProduct(product)
          .subscribe({
            next: (data) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "El producto se ha agregado correctamente",
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        console.log('Producto guardado:', productFormValue);
      } else {
        console.error('Formulario inválido');
      }
    }
    this._modalProductService.closeModal();
  }
}
