import { Component,ViewChild,Input,SimpleChanges } from '@angular/core';
import Chart from 'chart.js';


@Component({
  selector: 'line-chart',
  templateUrl: 'line-chart.html'
})
export class LineChartComponent {
  @Input() lineTitle:any;
  
  @Input() lineData:any;
  @Input() lineLabels:any;
  // @Input() rdLabel:any;
  // @Input() rdLabels:any;
  
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor() {
    
  }

  ngOnChanges(changes: SimpleChanges){ 
    // console.log(changes)
    if(!changes.firstChange){
      this.lineChart = this.getLineChart(this.lineLabels,this.lineData);
      this.lineChart.update();
    }
   
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      type: chartType,
      data: data,
      options: options
    });
  }

  getLineChart(labels,dt) {
    // console.log(labels);
    var data = {
      labels: labels,
      datasets: [
        {
          label: dt.title,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dt.val,
          spanGaps: false,
        }
      ]
    };

    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }

  update () {
    this.lineChart.update();
  }

}
