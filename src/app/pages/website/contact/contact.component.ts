import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    userName: '',
    email: '',
    phone: '',
    message: ''
  }

  constructor(private http: HttpClient) {}

  submitForm(form: any): void {
    if (form.valid) {
      this.http.post('https://api.web3forms.com/submit', this.formData).subscribe(
        (response) => {
          console.log('Form submitted successfully', response);
          alert('Message sent!');
        },
        (error) => {
          console.error('Error submitting form', error);
          alert('There was an error sending your message.');
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
    form.reset();
  }
}
