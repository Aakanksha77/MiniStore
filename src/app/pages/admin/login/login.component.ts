import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  switch = true;

  login() {
    this.switch = !this.switch
  }

  formData = {
    userName: '',
    email: '',
    password: ''
  }

  addData(form: any) {
    // Retrieve existing data from localStorage or default to an empty array if not available
    let existingData: any[] = JSON.parse(localStorage.getItem('data') || '[]');

    // Check if existingData is an array, if not, default to an empty array
    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    // Append the new form data to the existing array
    existingData.push(this.formData);

    // Save the updated array back to localStorage
    localStorage.setItem('data', JSON.stringify(existingData));

    // Reset the form
    form.reset();
  }
}
