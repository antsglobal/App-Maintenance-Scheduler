import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexPlotOptions,
  ApexAnnotations,
} from "ng-apexcharts";

import { ChartOptions } from '../../../models/commonmodel'
import { FormControl } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { DashboardHelper } from '../../../helpers/dashboard-helper';
import { TripAnalysisHelper } from '../../../helpers/trip-analysis-helper';
@Component({
  selector: 'app-trip-analysis',
  templateUrl: './trip-analysis.component.html',
  styleUrls: ['./trip-analysis.component.css'],
  providers: [
    TripAnalysisHelper
  ]
})
export class TripAnalysisComponent implements OnInit, OnChanges {

  @Input() dateRange
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  xAxisLabels = []
  yAxisData = []
  fromDate
  toDate
  barWith = 50
  // fromDate: string;
  // toDate: string;
  // dumperIds = new FormControl();
  // dumperList: string[] = [
  //   'dumper1',
  //   'dumper2',
  //   'dumper3',
  //   'dumper4',
  //   'dumper5',
  // ];
  constructor(
    private dateSetvice: DateService,
    private dsahboardHelper: DashboardHelper,
    private tripAnalysisHelper: TripAnalysisHelper
  ) { }

  ngOnInit(): void {
    this.getXaxisLabels()
  }

  ngOnChanges(): void {
    this.fromDate = this.dateRange.fromDate
    this.toDate = this.dateRange.toDate
    console.log(`TripAnalysis_${this.fromDate}_${this.toDate}`)
    this.barWith = 50;
    if (this.dateRange.range && this.dateRange.range.length <= 5)
      this.barWith = 10;

    this.getXaxisLabels()
  }

  getXaxisLabels() {
    let chartData = this.tripAnalysisHelper.tripsByDate(this.dateRange.range, this.dateRange.tripsByDate)
    this.xAxisLabels = chartData.xAxis
    this.yAxisData = chartData.yAxis
    this.barchartData();
  }

  barchartData() {
    this.chartOptions = {
      series: [
        {
          name: "Trips",
          data: this.yAxisData
        }
      ],
      annotations: {
        points: [
          {
            x: "",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "test3"
            }
          }
        ]
      },
      chart: {
        height: 350,
        type: "bar",
        toolbar:{
          export: {
            csv: {
              filename: `TripAnalysis_${this.fromDate}_${this.toDate}`,
              headerCategory: 'Date',
              // headerValue: 'value',
            }
          }
        },
      },
      plotOptions: {
        bar: {
          columnWidth: `${this.barWith}%`,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        // type: 'datetime',
        // labels: {
        //   rotate: -45
        // },
        categories: this.xAxisLabels,
        // title: {
        //   text: 'test1',
        // }
        // tickPlacement: "between"
      },
      yaxis: {
        title: {
          text: "No. of Trips"
        }
      },
      fill: {
        // type: "gradient",
        // gradient: {
        //   shade: "light",
        //   type: "horizontal",
        //   shadeIntensity: 0.25,
        //   gradientToColors: undefined,
        //   inverseColors: true,
        //   opacityFrom: 0.85,
        //   opacityTo: 0.85,
        //   stops: [50, 0, 100]
        // }
      }
    };
  }
}
