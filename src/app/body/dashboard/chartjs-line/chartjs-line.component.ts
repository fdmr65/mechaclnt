import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { title } from 'process';
import { HubService } from 'src/app/hub.service';

@Component({
  selector: 'app-chartjs-line',
  templateUrl: './chartjs-line.component.html',
  styleUrls: ['./chartjs-line.component.css'],
  providers:[DatePipe]
})
export class ChartjsLineComponent implements OnInit,AfterViewInit {

  name = 'Angular   6';
  private data_x:Chart.Point[]=[];
  private data_y:Chart.Point[]=[];
  private data_z:Chart.Point[]=[];
  

  chart:Chart;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;

  checkedList=
  [
    { name:"x",checked:true,color:""},
    { name:"y",checked:false,color:""},
    { name:"z",checke:false,color:""}
  ]
  constructor(private hub:HubService,public datepipe:DatePipe) { }

  ngOnInit(): void {
    this.hub.messageReceived.subscribe(data=>{
    this.data_x.push({x:new Date().getTime(),y:+data.x_acc_rms});
    this.data_y.push({x:new Date().getTime(),y:+data.y_acc_rms});
    this.data_z.push({x:new Date().getTime(),y:+data.z_acc_rms});
    
    if(this.data_x.length>32){
      this.data_x.shift();
      this.data_y.shift();
      this.data_z.shift();
    }
    this.chart.data.datasets[0].data=this.data_x;
    this.chart.data.datasets[1].data=this.data_y;
    this.chart.data.datasets[2].data=this.data_z;
    this.chart.update()
    

  })
}


  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

     this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
          datasets: 
          [
            {
              label: 'X_Axis',
              backgroundColor: "#108ac4",
              borderColor: "#108ac4",
              fill: false,
              data: [],
          },
          {
            label: 'Y_Axis',
            backgroundColor: "#1c556b",
            borderColor: "#26708c",
            fill: false,
            data: [],
        },
        {
          label: 'Z_Axis',
          backgroundColor: "#0e1139",
          borderColor: "#0e1139",
          fill: false,
          data: [],
      }
        ]
      },
      options: {
        responsive: true,
        tooltips:{
         callbacks:{
          title: function(tooltipItems, data) {
            var date=new Date(+tooltipItems[0].label);
                var hour=date.getHours();
                var minute=date.getMinutes();
                var seconds=date.getSeconds();
            return 'Date: '+date.toDateString()+" "+hour+":"+minute+":"+seconds;
           },
         }
        },
        title: {
          text: 'Höhenlinie',
        },
        
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
               callback: function (tick) {
                var date=new Date(tick);
                var hour=date.getHours();
                var minute=date.getMinutes();
                var seconds=date.getSeconds();
                tick=hour.toString()+":"+minute+":"+seconds
                 return tick;
              }
            },
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              callback: function (tick) {
                return tick.toString();
              }
            },
            scaleLabel: {
              labelString: 'm/s²',
              display: true
            }
          }]
        }
      }
    });
  }
  

}




