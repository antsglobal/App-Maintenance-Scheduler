import { Component, OnInit } from '@angular/core';
import { scoreboardmodel } from 'src/app/models/scoreboardmodel';
import { EmployeeContributionService } from 'src/app/services/employee-contribution.service';
import {
  ChartDataSets,
  ChartType,
  ChartOptions,
  ChartData,
  Chart,
} from 'chart.js';
import {
  Color,
  Label,
  MultiDataSet,
  SingleDataSet,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  index: number = 0;
  scoreboard: any;
  dataValue: string;
  errorMessage: any;

  constructor(private employeeService : EmployeeContributionService) { }

  ngOnInit(): void {
    this.getScoreboear(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId"));
  }


  getScoreboear(periodId,employeeId, userId): void {
    // The server will generate the id for this new rfid
    this.barChartData = [{ data: [], label: 'ratingValue' }];
    while (this.barChartLabels.length > 0) {
      this.barChartLabels.pop();
    }
    this.index = 0;
    const newScoreboard: scoreboardmodel = {
      periodId, employeeId, userId
    } as scoreboardmodel;
    this.employeeService.getScoreboard(newScoreboard).subscribe({
      next: (scoreData) => {
        console.log(scoreData);
        this.scoreboard = scoreData['data'];
        this.scoreboard.forEach((element) => {
          this.barChartLabels.push(element.indicator);
        });
        this.barChartLabels.forEach((keyValue) => {
          this.dataValue = this.scoreboard[this.index]['ratingValue'];
          this.barChartData[0].data.push(this.dataValue);
          this.barChartTootip =
            'Rating :' +
            this.scoreboard[this.index]['ratingValue'] +
            ', Indicator:' +
            this.scoreboard[this.index]['indicator'];
          this.index++;
        });
        //console.log(this.rfid);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  public barChartOptions: any = {
    responsive: true,
    offsetGridLines: false,
    scales: {
      yAxes: [
        {
          ticks: {
            scaleShowVerticalLines: false,
            beginAtZero: true,
            stepValue: 0,
            steps: 10,
            max: 100,
            length: 0,
            fontColor: "white",
            enable3D: true,
          },
          gridLines: {
            drawOnChartArea: true,
            color: "white",
          },
        },
      ],
      xAxes: [
        {
          maxBarThickness: 70,
          length: 0,
          gridLines: {
            drawOnChartArea: false,
            fontColor: "white",
            color: "white",
          },
          ticks: {
            fontColor: "white",
            enable3D: true,
          },
        },
        
        
      ],
    },
  };
  public barChartLabels: any[] = [];
  public barChartType: string = 'bar';
  public barChartData: any[] = [{ data: [], label: 'ratingValue' }];
  public barChartDataPointWidth: number = 20;
  public barChartLegend: boolean = true;
  public barChartTootip: string = '';
  public barChartColors: any[] = [
    {
      backgroundColor: [
        '#3d5c2b',
        '#3d5c2b',
        '#3d5c2b',
        '#3d5c2b',
        '#3d5c2b',
      ],
    },
  ];

}
