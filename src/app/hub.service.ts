import { EventEmitter, Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  messageReceived = new EventEmitter<any>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;  
  
  constructor() {  
    this.createConnection();    
    this.startConnection();  
    this.registerOnServerEvents();
  }  
  
  // sendMessage(message: Message) {  
  //   this._hubConnection.invoke('NewMessage', message);  
  // }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl("http://192.168.1.40:5001/test")  
      .build();  
  }  
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        setTimeout(function () { this.startConnection(); }, 5000);  
      });  
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('sensor', (data: any) => {  
      this.messageReceived.emit(data);  
    });  
  }  
}    