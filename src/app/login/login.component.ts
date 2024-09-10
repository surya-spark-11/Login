import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  passwordHidden = true;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });

  }



  get form() { return this.loginForm.controls; }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }

  isEmailInvalid(): boolean {

    const emailControl = this.loginForm.get('email');
    return !!emailControl?.hasError('email') || !!emailControl?.touched || !!emailControl?.dirty;

  }

  isPasswordInvalid(): boolean {
    const passwordControl = this.loginForm.get('password');
    return !!passwordControl?.hasError('password') || !!passwordControl?.touched || !!passwordControl?.dirty;
  }

  getEmailErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('email')) {
      return 'Please enter a valid email address.';
    } else if (control?.hasError('required')) {
      return 'Email is required.';
    }
    return '';

  }

  getPasswordErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('pattern')) {
      return 'Password contains One Upper,Lower Case,One Special Character,One Number & Min 8.';
    } else if (control?.hasError('password')) {
      return 'Please enter a valid password.';
    } else if (control?.hasError('required')) {
      return 'Password is required.';
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      alert('Login Successful' + JSON.stringify(this.loginForm.value));

      console.log('Login Successful' + JSON.stringify(this.loginForm.value));

    } else {
      alert('Email & Password Required😶‍🌫️');
    }
    this.loginForm.reset();
  }
}
