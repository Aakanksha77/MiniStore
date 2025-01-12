import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { AboutUsComponent } from './pages/website/about-us/about-us.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';
import { ContactComponent } from './pages/website/contact/contact.component';
import { CustomerCartComponent } from './pages/website/customer-cart/customer-cart.component';
import { CustomerFavoritesComponent } from './pages/website/customer-favorites/customer-favorites.component';
import { CustomerLoginComponent } from './pages/website/customer-login/customer-login.component';
import { CustomerProductByIdComponent } from './pages/website/customer-product-by-id/customer-product-by-id.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { WebProductsComponent } from './pages/website/web-products/web-products.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pro',
        pathMatch: 'full'
    },
    

    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: 'pro',
                component: WebProductsComponent
            },
            {
                path: 'catergories/:param',
                component: CategoryProductsComponent
            },
            {
                path: 'productById/:params',
                component: CustomerProductByIdComponent
            },
            {
                path: 'About',
                component: AboutUsComponent
            },
            {
                path: 'Contact',
                component: ContactComponent
            },
            {
                path: 'cart',
                component: CustomerCartComponent
            },
            {
                path: 'fav',
                component: CustomerFavoritesComponent
            },
            {
                path: 'user',
                component: CustomerLoginComponent
            }
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'products',
                component: ProductsComponent
            }
        ]
    }
];
