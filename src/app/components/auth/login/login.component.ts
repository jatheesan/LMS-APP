import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Auth } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthguardServiceService } from 'src/app/services/authguard-service.service';
import { Serializer } from 'ts-json-api-formatter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username !: string;
  passwordHash !: string;
  JsonSerialized='';
  invalidLogin: boolean = false;
  errorMessage!: string;

  LoginForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl(''),
    passwordFormControl: new FormControl(''),
    remembermeFormControl: new FormControl(''),
  });
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private authService : AuthService, 
    private authguardServiceService : AuthguardServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group(
      {
        emailFormControl: ['', [Validators.required, Validators.email]],
        passwordFormControl: ['', [ Validators.required, Validators.minLength(6)]],
        remembermeFormControl: [''],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.LoginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.LoginForm.invalid) {
      return;
    }
    else{
      let hash2 = CryptoJS.HmacSHA256(this.LoginForm.value.passwordFormControl, "mypassword");
    console.log(hash2);
    let hashInBase64 = CryptoJS.enc.Base64.stringify(hash2);

    let credentials = new Auth(
      this.username = this.LoginForm.value.emailFormControl,
      this.passwordHash = hashInBase64
    );

    this.JsonSerialized=((new Serializer()).serialize(credentials));
      //console.log(this.JsonSerialized);
      this.authService.userLogin(this.JsonSerialized).subscribe(result => {
        if(result.loginuser.token){
          this.authguardServiceService.saveToken(result.loginuser.token, result.loginuser.id);
          this.invalidLogin = false;
          if(result.loginuser.roleId == 1 || result.loginuser.roleId == 2){
            this.router.navigate(["/dashboard"]);
          }
          else{
            this.router.navigate(["/userdashboard"]);
          }
          
        }
        else{
          //console.log("No Token");
          this.invalidLogin = true;
          this.errorMessage = "Somethink wrong!";
        }
      }, err => {
        this.invalidLogin = true;
        this.errorMessage = err.error.message;
        
      });
    this.LoginForm.reset();
    }
    
  }

}
