import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * This will be used to handle the log in functionality of the log in page
 */
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  /**
   * It will check if their is a user in the cache, if not it will stay on the page,
   * if there is one it will navigate to the home page
   */
  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.router.navigateByUrl('home');
    }

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }

  /**
   * This function will run when a user tries to log in
   * It will check the creds the user put in by using the user service
   * If accept it will save the data in the cache and reload the page
   * 
   */
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.userService.getUser(this.f.username.value, this.f.password.value).subscribe(user =>{

        if(user == null){
            console.log("not accepted");
        }
        else{
            console.log("accepted");
            localStorage.setItem('user',JSON.stringify(user));
            location.reload();
        }

    });



}

}
