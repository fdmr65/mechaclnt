import {
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexFill,
    ApexMarkers,
    ApexYAxis,
    ApexXAxis,
    ApexTooltip,
    ApexStroke,
    ApexChart,
    ApexGrid,
    ApexLegend,
    ApexResponsive
  } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    title: ApexTitleSubtitle;
    fill: ApexFill;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    grid: ApexGrid;
    colors: any;
    toolbar: any;
    legend:ApexLegend;
    responsive:ApexResponsive
  };