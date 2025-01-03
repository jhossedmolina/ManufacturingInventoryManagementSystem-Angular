import { Routes } from "@angular/router";

const productRoutes: Routes = [
  {
    path: 'lista-de-productos',
    loadComponent: () => import('./pages/product-list-page/product-list-page.component')
  },
  {
    path: '',
    redirectTo: 'lista-de-productos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'lista-de-productos',
    pathMatch: 'full'
  },
];

export default productRoutes;
