
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class SettingService { 
  url="http://192.168.1.42:5000/";
  constructor(private http:HttpClient) {  
    
  }  
  public startModbas():Observable<any>{
      return this.http.get(this.url+"start_modbus");
  }
  public stopModbus():Observable<any>{
      return this.http.get(this.url+"stop_modbus");
  }
  public startPooling():Observable<any>{
    return this.http.get(this.url+"start_polling");
}
}    