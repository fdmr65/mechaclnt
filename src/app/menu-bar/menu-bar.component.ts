import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  tabClick(event){
    this.router.navigateByUrl(event.tab.textLabel);
    console.log(event.tab.textLabel);
  }
}
