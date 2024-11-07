import { Routes } from '@angular/router';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { LoginComponent } from './login/login/login.component';
import { AddUserComponent } from './user/add-user/add-user.component';

export const routes: Routes = [
  { path: 'agregar-productos', component: AddProductComponent },
  { path: 'lista-de-productos', component: ProductListComponent},
  { path: 'iniciar-sesion', component: LoginComponent},
  { path: '**', redirectTo: 'iniciar-sesion', pathMatch: 'full'},
  { path: 'registrarse', component: AddUserComponent}
];
