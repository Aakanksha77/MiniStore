import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { ProductsComponent } from './pages/admin/products/products.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
       path: 'login',
       component: LoginComponent 
    },
    {
        path:'',
        component: LayoutComponent,
        children: [
            {
                path: 'products',
                component: ProductsComponent
            }
        ]
    }
];
