import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Visitas Del Mes', cols: 1, rows: 1, type: 'visits' },
          { title: 'Enfermedades', cols: 1, rows: 1, type: 'diseases' },
          { title: 'Cantidad De Pacientes', cols: 1, rows: 1, type: 'patients' },
          { title: 'Card 4', cols: 1, rows: 1, type: 'default' }
        ];
      }

      return [
        { title: 'Visitas Del Mes', cols: 2, rows: 1, type: 'visits' },
        { title: 'Enfermedades', cols: 1, rows: 1, type: 'diseases' },
        { title: 'Cantidad De Pacientes', cols: 1, rows: 2, type: 'patients' },
        { title: 'Card 4', cols: 1, rows: 1, type: 'default' }
      ];
    })
  );

  // Datos y opciones para el gráfico de pastel
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartData: ChartData<'pie'> = {
    labels: ['Enfermedad A', 'Enfermedad B', 'Enfermedad C'],
    datasets: [
      {
        data: [120, 150, 180],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }
    ]
  };

  public pieChartType: 'pie' = 'pie';
}
