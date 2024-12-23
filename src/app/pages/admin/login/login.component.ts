import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  switch = true;

  login(){
    this.switch = !this.switch
  }

  formData = {
    userName : '',
    email : '',
    password : ''
  }

  addData(){
    localStorage.setItem('data',JSON.stringify(this.formData))
  }
}
