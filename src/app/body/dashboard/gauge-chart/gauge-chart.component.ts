import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";
import { HubService } from 'src/app/hub.service';
import { DasboardService } from '../dashboard.service';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css'],
  providers:[DasboardService ]
})
export class GaugeChartComponent implements OnInit {

  @ViewChild("chart_temp") chart_temp: ChartComponent;
  @ViewChild("chart_anomaly") chart_anomaly: ChartComponent;

  @Input() chartType:number;
  

  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions>;
  intervalId=0;

  constructor(hub:HubService,private service:DasboardService ) {
    hub.messageReceived.subscribe(data=>{
      this.chartOptions1.series=[data.temperature];
      this.chartOptions.series=[data.predict];
    });
  }

  ngOnInit(): void {
      this.initChart1();
      this.initChart2();
      
  }
  initChart1(){
    this.chartOptions = {
      series: [0],
      chart: {
        height: 'auto',
        type: "radialBar",
        offsetY: -40
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: 10,
              fontSize: "22px",
              fontFamily:"system-ui",
              formatter:(value)=>{ return value.toString().substring(0,4)},
            }
          }
        }
      },
      fill: {
        
        colors: [function({ value, seriesIndex, w }) {
          if(value < 30) {
              return '#008000'
          } else if (value >= 30 && value < 70) {
              return '#E68C04'
          } else {
              return '#d10000'
          }
        }],
        
      },
      labels: ["Average Results"]
    };
  }
  initChart2(){

    this.chartOptions1 = {
      series: [0],
      chart: {
        height: 'auto',
        type: "radialBar",
        offsetY: -60
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 0,
            },
            value: {
              offsetY:40 ,
              fontSize: "22px",
              color: undefined,
              formatter: function(val) {
                return val + " °C";
              }
            }
          }
        }
      },
      fill: {
        
        colors: ['#00BFFF'],
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 1
      },
      labels: [""]
    };
  }

}