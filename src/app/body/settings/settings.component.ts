import { Component, OnInit } from '@angular/core';
import { SettingService } from './setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[SettingService]
})
export class SettingsComponent implements OnInit {

  constructor(private service:SettingService) { }

  ngOnInit(): void {
  }

  public StartModBus(){
    this.service.startModbas().subscribe(data=>console.log(data));
 }
 public StopModbus(){
   this.service.stopModbus().subscribe(data=>console.log(data));
 }
 public StartPool(){
    this.service.startPooling().subscribe(data=>console.log(data));
 }
}
