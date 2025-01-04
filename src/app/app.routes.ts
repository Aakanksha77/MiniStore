import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';
import { LandingComponent } from './pages/website/landing/landing.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'shop',
        pathMatch: 'full'
    },
    {
       path: 'login',
       component: LoginComponent 
    },
    {
       path: 'shop',
       component: LandingComponent 
    },
    {
        path: 'catergories',
        component: CategoryProductsComponent
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
