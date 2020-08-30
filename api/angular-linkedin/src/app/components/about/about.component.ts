import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

/**
 * This Component is just for a static About html page
 * It is all hard coded because it does not provide any type of functionality
 * 
 */
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
