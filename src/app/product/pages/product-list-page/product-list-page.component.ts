import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataProduct } from '../../interfaces/product-response.interface';
import { UpperCasePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ModalProductService } from '../../../shared/modal-product/services/modal-product.service';
import { ModalProductComponent } from '../../../shared/modal-product/modal-product.component';

@Component({
  selector: 'app-list-products-page',
  standalone: true,
  imports: [ MaterialModule, UpperCasePipe ],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss'
})
export default class ProductListPageComponent implements OnInit {

  private readonly _productService = inject( ProductService );
  private readonly _modalProductService = inject( ModalProductService );

  title: string = 'Lista de productos';
  displayedColumns: string[] = ['id', 'name', 'productionType', 'status', 'actions'];
  dataSource = new MatTableDataSource<DataProduct>();

  openAddProductDialog(){
    this._modalProductService.openDialog<ModalProductComponent>(ModalProductComponent);

    this._modalProductService._dialog.afterAllClosed.subscribe(result => {
      this.getAllProducts()
    })
  }

  openEditProductDialog(){
    this._modalProductService.openDialog<ModalProductComponent>(ModalProductComponent)

    this._modalProductService._dialog.afterAllClosed.subscribe(result => {
      this.getAllProducts()
    })
  }

  ngOnInit(): void {
    this.getAllProducts();
  };

  getAllProducts() {
    this._productService.allProducts()
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error al obtener productos:', err);
        }
      });
  };

  deleteProduct(productId: number){
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se eliminara este producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(productId)
          .subscribe({
            next: (data) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto eliminado correctamente",
                showConfirmButton: false,
                timer: 1500
              });

              this.getAllProducts();
            },
            error: (err) => {
              Swal.fire('Error', 'Ha ocurrido un error al intentar eliminar el producto', 'error');
              console.error('Error al eliminar el producto:', err);
            }
        });
      } else if (result.isDismissed) {
        this.getAllProducts();
      }
    });;
  };

  markProductAsDefective(productId: number){
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se marcara este producto como defectuoso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.markProductAsDefective(productId)
          .subscribe({
            next: (data) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "El producto se ha marcado como defectuso",
                showConfirmButton: false,
                timer: 1500
              });

              this.getAllProducts();
            },
            error: (err) => {
              Swal.fire('Error', 'Ha ocurrido un error al intentar marcar el producto como defectuoso', 'error');
              console.error('Error al marcar el producto como defectuoso:', err);
            }
        });
      } else if (result.isDismissed) {
        this.getAllProducts();
      }
    });;
  };
}
