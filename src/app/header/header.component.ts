import { Component, OnInit } from '@angular/core';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 imgUrl="../../assets/img/status_header_idle.png"
  constructor(hub:HubService) {
    hub.messageReceived.subscribe(data=>{
     
     this.imgUrl =data.predict==-1?"../../assets/img/status_header_idle.png":data.predict<30 
                  ? "../../assets/img/status_header_normal.png":data.predict<70
                    ?"../../assets/img/status_header_warning.png":"../../assets/img/status_header_danger.png";
                   
      
    });
  }

  ngOnInit(): void {
  }

}
