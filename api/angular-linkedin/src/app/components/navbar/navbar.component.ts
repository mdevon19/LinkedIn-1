import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/**
 * This component is used with the navbar html 
 */
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * If the uer clicks the sign out on the navbar, it will remove the user and go to the log in page
   */
  logOut(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('');
  }

}
