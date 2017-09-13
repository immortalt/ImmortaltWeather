import { Component,ViewChild,Input } from '@angular/core';
import Chart from 'chart.js';


@Component({
  selector: 'rd-chart',
  templateUrl: 'rd-chart.html'
})
export class RdChartComponent {
  @Input() rdData:any;
  @Input() rdLabel:any;
  @Input() rdLabels:any;
  
  @ViewChild('radarCanvas') radarCanvas;
  radarChart: any;

  constructor() {
    
  }

  ngOnInit() {
    this.radarChart = this.getRadarChart(this.rdLabel,this.rdLabels,this.rdData);
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      type: chartType,
      data: data,
      options: options
    });
  }

  getRadarChart(label,labels,dt) {

    console.log(dt)    
    let data = {
      labels: labels,
      datasets: [
        {
          label: label,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: dt
        }
      ]
    };

    let options = {
      scale: {
        reverse: true,
        ticks: {
          beginAtZero: true
        }
      }
    };

    return this.getChart(this.radarCanvas.nativeElement, "radar", data, options);
  
  }

}
