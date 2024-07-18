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
        ];
      }

      return [
        { title: 'Visitas Del Mes', cols: 2, rows: 1, type: 'visits' },
        { title: 'Enfermedades', cols: 1, rows: 2, type: 'diseases' },
        { title: 'Cantidad De Pacientes', cols: 1, rows: 2, type: 'patients' },
      ];
    })
  );

  // Datos y opciones para el gráfico de pastel
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartData: ChartData<'pie'> = {
    labels: ['Gripe', 'Dolor De Cabeza', 'Dolor De Estomago'],
    datasets: [
      {
        data: [120, 150, 180],
        backgroundColor: ['#162778', '#4958A9', '#BAC3FF'],
      }
    ]
  };

  public pieChartType: 'pie' = 'pie';

  // Datos de pacientes por año
  public patientData = [
    { year: 2017, count: 100 },
    { year: 2018, count: 200 },
    { year: 2019, count: 300 },
    { year: 2020, count: 400 },
    { year: 2021, count: 500 },
    { year: 2022, count: 600 },
    { year: 2023, count: 700 },
    { year: 2024, count: 800 }
  ];
}
