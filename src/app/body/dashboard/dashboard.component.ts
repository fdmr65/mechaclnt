import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HubService } from 'src/app/hub.service';
import { DasboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
})
export class DashboardComponent implements OnInit {
  breakpoint;
  y=1;
  x=0;
 counter=0;
 id;
 horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(hub:HubService,private service: DasboardService,private datepipe:DatePipe,private _snackBar: MatSnackBar) {
    this.service.LastTrain().subscribe(d=>{
      this.openSnackBar(d);
    })

     hub.messageReceived.subscribe(data=>{
      var keys = Object.keys(data);
      this.ELEMENT_DATA.forEach(t=>{
        var key =t.type.toLowerCase();
        t.x=data["x_"+key];
        t.y=data["y_"+key];
        t.z=data["z_"+key];
      })
    })
}

  ELEMENT_DATA = [
    {type:"ACC_RMS", x: 1.2, y: 1.5, z: 1.1 },
    {type:"GYRO_RMS",x: 1.3, y: 1.5, z: 1.8},
    {type:"ACC_STD", x: 2.1, y: 1.5, z: 4.1},
    {type:"ACC_FPeak",x: 3.1, y: 1.5, z: 6.4},
    {type:"ACC_Skw",x: 1.3, y: 1.5, z: 9.1},
    {type:"ACC_Krts",x: 1.2, y: 1.5, z: 1.8},
    {type:"ACC_Crest",x: 1.3,y: 1.5, z: 9.1},

  ];

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.timer();
  }

  ngOnDestroy() {
    clearInterval(this.id);
  }

  openSnackBar(data) {
    this._snackBar.open("Last Train Info (Tloss: "+data["trainLoss"].toFixed(2)+" Vloss: "+data["valueLoss"].toFixed(2)+" Threshold: "+data["treshold"].toFixed(2)+')','', {
      duration: 5000,
      panelClass: 'blue-snackbar',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
}
  data=this.ELEMENT_DATA;
  displayedColumns: string[] = ['type','x', 'y', 'z'];

  mode: ProgressSpinnerMode = 'determinate' ;
  ok=false;
 train_status=false;
 isValid=false;
 train_message="";
 public  train(){
  this.ok=true;
  this.isValid=true;
  this.train_message="collecting data : 0%";
   this.service.getTrainStatus().subscribe(data=>{
     console.log(data);
     if(data.is_train==1){
        this.train_status=true;
     }
     else{
        this.getTrainData().subscribe();
        this.train_status=false;
     }
   });

  }
  v = 5;
  private sub = new Subject();
public timer(){
  this.id=setInterval(()=>{
    this.service.getTrainStatus()
      .pipe(
        takeUntil(this.sub)
      ).subscribe(data => {
    this.counter=data.sensor_data_len;
    if(data.is_train==1){
      this.isValid=true;
      this.ok=true;
      console.log("test sayısıs "+data.sensor_data_len);
     this.train_status=true;
     if(this.counter>=320){
      this.train_message="training model...";
       if(data.model_train==0)
       {
          this.getTrain().subscribe(d=>{
            console.log(d);
            let data={
                "createDate": new Date(),
                "trainLoss": d["train_loss"],
                "valueLoss": d["val_loss"],
                "treshold": d["threshold"]
              }
              console.log(data);
           this.service.CreateTrain(data).subscribe(a=>console.log(a));
           this.openSnackBar(data);
          });
       }
       console.log("işlem devam ediliyor "+this.v.toFixed(1));
     }
     else{
       this.train_message="collecting data : "+((100*this.counter)/640).toFixed(1)+"% ";
     }
    }
    else{
      console.log(new Date())
      //this.train_message="";
      this.service.LastTrain().subscribe(d=>{
        console.log(d)
        var a =this.datepipe.transform(new Date(d["createDate"]),"yyyy:MM:dd HH:mm:ss");
        this.train_message="Last Train Date: "+this.datepipe.transform(new Date(d["createDate"]),"yyyy:MM:dd HH:mm:ss");
      })

      this.train_status=false;
      this.isValid=false;
      this.ok=false;
    }
  });
 },10000);
}

  public getTrainStatus(){

  }

  public getTrainData(){

    return this.service.getTrainData();
  }
  public getTrain(){
    return this.service.getTrain();
  }
}

