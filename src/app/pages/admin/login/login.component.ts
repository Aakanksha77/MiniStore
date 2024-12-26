import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  switch = true;
  router = inject(Router);


  islogin() {
    this.switch = !this.switch
  }

  formData = {
    userName: '',
    email: '',
    password: ''
  }

  addData(form: any) {
    // Retrieve existing data from localStorage or default to an empty array if not available
    let existingData: any[] = JSON.parse(localStorage.getItem('UserData') || '[]');

    // Check if existingData is an array, if not, default to an empty array
    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    // Append the new form data to the existing array
    existingData.push(this.formData);

    // Save the updated array back to localStorage
    localStorage.setItem('UserData', JSON.stringify(existingData));

    // Reset the form
    form.reset();
    this.router.navigateByUrl('/products')
  }

  getdata(form: any){
     // Step 1: Retrieve user data from localStorage
     const storedUsers = JSON.parse(localStorage.getItem('UserData') || '[]');

     // Step 2: Check if the entered credentials match any user
     const user = storedUsers.find(
       (u: any) =>
         u.email === this.formData.email &&
         u.password === this.formData.password
     );
 
     if (user) {
       // Step 3: Successful login
       this.router.navigateByUrl('products')
      //  alert('Login successful!');
     } else {
       // Step 4: Invalid credentials
       alert('Invalid email or password.');
     }
 
     // Optional: Reset form
     form.reset();
  }

}
