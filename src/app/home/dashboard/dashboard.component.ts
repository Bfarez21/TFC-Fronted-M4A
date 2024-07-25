import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import { ReportesComponent } from '../../reportes/reportes.component';
import { PacienteService } from '../../ficha-medica/servicio/paciente.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  totalPac: number = 0;
  totalProf: number = 0;
  totalEst: number = 0;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.contPaci(); // Llama
    this.ContPacProf();
  }

  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;

  private breakpointObserver = inject(BreakpointObserver);

  contPaci(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.totalPac = pacientes.length; // Cuenta el número de pacientes
    });
  }

  ContPacProf(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.totalProf = pacientes.filter(p => p.profesionPac === 'Profesor').length; // Cuenta los profesores
      this.totalEst = pacientes.filter(p => p.profesionPac === 'Estudiante').length; // Cuenta los alumnos
    });
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Visitas Del Mes', cols: 1, rows: 1, type: 'visits' },
          { title: 'Enfermedades', cols: 1, rows: 1, type: 'diseases' },
          { title: 'Gráfico', cols: 1, rows: 1, type: 'lineChart' }
        ];
      }

      return [
        { title: 'Visitas Del Mes' , cols: 2, rows: 1, type: 'visits' },
        { title: 'Enfermedades', cols: 1, rows: 2, type: 'diseases' },
        { title: 'Gráfico', cols: 1, rows: 2, type: 'lineChart' }
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
    { year: 2018, count: 190 },
    { year: 2019, count: 302 },
    { year: 2020, count: 360 },
    { year: 2021, count: 470 },
    { year: 2022, count: 530 },
    { year: 2023, count: 500 },
    { year: 2024, count: 130 }
  ];

  ngAfterViewInit() {
    this.renderLineChart();
  }

  renderLineChart() {
    new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.patientData.map(d => d.year.toString()),
        datasets: [
          {
            data: this.patientData.map(d => d.count),
            label: 'Cantidad de Pacientes',
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo del área bajo la línea
          borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
          pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color de fondo de los puntos
          pointBorderColor: '#fff', // Color del borde de los puntos
          pointHoverBackgroundColor: '#fff', // Color de fondo de los puntos al pasar el cursor
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)', // Color del borde de los puntos al pasar el cursor
          fill: 'origin', // Relleno del área bajo la línea
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
