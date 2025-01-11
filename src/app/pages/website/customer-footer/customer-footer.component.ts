import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-footer',
  imports: [],
  templateUrl: './customer-footer.component.html',
  styleUrl: './customer-footer.component.css'
})
export class CustomerFooterComponent {
  router = inject(Router)

  openHome() {
    this.router.navigateByUrl('pro')
  }

  openAboutUs() {
    this.router.navigateByUrl('About')
  }

  openContact() {
    this.router.navigateByUrl('Contact')
  }

  openAdmin() {
    this.router.navigateByUrl('login')
  }
}
