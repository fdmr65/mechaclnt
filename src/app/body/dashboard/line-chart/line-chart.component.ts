import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApexLegend } from 'ng-apexcharts';
import { HubService } from 'src/app/hub.service';
import {ChartOptions} from './chart-options';
import {dataSeries} from  './data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  providers: [DatePipe]
})
export class LineChartComponent implements OnInit {
data_x=[];
data_y=[];
data_z=[];
x_show=false;
y_show=false;
z_show=false;
tempData={
 x:{"date":0,"value":new Date()}, 
 y:{"date":0,"value":new Date()},
 z:{"date":0,"value":new Date()}
};

public grid :ChartOptions["grid"];
public series: ChartOptions["series"];
public chart: ChartOptions["chart"];
public dataLabels: ChartOptions["dataLabels"];
public markers: ChartOptions["markers"];
public title: ChartOptions["title"];
public fill: ChartOptions["fill"];
public yaxis: ChartOptions["yaxis"];
public xaxis: ChartOptions["xaxis"];
public tooltip: ChartOptions["tooltip"];
public legend:ChartOptions["legend"];
public responsive:ChartOptions["responsive"];

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
  constructor(hub:HubService,public datepipe: DatePipe) {
    
    hub.messageReceived.subscribe(sensdata=>{
       this.data_x.push([new Date().toString(),sensdata.x_acc_rms]);
       this.data_y.push([new Date().toString(),sensdata.y_acc_rms]);
       this.data_z.push([new Date().toString(),sensdata.z_acc_rms]);
       
      if(this.data_x.length>32){
        this.data_x.shift();
        this.data_y.shift();
        this.data_z.shift();
      }
     var series =[
      {
        name: "x",
        data: this.data_x,
      }, 
      {
        name: "y",
        data: this.data_y
      },
      {
        name: "z",
        data: this.data_z
      }
     ];

     this.checkedList.forEach(data=>{
       if(!data.checked){
         series=series.filter(serie=>serie.name!=data.name)
       }
     })
      this.series=series;
    })
    
    this.initChartData();
    
  }
  ngOnInit(): void {
    setInterval(()=>{
       var a =300;
      this.chart["height"]=a;
      console.log(this.chart["height"]);
      a*=2;
    },1000);
  }
    public initChartData(): void {
      let dates = [];
      for (let i = 0; i < 120; i++) {
        dates.push([dataSeries[1][i].date, dataSeries[1][i].value]);
      }

      this.series =[
      {
        name: "X",
        data: dates
      }, 
      {
        name: "Y",
        data: dates
      },
      {
        name: "Z",
        data:dates
      }
     ];
      this.chart = {
        redrawOnParentResize: true,
        type: "line",
        height:430,
        stacked: false,
        animations: {
          enabled: false,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        zoom: {
          zoomedArea:{
            stroke:{
              width:0.01
            }
          },
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          show:true,
          autoSelected: "zoom"
        },
      };
      this.dataLabels = {

        enabled:false,
       // enabledOnSeries: [1]
      };
      this.markers = {
        showNullDataPoints:false,
        onClick:(chart)=>{

        },
        size: 1
      };
      this.title = {
        text: "",
        align: "left",
        style:{
          fontWeight:300,
          fontFamily:"sans-serif"
        }
      };
      this.fill = {
        type: "solid",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      };
      this.yaxis = {
        
        labels: {
           
          formatter: function(val) {
            return val.toString() ;
          }
        },
        title: {
          text: "m/s²"
        }
      };
      this.xaxis = {
        type:"datetime",
        labels:{
          formatter: function (value) {
            var date=new Date(+value);
           var hour=date.getHours();
           var minute=date.getMinutes();
           var seconds=date.getSeconds();
            return hour.toString()+":"+minute+":"+seconds; // The formatter function overrides format property
          }
      }
   
      };
      this.tooltip = {
        intersect:false,
        shared: false,
       
      };
      this.legend={
        formatter:(val)=>{
          return val.toUpperCase()
        },
        onItemClick: {
          toggleDataSeries:false
      },
      onItemHover: {
        highlightDataSeries: false
    },
      };
      
    }
    onResize(event) {
      console.log(event.target.innerWidth)
     event.target.innerWidth;
    }
}
  