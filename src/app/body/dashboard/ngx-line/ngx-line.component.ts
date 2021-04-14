import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HubService } from 'src/app/hub.service';


@Component({
  selector: 'app-ngx-line',
  templateUrl: './ngx-line.component.html',
  styleUrls: ['./ngx-line.component.css'],
  providers:[DatePipe]
})
export class NgxLineComponent implements OnInit {
  multi:any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  }; 

  private data_x:any=[];
  private data_y:any=[];
  private data_z:any=[];


  checkedList=[
    {
      name:"x",
      checked:true,
      color:""
    },
    {
      name:"y",
      checked:false,
      color:""
    },
    {
      name:"z",
      checke:false,
      color:""
    }
  ]
constructor(private hub:HubService,private datepipe:DatePipe) { 

}
  ngOnInit(): void {
    
    //  if(this.data_x.length>32){
    //    this.data_x.shift();
    //    this.data_y.shift();
    //    this.data_z.shift();
     
    // console.log(this.data_x)
    // var series =[
    //  {
    //    name: "X",
    //    series: this.data_x,
    //  }, 
    //  {
    //    name: "Y",
    //    series: this.data_y
    //  },
    //  {
    //    name: "Z",
    //    series: this.data_z
    //  }
    // ];
  
  //   this.checkedList.forEach(data=>{
  //     if(!data.checked){
  //       series=series.filter(serie=>serie.name!=data.name)
  //       console.log(series);
  //     }
  //   })
  //    this.multi=series;
  //  })
  this.hub.messageReceived.subscribe(sensdata=>{
    
    this.data_x.push({name:this.datepipe.transform(new Date(),"HH:mm:ss"),value:+sensdata.x_acc_rms});
    this.data_y.push({name:this.datepipe.transform(new Date(),"HH:mm:ss"),value:+sensdata.y_acc_rms});
    this.data_z.push({name:this.datepipe.transform(new Date(),"HH:mm:ss"),value:+sensdata.z_acc_rms});
    if(this.data_x.length>32){
      this.data_x.shift();
      this.data_y.shift();
      this.data_z.shift();
    }
    var series =
    [
      {name: "X",series: this.data_x,}, 
      {name: "Y",series: this.data_y},
      {name: "Z",series: this.data_z}
     ];
     this.multi=series
     this.multi=[...this.multi];
    // this.data_z.push(_z);
       console.log(series);
  })
  }
  addData(name,val) {
    
    
    //this.multi=series;
    this.multi=[...this.multi];
  }
  series(data_x,data_y,data_z){
    if(this.multi[0].series.length>30)
    {
        this.multi[0].series.shift();
        this.multi[1].series.shift();
        this.multi[2].series.shift();
    }
    var series =[
      {
        name: "X",
        series: data_x,
      }, 
      {
        name: "Y",
        series: data_y
      },
      {
        name: "Z",
        series: data_z
      }
     ];
  }
  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 300];
}
}
