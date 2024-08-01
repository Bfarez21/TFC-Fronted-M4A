import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import { PacienteService } from '../../ficha-medica/servicio/paciente.service';
import { DataService } from './data.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  totalPac: number = 0;
  totalProf: number = 0;
  totalEst: number = 0;

  constructor(private pacienteService: PacienteService, private dataService: DataService) {}

  ngOnInit(): void {
    this.contPaci();
    this.ContPacProf();
    this.loadPieChartData();
    this.loadPatientData();
  }

  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;

  private breakpointObserver = inject(BreakpointObserver);

  contPaci(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.totalPac = pacientes.length;
    });
  }

  ContPacProf(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.totalProf = pacientes.filter(p => p.profesionPac === 'Profesor').length;
      this.totalEst = pacientes.filter(p => p.profesionPac === 'Estudiante').length;
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
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const data = context.chart.data.datasets[0].data as number[];
          const total = data.reduce((a, b) => a + b, 0);
          const percentage = (value / total * 100).toFixed(0) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          weight: 'bold'
        }
      }
    }
  };

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [], //'#162778', '#4958A9', '#BAC3FF'
      }
    ]
  };

  public pieChartType: 'pie' = 'pie';

  // Función para generar colores aleatorios
  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  } 

  loadPieChartData(): void {
    this.dataService.getEnfermedadesActuales().subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      // Genera colores aleatorios para cada etiqueta
      const backgroundColors = labels.map(() => this.generateRandomColor());

      this.pieChartData.labels = labels;
      this.pieChartData.datasets[0].data = values;
      this.pieChartData.datasets[0].backgroundColor = backgroundColors;  // Asigna los colores generados

    });
  }

  // Datos de pacientes por año
  public patientData: { year: number, count: number }[] = [];

  loadPatientData(): void {
    this.dataService.getAtencionesPorAno().subscribe(data => {
      const years = Object.keys(data).map(year => parseInt(year, 10));
      const counts = Object.values(data);
      this.patientData = years.map((year, index) => ({ year, count: counts[index] }));
      this.renderLineChart();
    });
  }

  ngAfterViewInit() {
  }

  renderLineChart() {
    if (this.lineChart) {
      new Chart(this.lineChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.patientData.map(d => d.year.toString()),
          datasets: [
            {
              data: this.patientData.map(d => d.count),
              label: 'Cantidad de Pacientes',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
              fill: 'origin',
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
              beginAtZero: true,
              ticks: {
                callback: function(value: number | string) {
                  // Convertir el valor a número si es un string
                  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
                  if (Number.isInteger(numericValue)) {
                    return numericValue;
                  }
                  return null;
                }
              }
            }
          }
        }
      });
    }
  }
  
}
