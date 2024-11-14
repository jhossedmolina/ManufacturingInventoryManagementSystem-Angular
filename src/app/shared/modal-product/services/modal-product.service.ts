import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataProduct } from '../../../product/interfaces/product-response.interface';


@Injectable({
  providedIn: 'root'
})
export class ModalProductService {

  readonly _dialog = inject(MatDialog);

  openDialog<CT, T = DataProduct>(componentRef: ComponentType<CT>, data?: T, isEditing = false): void {
    const config = {data, isEditing };

    this._dialog.open(componentRef, {
      data: config,
      width: '1000px'
    });
  }

  closeModal(): void {
    this._dialog.closeAll();
  }
}
