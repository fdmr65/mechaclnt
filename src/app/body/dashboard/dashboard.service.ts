
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


@Injectable({providedIn:'root'})
export class DasboardService { 
 private  url="http://192.168.1.42:5000/";
  constructor(private http:HttpClient) {  
    
  }  
  public getTrainStatus():Observable<any>{
      return this.http.get(this.url+"show_data_len");
  }
  public getTrainData(){
    return this.http.get(this.url+"prepare_data");
  }
  public getTrain(){
    return this.http.get(this.url+"prepare_model");
  }

 public CreateTrain(data){
    const headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/json',
    });
  return  this.http.post("http://192.168.1.40:5000/api/TrainTest/Test",data,{headers:headers});
 }

 public LastTrain(){
   return  this.http.get("http://192.168.1.40:5000/api/TrainTest");
}
}    