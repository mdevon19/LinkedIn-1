import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/** 
 * This will component is in charge of every component in the app
 */
export class AppComponent implements OnInit {
  
  user:User;

  /**
   * This will look and capture the user data found in the cache if there is one
   * @param userService - a user service type dependencies
   */
  constructor(private userService:UserService){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
  
  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
  
}
